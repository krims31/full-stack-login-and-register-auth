import { useForm, type SubmitHandler } from 'react-hook-form'
import type { Inputs } from '../entities/user/types'


export default function LoginPages() {
	const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>Sign In</h1>
				<input {...register('email')} placeholder="Email" />
				<input {...register('password')} placeholder="Password" />
				<button type="submit">Submit</button>
			</form>
		</>
	)
}