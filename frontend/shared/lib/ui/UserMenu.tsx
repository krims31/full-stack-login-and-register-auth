import {
	CircleUserRound,
	Info,
	LogOut,
	MessageCircleMore,
	Settings,
	SunMoon,
	UserRound
} from 'lucide-react'
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
							<UserRound className="flex item-center relative z-10 right-2" />
							<span className="absolute z-10 top-4 left-11">View Profile</span>
						</button>
						<button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
							<Settings className="flex item-center relative z-10 right-2" />
							<span className="absolute z-10 top-13 left-11">Settings</span>
						</button>

						<button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
							<Settings className="flex item-center relative z-10 right-2" />
							<span className="absolute z-10 top-22.5 left-11">
								Subscription
							</span>
						</button>

						<button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
							<Info className="flex item-center relative z-10 right-2" />
							<span className="absolute z-10 top-32 left-11">Support</span>
						</button>

						<button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
							<MessageCircleMore className="flex item-center relative z-10 right-2" />
							<span className="absolute z-10 top-41 left-11">Community</span>
						</button>

						<button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
							<SunMoon className="flex item-center relative z-10 right-2" />
							<span className="absolute z-10 top-51 left-11">Theme</span>
						</button>
						<button
							className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-red-500"
							onClick={handleLogin}
						>
							<LogOut className="flex item-center relative z-10 right-2" />
							<span className="absolute z-10 top-60 left-11">Logout</span>
						</button>
					</div>
				)}
			</div>
		</>
	)
}
