export interface RegisterResponse {
	message: string
	user: {
		id: number
		username: string
		email: string
		createdAt: string
	}
}
