import { type Message } from './Message'
export type ChatState = {
	messages: Message[]
	isLoading: boolean
	error: string | null
	sendMessage: (text: string) => Promise<void>
	clearMessage: () => void
}
