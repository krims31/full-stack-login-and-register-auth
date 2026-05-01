import { useEffect } from 'react'
import { api } from '../../shared/api/authApi'
import { useAuthState } from '../auth/state'

export default function useAuth() {
	const isAuth = useAuthState(state => state.isAuth)
	const setAuth = useAuthState(state => state.setAuth)
	const setLoading = useAuthState(state => state.setLoading)

	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem('token')

			if (!token) {
				setAuth(false)
				setLoading(false)
				return
			}
			try {
				await api.get('/auth/me')

				setAuth(true)
			} catch {
				setAuth(false)
			} finally {
				setLoading(false)
			}
		}
		checkAuth()
	}, [setAuth])

	return {
		isAuth
	}
}
