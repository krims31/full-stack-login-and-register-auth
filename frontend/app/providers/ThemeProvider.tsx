import { useState } from 'react'
import { ThemeContext } from '../../features/hooks/useThemeContext'
import { contextProps } from '../../shared/interface/contextProps'
import { Theme } from '../../shared/type/Theme'

export const ThemeProvider: React.FC<contextProps> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>('light')

	const toggleTheme = () => {
		setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
	}

	const value = {
		theme,
		toggleTheme
	}

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
