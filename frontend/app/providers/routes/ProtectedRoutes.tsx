import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthState } from '../../../features/auth/state'
type Props = {
	children: React.ReactNode
}

export const ProtectedRoutes = ({ children }: Props) => {
	const isAuth = useAuthState(state => state.isAuth)
	const isLoading = useAuthState(state => state.isLoading)

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (!isAuth) {
		return <Navigate to="/login" />
	}
	return children
}
