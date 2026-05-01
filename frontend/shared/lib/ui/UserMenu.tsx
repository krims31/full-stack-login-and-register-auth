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
					<CircleUserRound size={40} />
				</div>

				{isOpen && (
					<div className="absolute left-10 -mt-20 w-40 bg-white shadow-lg rounded-xl p-2 border">
						<button
							className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
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
