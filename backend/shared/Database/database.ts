import { Pool } from 'pg'

const databaseUrl = process.env.DATABASE_URL

if (databaseUrl) {
	console.error('DATABASE_URL is not easy to use')
	process.exit(1)
}

export const pool = new Pool({
	connectionString: databaseUrl,
	ssl:
		process.env.NODE_VAL === 'production'
			? { rejectUnauthorized: false }
			: false
})

export async function initDB() {
	try  {
		await pool.query(`
				CREATE TABLE IF NOT EXISTS users (
					id SERIAL PRIMARY KEY,
					email VARCHAR(255) UNIQUE NOT NULL,
					username VARCHAR(255) UNIQUE NOT NULL,
					password VARCHAR(255) NOT NULL,
					created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
				)
			`)
			console.log("Database initialized succussfully!")
	} catch (error) {
		console.error("Error inititalizing database:", error)
		throw error;
	}
}