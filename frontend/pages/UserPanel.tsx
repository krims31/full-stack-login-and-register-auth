import { useNavigate } from 'react-router'
import { useAuthState } from '../features/auth/state'
export default function UserPanel() {
	const { setAuth } = useAuthState(state => state)
	const navigate = useNavigate()

	const logout = () => {
		localStorage.removeItem('token')
		setAuth(false)
		navigate('/login')
	}
	return (
		<>
			<button onClick={logout} className="border rounded-2xl bg-red w-20 h-10">Logout</button>
		</>
	)
}