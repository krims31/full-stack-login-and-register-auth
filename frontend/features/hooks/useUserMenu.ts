import { useEffect, useRef, useState } from 'react'

export default function useUserMenu() {
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
	return {
		handleLogin,
		isOpen,
		ref,
		setIsOpen
	}
}
