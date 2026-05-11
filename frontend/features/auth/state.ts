import { create } from 'zustand'

interface User {
	id: number
	email: string
	username: string
}

interface AuthState {
	isAuth: boolean
	isLoading: boolean
	user: User | null
	setAuth: (value: boolean) => void
	setLoading: (value: boolean) => void
	setUser: (user: User | null) => void
}

export const useAuthState = create<AuthState>(set => ({
	isAuth: false,
	isLoading: true,
	user: null,
	setAuth: value => set({ isAuth: value }),
	setLoading: value => set({ isLoading: value }),
	setUser: user => set({ user })
}))
