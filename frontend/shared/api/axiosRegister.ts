import { api } from './authApi'

export const register = async (
	username: string,
	email: string,
	password: string
) => {
	try {
		const response = await api.post('/auth/register', {
			username,
			email,
			password
		})
		return response.data
	} catch (error) {
		console.error('Registration error: ', error)

		throw error
	}
}

export const login = async (email: string, password: string) => {
	try {
		const response = await api.post('/auth/login', {
			email,
			password
		})
		return response.data
	} catch (error) {
		console.error('Login error: ', error)

		throw error
	}
}
