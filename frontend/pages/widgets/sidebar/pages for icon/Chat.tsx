import { Paperclip } from 'lucide-react'
import { useState } from 'react'
import { useChat } from '../../../../features/chat/stateChat'
import Sidebar from '../ui/Sidebar'

export default function Chat() {
	const { messages } = useChat()
	const { sendMessage } = useChat()
	const [text, setText] = useState('')
	const [enabled, setEnabled] = useState(false)

	const handleSend = () => {
		if (!text.trim()) return
		sendMessage(text)
		setText('')
	}

	return (
		<>
			<aside>
				<Sidebar />
			</aside>
			<main>
				<div className="p-10 text-white">
					<div className="flex flex-col gap-2 mt-10 max-w-2xl mx-auto">
						{messages.map((msg, i) => (
							<div
								key={i}
								className={`p-3 rounded-xl ${
									msg.role === 'user'
										? 'bg-blue-500 text-white self-end'
										: 'bg-gray-200 text-black self-start'
								}`}
							>
								{msg.text}
							</div>
						))}
					</div>

					<img
						src="./purple-ball-png-3d-geometric-shape-transparent-background_53876-977295.jpg"
						alt="purple-circle"
						className="w-20 h-20 animate-spin mb-6 flex items-center justify-center relative left-195 top-8"
					/>

					<h1 className="text-3xl xl:text-5xl text-black font-bold leading-tight relative left-140 top-10">
						Good Afternoon, Krims <br />
						<span className="text-gray-800">
							What's on{' '}
							<span className="bg-linear-to-r from-purple-400 to-purple-700 bg-clip-text text-transparent">
								your mind?
							</span>
						</span>
					</h1>

					<div className="w-full flex flex-col items-center mt-20 relative left-0">
						<input
							type={text}
							onClick={handleSend}
							className="w-full max-w-2xl h-32 px-8 pt-1 pb-20 border rounded-2xl placeholder:text-gray-600 transition-shadow border-black/10 shadow-lg hover:shadow-xl outline-0 text-black"
							placeholder="Ask AI a question or make a request..."
						/>

						<button className="relative -mt-12 mr-auto border rounded-md px-2 xl:px-3 py-1 transition-shadow border-black/10 shadow-lg hover:shadow-xl xl:ml-75 2xl:ml-120 lg:ml-50 flex items-center gap-1 text-black max-[1280px]:ml-40">
							<Paperclip size={15} />
							Attach
						</button>

						<div className="flex flex-wrap justify-center items-center gap-4 -mt-8">
							<select className="border rounded-md px-3 py-1 xl:px-3 transition-shadow border-black/10 shadow-lg hover:shadow-xl mr-50 2xl:ml-10 text-black">
								<option>Writing Styles</option>
							</select>

							<label className="flex items-center gap-2 cursor-pointer">
								<input
									type="checkbox"
									className="sr-only"
									checked={enabled}
									onChange={() => setEnabled(!enabled)}
								/>
								<div
									className={`w-11 h-6 rounded-full relative 2xl:mr-0 xl:ml-0 transition-colors duration-200 ease-in-out ${
										enabled ? 'bg-violet-600' : 'bg-gray-300'
									}`}
								>
									<div
										className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out ${
											enabled ? 'translate-x-5' : ''
										}`}
									/>
								</div>

								<span className="text-sm text-gray-400">Citation</span>
							</label>
						</div>
						<button
							onClick={handleSend}
							className="bg-black text-white w-8 h-8 rounded-md mt-4 2xl:ml-155 2xl:-mt-7 xl:ml-150 xl:-mt-7"
						>
							↑
						</button>
						<img
							src="./ai-black.png"
							alt="ai-black"
							className="2xl:-mt-24 2xl:-ml-159 2xl:w-4 xl:w-4 xl:-mt-75 xl:ml-74"
						/>
					</div>
				</div>
			</main>
		</>
	)
}
