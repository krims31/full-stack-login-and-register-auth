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
				console.log('Token not found')
				setAuth(false)
				setUser(null)
				setLoading(false)
				return
			}
			try {
				console.log('Token found, verifying...')
				const response = await api.get('/auth/me', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})

				if (response.data) {
					console.log(' useAuth: Token valid, user authenticated')
					setAuth(true)

					if (setUser) {
						setUser(response.data)
					}
				} else {
					console.log(' useAuth: No user data in response')
					setAuth(false)
					setUser(null)
					localStorage.removeItem('token')
				}
			} catch (error) {
				console.error('Error verifying token:', error)
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
