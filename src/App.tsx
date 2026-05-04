import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoutes } from '../frontend/app/providers/routes/ProtectedRoutes'
import useAuth from '../frontend/features/hooks/useAuth'
import Ai from '../frontend/pages/AI'
import Chat from '../frontend/pages/Chat'
import LoginPages from '../frontend/pages/LoginPages'
import RegisterPages from '../frontend/pages/RegisterPages'
import Sidebar from '../frontend/pages/widgets/sidebar/ui/Sidebar'
import './App.css'

function App() {
	useAuth()
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
						path="/register"
						element={<RegisterPages />}
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

					<Route
						path="/chat"
						element={
							<ProtectedRoutes>
								<Chat />
							</ProtectedRoutes>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
