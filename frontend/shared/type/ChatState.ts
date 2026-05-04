import { Message } from './Message'
export type ChatState = {
	messages: Message[]
	addMessage: (msg: Message) => void
	sendMessage: (text: string) => void
}
