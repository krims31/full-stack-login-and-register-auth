import bcrypt from 'bcrypt'
import cors from 'cors'
import express, { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

interface myToken extends jwt.JwtPayload {
	id: number
}

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use(
	cors({
		origin: ['http://localhost:5173', 'https://full-stack-ai-tau.vercel.app'],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		credentials: true
	})
)

app.options('*', cors())

const user = {
	id: 1,
	email: 'test@mail.ru',
	password: bcrypt.hashSync('123456', 10)
}

app.get('/api/auth/me', (req: Request, res: Response) => {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		return res.status(401).json({ message: 'No token' })
	}

	const token = authHeader.split(' ')[1]

	try {
		const decoded = jwt.verify(token, 'secret') as myToken

		res.json({
			id: decoded.id,
			email: user.email
		})
	} catch {
		res.status(401).json({ message: 'Invalid token' })
	}
})

app.post('/api/auth/login', async (req: Request, res: Response) => {
	const { email, password } = req.body

	if (email !== user.email) {
		return res.status(400).json({ message: 'User not found' })
	}

	const isMatch = await bcrypt.compare(password, user.password)

	if (!isMatch) {
		return res.status(400).json({ message: 'Password is incorrect' })
	}

	const token = jwt.sign({ id: user.id }, 'secret', {
		expiresIn: '15m'
	})

	res.json({
		token,
		email: user.email
	})
})

app.listen(PORT, () => {
	console.log('Server is running on http://localhost:5000')
})
