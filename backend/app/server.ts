import bcrypt from 'bcrypt'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import OpenAI from 'openai'

dotenv.config()

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

const openrouter = new OpenAI({
	baseURL: 'https://openrouter.ai/api/v1',
	apiKey: process.env.OPENROUTER_API_KEY,
	defaultHeaders: {
		'HTTP-Referer': 'https://localhost:5173',
		'X-Title': 'My AI chat app'
	}
})

app.get('/api/test', (req: Request, res: Response) => {
	res.json({ message: 'Server is working!' })
})

app.post('/api/test-chat', (req: Request, res: Response) => {
	console.log('Test chat received:', req.body)
	res.json({ reply: 'This is a test response from server!' })
})

app.post('/api/chat', async (req: Request, res: Response) => {
	const { message, history } = req.body

	console.log('📨 Message:', message)

	if (!message) {
		return res.status(400).json({ error: 'Message is required' })
	}

	const chatMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
		{
			role: 'system',
			content:
				'Ты полезный AI ассистент. Отвечай кратко, дружелюбно и всегда на том же языке, что и пользователь. Если пользователь пишет по-русски - отвечай по-русски. Если по-английски - отвечай по-английски.'
		}
	]

	if (Array.isArray(history) && history.length > 0) {
		for (const msg of history) {
			if (msg && msg.role && msg.content) {
				chatMessages.push({
					role: msg.role as 'user' | 'assistant',
					content: msg.content
				})
			}
		}
	}

	chatMessages.push({
		role: 'user',
		content: message
	})

	const freeModels = [
		'google/gemini-2.0-flash-exp:free',
		'qwen/qwen-2.5-7b-instruct:free',
		'mistralai/mistral-7b-instruct-v0.1',
		'openai/gpt-3.5-turbo'
	]

	for (const model of freeModels) {
		try {
			console.log(`🔄 Trying model: ${model}`)

			const complete = await openrouter.chat.completions.create({
				model: model,
				messages: chatMessages,
				temperature: 0.7,
				max_tokens: 500
			})

			const reply = complete.choices[0]?.message?.content

			if (reply && reply.length > 0) {
				console.log(`✅ Reply from ${model}:`, reply.substring(0, 100))
				return res.json({ reply })
			}
		} catch (error: unknown) {
			console.log(`❌ Model ${model} failed:`, error)

			await new Promise(resolve => setTimeout(resolve, 1000))
		}
	}

	console.error('❌ All models failed')
	res.status(503).json({
		reply:
			'Извините, все AI модели временно недоступны из-за лимитов запросов. Пожалуйста, подождите 1-2 минуты или добавьте платежный метод на https://openrouter.ai/credits для снятия лимитов.',
		error: 'Rate limit exceeded'
	})
})

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
