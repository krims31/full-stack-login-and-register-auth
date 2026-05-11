import fs, { existsSync } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'db.json')
console.log('DB_PATH', DB_PATH)

interface User {
	id: number
	email: string
	username: string
	password: string
	createdAt: string | Date
}

const initDB = () => {
	if (!existsSync(DB_PATH)) {
		console.log("DB_PATH doesn't exist, creating...")
		fs.writeFileSync(DB_PATH, JSON.stringify({ users: [] }, null, 2))
		console.log('DB file created at: ', DB_PATH)
	}
}

export const userStorage = {
	getAll: (): User[] => {
		initDB()
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
		initDB()
		const currentData = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
		currentData.users.push(user)
		fs.writeFileSync(DB_PATH, JSON.stringify(currentData, null, 2))
	}
}
