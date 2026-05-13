import { createContext, useContext } from 'react'
import type { ThemeContextProps } from '../../shared/interface/ThemeContextProps'

export const ThemeContext = createContext<ThemeContextProps | undefined>(
	undefined
)

export const useTheme = () => {
	const context = useContext(ThemeContext)

	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}

	return context
}
