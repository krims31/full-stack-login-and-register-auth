import { useEffect, useState } from 'react'
import { ThemeContext } from '../../features/hooks/useThemeContext'
import type { contextProps } from '../../shared/interface/contextProps'
import type { Theme } from '../../shared/type/Theme'

export const ThemeProvider: React.FC<contextProps> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem('theme') as Theme
			return savedTheme || 'light'
		}
		return 'light'
	})

	useEffect(() => {
		const root = document.documentElement

		if (theme === 'dark') {
			root.classList.add('dark')
			console.log('Dark mode enabled, classlist: ', root.classList)
		} else {
			root.classList.remove('dark')
			console.log('Light mode enabled, classlist: ', root.classList)
		}

		localStorage.setItem('theme', theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
	}

	const value = {
		theme,
		toggleTheme
	}

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
