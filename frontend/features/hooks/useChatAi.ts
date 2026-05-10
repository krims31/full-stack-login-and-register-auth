import { useEffect, useRef, useState } from 'react'
import { useChat } from '../chat/stateChat'

export default function useChatAi() {
	const { messages, isLoading, sendMessage } = useChat()
	const [text, setText] = useState('')
	const [enabled, setEnabled] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	const handleSend = () => {
		if (!text.trim()) return
		sendMessage(text)
		setText('')
	}

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSend()
		}
	}

	return {
		messages,
		isLoading,
		sendMessage,
		enabled,
		text,
		setText,
		setEnabled,
		messagesEndRef,
		handleSend,
		handleKeyPress
	}
}
