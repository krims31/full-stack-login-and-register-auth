import axios from 'axios'
import { type InternalAxiosRequestConfig } from 'axios'
import { api } from './authApi'

interface LoginResponse {
	token: string
	email: string
}

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = localStorage.getItem('token')

		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

export async function login(
	email: string,
	password: string
): Promise<LoginResponse> {
	try {
		// Use the instance created above
		const { data } = await api.post<LoginResponse>('/auth/login', {
			email,
			password
		})
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
