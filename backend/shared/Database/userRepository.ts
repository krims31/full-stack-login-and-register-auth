import { pool } from './database'

interface User {
	id: number
	email: string
	username: string
	password: string
	createdAt: string | Date
}

export const userRepository = {
	async getEmail(email: string): Promise<User[] | null> {
		const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
			email
		])
		return result.rows[0] || null
	},

	async getId(id: string): Promise<User[] | null> {
		const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
		return result.rows[0] || null
	},

	async getAll(): Promise<User[]> {
		const result = await pool.query(`SELECT * FROM users`)
		return result.rows
	},

	async create(user: {
		email: string
		username: string
		password: string
	}): Promise<User> {
		const result = await pool.query(
			`INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *`,
			[user.email, user.username, user.password]
		)
		return result.rows[0]
	}
}
