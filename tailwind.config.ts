// tailwind.config.js
module.exports = {
	theme: {
		extend: {
			keyframes: {
				levitate: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' }
				}
			},
			animation: {
				'soft-float': 'levitate 4s ease-in-out infinite'
			}
		}
	}
}
