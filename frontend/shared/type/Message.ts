export type Message = {
	id: string
	timestamp: Date
	role: 'user' | 'assistant'
	text: string
}
