import axios from 'axios'
import { api } from '../../shared/api/authApi'
import { LoginResponse } from '../../shared/interface/LoginResponsible'
import { RegisterResponse } from '../../shared/interface/RegisterResponsible'

export async function login(
	email: string,
	password: string
): Promise<LoginResponse> {
	try {
		const { data } = await api.post<LoginResponse>('/auth/login', {
			email,
			password
		})

		localStorage.setItem('token', data.token)

		return data
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.error(
				'Error logging in:',
				error.response?.data?.message || error.message
			)
		} else {
			console.error('Unexpected error:', error)
		}
		throw error
	}
}

export async function register(
	email: string,
	password: string,
	username: string
): Promise<RegisterResponse> {
	try {
		const { data } = await api.post<RegisterResponse>('/auth/register', {
			email,
			password,
			username
		})

		console.log('Registration successful')
		return data
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.error(
				'Error registering:',
				error.response?.data?.message || error.message
			)
		} else {
			console.error('Unexpected error:', error)
		}
		throw error
	}
}

export async function getCurrentUser() {
	try {
		const { data } = await api.get('/auth/me')
		return data
	} catch (error) {
		console.error('Error getting current user:', error)
		throw error
	}
}

export async function logout() {
	localStorage.removeItem('token')
	window.location.href = '/login'
}
