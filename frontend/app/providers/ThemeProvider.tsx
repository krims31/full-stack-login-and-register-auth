import { useEffect, useState } from 'react'
import { ThemeContext } from '../../features/hooks/useThemeContext'
import type { contextProps } from '../../shared/interface/contextProps'
import type { Theme } from '../../shared/type/Theme'

export const ThemeProvider: React.FC<contextProps> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>('light')

	useEffect(() => {
		const root = document.documentElement

		if (theme === 'light') {
			return root.classList.add('dark')
		} else {
			return root.classList.remove('dark')
		}
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
