// tailwind.config.js
import tailwindBrowser from '@codewithhridoy/tailwind-browser'

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {}
	},
	plugins: [tailwindBrowser]
}
