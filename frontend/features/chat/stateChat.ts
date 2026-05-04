import { create } from 'zustand'
import { ChatState } from '../../shared/type/ChatState'

export const useChat = create<ChatState>((set, get) => ({
	messages: [],

	addMessage: msg =>
		set(state => ({
			messages: [...state.messages, msg]
		})),
	sendMessage: text => {
		const { addMessage } = get()

		addMessage({ role: 'user', text })

		setTimeout(() => {
			addMessage({ role: 'ai', text: 'Hello from AI' })
		}, 1000)
	}
}))
