import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoutes } from '../frontend/app/providers/routes/ProtectedRoutes'
import useAuth from '../frontend/features/hooks/useAuth'
import Ai from '../frontend/pages/AI'
import LoginPages from '../frontend/pages/LoginPages'
import RegisterPages from '../frontend/pages/RegisterPages'
import Bot from '../frontend/pages/widgets/sidebar/pages for icon/Bot'
import Chat from '../frontend/pages/widgets/sidebar/pages for icon/Chat'
import Database from '../frontend/pages/widgets/sidebar/pages for icon/DataBase'
import Folder from '../frontend/pages/widgets/sidebar/pages for icon/Folder'
import Git from '../frontend/pages/widgets/sidebar/pages for icon/Git'
import Headphones from '../frontend/pages/widgets/sidebar/pages for icon/Headphones'
import History from '../frontend/pages/widgets/sidebar/pages for icon/History'
import Settings from '../frontend/pages/widgets/sidebar/pages for icon/Settings'
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

					<Route
						path="/history"
						element={
							<ProtectedRoutes>
								<History />
							</ProtectedRoutes>
						}
					/>

					<Route
						path="/bot"
						element={
							<ProtectedRoutes>
								<Bot />
							</ProtectedRoutes>
						}
					/>

					<Route
						path="/folder"
						element={
							<ProtectedRoutes>
								<Folder />
							</ProtectedRoutes>
						}
					/>

					<Route
						path="/git"
						element={
							<ProtectedRoutes>
								<Git />
							</ProtectedRoutes>
						}
					/>

					<Route
						path="/database"
						element={
							<ProtectedRoutes>
								<Database />
							</ProtectedRoutes>
						}
					/>

					<Route
						path="/headphones"
						element={
							<ProtectedRoutes>
								<Headphones />
							</ProtectedRoutes>
						}
					/>

					<Route
						path="/settings"
						element={
							<ProtectedRoutes>
								<Settings />
							</ProtectedRoutes>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
