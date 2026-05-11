import fs from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'db.json')

interface User {
	id: number
	email: string
	username: string
	password: string
	createdAt: string | Date
}

export const userStorage = {
	getAll: (): User[] => {
		if (!fs.existsSync(DB_PATH)) {
			fs.writeFileSync(DB_PATH, JSON.stringify({ users: [] }))
			return []
		}
		const data = fs.readFileSync(DB_PATH, 'utf-8')
		return JSON.parse(data).users
	},

	getEmail: (email: string): User | undefined => {
		const users = userStorage.getAll()
		return users.find(user => user.email === email)
	},

	getId: (id: string): User | undefined => {
		const users = userStorage.getAll()
		return users.find(user => user.id === parseInt(id))
	},

	save: (user: User) => {
		const currentData = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
		currentData.users.push(user)
		fs.writeFileSync(DB_PATH, JSON.stringify(currentData, null, 2))
	}
}
