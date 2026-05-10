import { useState } from 'react'

export default function useAI() {
	const [enabled, setEnabled] = useState(false)

	const handleSend = () => {
		if (enabled) {
			setEnabled(false)
		}
	}

	return {
		enabled,
		setEnabled,
		handleSend
	}
}
