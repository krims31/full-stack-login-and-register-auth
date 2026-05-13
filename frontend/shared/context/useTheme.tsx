import { SunMoon } from 'lucide-react'
import { useTheme } from '../../features/hooks/useThemeContext'

export default function ThemeToggle() {
	const { theme, toggleTheme } = useTheme()

	return (
		<button
			onClick={toggleTheme}
			className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg relative flex items-center"
		>
			<SunMoon className="relative z-10 mr-2" />
			<span className="z-10">
				Theme: {theme === 'light' ? 'Light' : 'Dark'}
			</span>
		</button>
	)
}
