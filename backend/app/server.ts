import bcrypt from 'bcrypt'
import cors from 'cors'
import express, { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

const app = express()

app.use(express.json())

app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true
	})
)

const user = {
	id: 1,
	email: 'test@mail.ru',
	password: bcrypt.hashSync('123456', 10)
}

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

app.listen(5000, () => {
	console.log('Server is running on http://localhost:5000')
})
