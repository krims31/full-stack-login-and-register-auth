import bcrypt from 'bcrypt'
import cors from 'cors'
import express, { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

interface myToken extends jwt.JwtPayload {
	id: number
}

interface User {
	id: number
	email: string
	username?: string
	password: string
	createdAt: Date
}

const excludePassword = <T extends { password: string }>(
	obj: T
): Omit<T, 'password'> => {
	const result: Partial<T> = {}
	for (const key in obj) {
		if (key !== 'password') {
			result[key] = obj[key]
		}
	}
	return result as Omit<T, 'password'>
}

const PORT = process.env.PORT || 5000

const app = express()

app.use(
	cors({
		origin: ['http://localhost:5173', 'https://full-stack-ai-tau.vercel.app'],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true
	})
)

app.use(express.json())

const users: User[] = []
let userId: number = 1

const testPassword = bcrypt.hashSync('123456', 10)

users.push({
	id: userId++,
	email: 'test@mail.ru',
	username: 'test',
	password: testPassword,
	createdAt: new Date()
})

app.post('/api/auth/register', async (req: Request, res: Response) => {
	const { email, password, username } = req.body

	if (!email || !password) {
		return res.status(400).json('Email and password are required')
	}

	const existingUser = users.find(user => user.email === email)

	if (existingUser) {
		return res.status(400).json('User already exists')
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	const newUser: User = {
		id: userId++,
		email,
		username: username || email.split('@')[0],
		password: hashedPassword,
		createdAt: new Date()
	}

	users.push(newUser)

	res.status(201).json({
		message: 'User registered successfully',
		user: excludePassword(newUser)
	})
})

app.post('/api/auth/login', async (req: Request, res: Response) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({ message: 'Email and password are required' })
	}

	const user = users.find(u => u.email === email)

	if (!user) {
		return res.status(400).json({ message: 'User not found' })
	}

	const isMatch = await bcrypt.compare(password, user.password)

	if (!isMatch) {
		return res.status(400).json({ message: 'Password is incorrect' })
	}

	const token = jwt.sign({ id: user.id, email: user.email }, 'secret', {
		expiresIn: '15m'
	})

	res.json({
		token,
		email: user.email,
		username: user.username
	})
})

app.get('/api/auth/me', (req: Request, res: Response) => {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		return res.status(401).json({ message: 'No token' })
	}

	const token = authHeader.split(' ')[1]

	try {
		const decoded = jwt.verify(token, 'secret') as myToken
		const user = users.find(u => u.id === decoded.id)

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		res.json(excludePassword(user))
	} catch {
		res.status(401).json({ message: 'Invalid token' })
	}
})

app.get('/api/auth/users', (req: Request, res: Response) => {
	const usersWithoutPassword = users.map(excludePassword)
	res.json(usersWithoutPassword)
})

app.all('/*splat', (req: Request, res: Response) => {
	res.status(404).json({
		message: `The URL ${req.originalUrl} doesn't exist`
	})
})

app.listen(PORT, () => {
	console.log('Server is running on http://localhost:5000')
})
