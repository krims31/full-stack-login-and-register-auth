import { create } from 'zustand'

interface AuthState {
	isAuth: boolean
	isLoading: boolean
	setAuth: (value: boolean) => void
	setLoading: (value: boolean) => void
}

export const useAuthState = create<AuthState>(set => ({
	isAuth: false,
	isLoading: true,
	setAuth: value => set({ isAuth: value, isLoading: false }),
	setLoading: value => set({ isLoading: value })
}))
