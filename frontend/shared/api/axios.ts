import { type InternalAxiosRequestConfig } from 'axios'
import { api } from './authApi'

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = localStorage.getItem('token')

		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`
			console.log('Token added to request headers', config.url)
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

api.interceptors.request.use(
	response => response,
	error => {
		if (error.response?.status === 401) {
			localStorage.removeItem('token')
			if (window.location.pathname !== '/login') {
				window.location.href = '/login'
			}
		}
		return Promise.reject(error)
	}
)
