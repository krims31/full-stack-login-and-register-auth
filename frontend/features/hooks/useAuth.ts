import { useEffect } from 'react'
import { api } from '../../shared/api/authApi'
import { useAuthState } from '../auth/state'

export default function useAuth() {
	const { isAuth, isLoading, user } = useAuthState()
	const setAuth = useAuthState(state => state.setAuth)
	const setLoading = useAuthState(state => state.setLoading)
	const setUser = useAuthState(state => state.setUser)

	useEffect(() => {
		const checkAuth = async () => {
			setLoading(true)
			const token = localStorage.getItem('token')

			if (!token) {
				setAuth(false)
				setUser(null)
				setLoading(false)
				return
			}
			try {
				const response = await api.get('/auth/me')

				if (response.data) {
					setAuth(true)

					if (setUser) {
						setUser(response.data)
					}
				} else {
					setAuth(false)
					setUser(null)
					localStorage.removeItem('token')
				}
			} catch (error) {
				console.error('Auth check failed: ', error)
				setAuth(false)
				setUser(null)
				localStorage.removeItem('token')
			} finally {
				setLoading(false)
			}
		}
		checkAuth()
	}, [setAuth, setLoading, setUser])

	return {
		isAuth,
		isLoading,
		user
	}
}
