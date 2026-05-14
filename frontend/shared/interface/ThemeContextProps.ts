import { type Theme } from '../type/Theme'

export interface ThemeContextProps {
	theme: Theme
	toggleTheme: () => void
}
