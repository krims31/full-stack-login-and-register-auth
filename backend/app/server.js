"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://full-stack-ai-p7ym.vercel.app'],
    credentials: true
}));
const user = {
    id: 1,
    email: 'test@mail.ru',
    password: bcrypt_1.default.hashSync('123456', 10)
};
app.get('/api/auth/me', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'secret');
        res.json({
            id: decoded.id,
            email: user.email
        });
    }
    catch {
        res.status(401).json({ message: 'Invalid token' });
    }
});
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (email !== user.email) {
        return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Password is incorrect' });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, 'secret', {
        expiresIn: '15m'
    });
    res.json({
        token,
        email: user.email
    });
});
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:5000');
});
