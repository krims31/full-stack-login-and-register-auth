import { BrowserRouter, Route, Routes } from 'react-router'
import { ProtectedRoutes } from '../frontend/app/providers/routes/ProtectedRoutes'
import useAuth from '../frontend/features/hooks/useAuth'
import Ai from '../frontend/pages/AI'
import LoginPages from '../frontend/pages/LoginPages'
import Sidebar from '../frontend/pages/widgets/sidebar/ui/Sidebar'
import './App.css'

function App() {
	const { isLoading } = useAuth()

	if (isLoading) {
		return (
			<div className="h-screen flex items-center justify-center text-xl">
				Waking up server...
			</div>
		)
	}

	console.log('Current API URL:', import.meta.env.VITE_API_URL)

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/login"
						element={<LoginPages />}
					/>
					<Route
						path="/"
						element={
							<ProtectedRoutes>
								<Ai />
								<Sidebar />
							</ProtectedRoutes>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
