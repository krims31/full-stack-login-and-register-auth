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
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>()

	const navigate = useNavigate()

	const setAuth = useAuthState(state => state.setAuth)

	useEffect(() => {
		const token = localStorage.getItem('token')

		if (token) {
			setAuth(true)
		}
	}, [setAuth])

	const onSubmit: SubmitHandler<Inputs> = async data => {
		try {
			const response = await login(data.email, data.password)

			console.log('SUCCESS', response)

			navigate('/')
		} catch (error) {
			console.error('ERROR', error)
		}
	}

	return (
		// Центрируем форму на экране
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6"
			>
				<header>
					<h1 className="text-4xl font-bold text-center text-gray-800">
						Sign In
					</h1>
				</header>

				<div className="flex flex-col gap-4">
					{/* Поле Email */}
					<div className="flex flex-col gap-1">
						<input
							{...register('email', { required: 'Email is required' })}
							placeholder="Email"
							className={`border p-3 rounded-xl focus:outline-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
						/>

						<button>
							{showPassword ? (
								<MdOutlineMailOutline
									className="absolute right-150 top-62"
									size={30}
								/>
							) : (
								<MdOutlineMailOutline
									className="absolute right-167 top-31"
									size={30}
								/>
							)}
						</button>

						{errors.email && (
							<span className="text-red-500 text-sm">
								{errors.email.message}
							</span>
						)}
					</div>

					{/* Поле Password */}
					<div className="flex flex-col gap-1">
						<input
							{...register('password', {
								required: 'Password is required',
								minLength: { value: 6, message: 'Min length 6 symbols' }
							})}
							type={showPassword ? 'text' : 'password'}
							placeholder="Password"
							className={`border p-3 rounded-xl focus:outline-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-167 top-48"
						>
							{showPassword ? (
								<AiOutlineEyeInvisible size={30} />
							) : (
								<AiOutlineEyeInvisible size={30} />
							)}
						</button>
						{errors.password && (
							<span className="text-red-500 text-sm">
								{errors.password.message}
							</span>
						)}
					</div>

					<Link
						to="/forgotten-password"
						title="Восстановить пароль"
						className="text-sm text-blue-600 hover:underline self-end"
					>
						Forgotten Password?
					</Link>
				</div>

				<button
					type="submit"
					className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
				>
					Sign In
				</button>

				<div className="flex items-center gap-2">
					<div className="w-full h-px bg-gray-400"></div>
					<p className="text-gray-600">OR</p>
					<div className="w-full h-px bg-gray-400"></div>
				</div>

				<div className="flex gap-4 justify-center items-center">
					<button className="p-2 hover:bg-gray-100 rounded-full transition">
						<img
							src="./facebook.png"
							alt="Facebook"
							className="w-10 h-10"
						/>
					</button>

					<button className="p-2 hover:bg-gray-100 rounded-full transition">
						<img
							src="./google.png"
							alt="Google"
							className="w-10 h-10"
						/>
					</button>
				</div>

				<footer className="text-center pt-4">
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
