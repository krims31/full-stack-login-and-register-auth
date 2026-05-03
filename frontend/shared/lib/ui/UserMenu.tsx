import { CircleUserRound } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function UserMenu() {
	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleLogin = () => {
		localStorage.removeItem('token')
		window.location.href = '/login'
	}

	return (
		<>
			<div
				className="relative"
				ref={ref}
			>
				<div
					onClick={() => setIsOpen(prev => !prev)}
					className="cursor-pointer"
				>
					<CircleUserRound size={30} />
				</div>

				{isOpen && (
					<div className="absolute left-15 -mt-75 w-40 bg-white rounded-xl p-2 border  border-black/10 shadow-lg hover:shadow-xl outline-0">
						<button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
							View Profile
						</button>
						<button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
							Settings
						</button>

						<button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
							Subscription
						</button>

						<button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
							Support
						</button>

						<button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
							Community
						</button>

						<button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
							Theme
						</button>
						<button
							className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-red-500"
							onClick={handleLogin}
						>
							Logout
						</button>
					</div>
				)}
			</div>
		</>
	)
}
