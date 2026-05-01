import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { MdOutlineMailOutline } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import type { Inputs } from '../entities/user/types'
import { useAuthState } from '../features/auth/state'
import { login } from '../shared/api/axios'

export default function LoginPages() {
	const [showPassword, setShowPassword] = useState(false)

	const setAuth = useAuthState(state => state.setAuth)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>()

	useEffect(() => {
		console.log('API URL:', import.meta.env.VITE_API_URL)
	}, [])

	const navigate = useNavigate()

	const onSubmit: SubmitHandler<Inputs> = async data => {
		try {
			const response = await login(data.email, data.password)

			// сохраняем токен
			localStorage.setItem('token', response.token)

			setAuth(true)

			navigate('/')
		} catch (error) {
			console.error('ERROR', error)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-md sm:max-w-lg bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col gap-6"
			>
				{/* TITLE */}
				<header className="text-center">
					<h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
						Sign In
					</h1>
				</header>

				{/* EMAIL */}
				<div className="flex flex-col gap-1">
					<div className="relative">
						<input
							{...register('email', {
								required: 'Email is required'
							})}
							placeholder="Email"
							className={`w-full border p-3 pl-10 rounded-xl focus:outline-blue-500 ${
								errors.email ? 'border-red-500' : 'border-gray-300'
							}`}
						/>

						<MdOutlineMailOutline
							className="absolute left-2 top-3 text-gray-400"
							size={30}
						/>
					</div>

					{errors.email && (
						<span className="text-red-500 text-sm">{errors.email.message}</span>
					)}
				</div>

				{/* PASSWORD */}
				<div className="flex flex-col gap-1">
					<div className="relative">
						<input
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Min length 6 symbols'
								}
							})}
							type={showPassword ? 'text' : 'password'}
							placeholder="Password"
							className={`w-full border p-3 pl-10 pr-10 rounded-xl focus:outline-blue-500 ${
								errors.password ? 'border-red-500' : 'border-gray-300'
							}`}
						/>

						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-104 top-3 text-gray-500"
						>
							<AiOutlineEyeInvisible size={30} />
						</button>
					</div>

					{errors.password && (
						<span className="text-red-500 text-sm">
							{errors.password.message}
						</span>
					)}
				</div>

				{/* FORGOT PASSWORD */}
				<Link
					to="/forgotten-password"
					className="text-sm text-blue-600 hover:underline self-end"
				>
					Forgot Password?
				</Link>

				{/* SUBMIT */}
				<button
					type="submit"
					className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
				>
					Sign In
				</button>

				{/* DIVIDER */}
				<div className="flex items-center gap-2">
					<div className="w-full h-px bg-gray-300"></div>
					<p className="text-gray-500 text-sm">OR</p>
					<div className="w-full h-px bg-gray-300"></div>
				</div>

				{/* SOCIAL */}
				<div className="flex gap-4 justify-center items-center">
					<button className="p-2 hover:bg-gray-100 rounded-full transition">
						<img
							src="./facebook.png"
							alt="Facebook"
							className="w-9 h-9"
						/>
					</button>

					<button className="p-2 hover:bg-gray-100 rounded-full transition">
						<img
							src="./google.png"
							alt="Google"
							className="w-9 h-9"
						/>
					</button>
				</div>

				{/* FOOTER */}
				<footer className="text-center pt-4 text-sm">
					<p>
						New here?{' '}
						<Link
							to="/register"
							className="text-blue-600 font-medium hover:underline"
						>
							Register
						</Link>
					</p>
				</footer>
			</form>
		</div>
	)
}
