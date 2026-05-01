import axios from 'axios'

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "https://full-stack-ai-6uq7.onrender.com/api",
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: false
})
