import { BrowserRouter, Route, Routes } from 'react-router'
import { ProtectedRoutes } from '../frontend/app/providers/routes/ProtectedRoutes'
import useAuth from '../frontend/features/auth/useAuth'
import LoginPages from '../frontend/pages/LoginPages'
import UserPanel from '../frontend/pages/UserPanel'
import './App.css'

function App() {
	const { isLoading } = useAuth()

	if (isLoading) {
		return <div>Loading...</div>
	}

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
								<UserPanel />
							</ProtectedRoutes>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
