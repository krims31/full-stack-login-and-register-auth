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
		return <div className="flex items-center justify-center">Loading...</div>
	}

	console.log({ isAuth, isLoading })

	if (!isAuth) {
		return <Navigate to="/login" />
	}
	return children
}
