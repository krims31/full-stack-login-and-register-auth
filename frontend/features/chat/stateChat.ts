import axios from 'axios'
import { create } from 'zustand'
import { type ChatState } from '../../shared/type/ChatState'
import { type Message } from '../../shared/type/Message'

export const useChat = create<ChatState>((set, get) => ({
	messages: [],
	isLoading: false,
	error: null,

	sendMessage: async (text: string) => {
		const { messages } = get()

		const newMessage: Message = {
			id: Date.now().toString(),
			text,
			role: 'user',
			timestamp: new Date()
		}

		set({ messages: [...messages, newMessage], isLoading: true, error: null })

		try {
			const token = localStorage.getItem('token')

			const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

			const response = await axios.post(
				`${API_URL}/api/chat`,
				{ message: text, history },
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
			)

			const assistantMessage: Message = {
				id: (Date.now() + 1).toString(),
				text: response.data.reply,
				role: 'assistant',
				timestamp: new Date()
			}

			set({
				messages: [...get().messages, assistantMessage],
				isLoading: false,
				error: null
			})
		} catch (error) {
			console.error('Chat error:', error)

			set({
				error:
					error instanceof Error ? error.message : 'Failed to send message',
				isLoading: false
			})

			const errorMessage: Message = {
				id: Date.now().toString(),
				text: "Excuse me, I'm having trouble processing your request.",
				role: 'assistant',
				timestamp: new Date()
			}
			set({ messages: [...get().messages, errorMessage] })
		}
	},

	clearMessage: () => set({ messages: [], error: null })
}))
