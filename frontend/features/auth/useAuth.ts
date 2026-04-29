import { useEffect, useState } from 'react'
import { api } from '../../shared/api/authApi'
import { useAuthState } from './state'

export default function useAuth() {
	const isAuth = useAuthState(state => state.isAuth)
	const setAuth = useAuthState(state => state.setAuth)

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem('token')

			if (!token) {
				setAuth(false)
				setIsLoading(false)
				return
			}
			try {
				await api.get('/auth/me')

				setAuth(true)
			} catch {
				setAuth(false)
			} finally {
				setIsLoading(false)
			}
		}
		checkAuth()
	}, [setAuth])

	return {
		isAuth,
		isLoading
	}
}
