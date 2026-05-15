import { Paperclip, Plus, Search, UserRoundPlus } from 'lucide-react'
import useChatAi from '../../../../features/hooks/useChatAi'
import Sidebar from '../ui/Sidebar'

export default function Chat() {
	const {
		messages,
		isLoading,
		handleSend,
		enabled,
		text,
		setText,
		setEnabled,
		messagesEndRef,
		handleKeyPress
	} = useChatAi()

	return (
		<>
			<aside>
				<Sidebar />
			</aside>
			<header className="flex items-center justify-between px-4 xl:px-20 py-4 text-black">
				<div className="flex items-center gap-4">
					<select
						className="border rounded-md px-6 py-1 transition-shadow
             border-black/10 shadow-lg hover:shadow-xl outline-0"
					>
						<option>ChatGPT 4o</option>
						<option>Claude Code</option>
						<option>DeepSeek</option>
						<option>Gemini 1.5</option>
						<option>Grok 4.20</option>
					</select>

					<img
						src="./ai.png"
						alt="ai"
						className="w-4 max-[1280px]:ml-0 xl:-ml-40"
					/>
				</div>

				<div className="flex items-center gap-2 xl:gap-3">
					<button className="flex items-center gap-2 border rounded-md px-2 xl:px-3 py-1 transition-all border-black/10 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
						<Search size={16} />
						<span className="hidden xl:inline">Search thread</span>
					</button>

					<button className="flex items-center gap-2 border rounded-md px-2 xl:px-3 py-1 transition-all border-black/10 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
						<UserRoundPlus size={16} />
						<span className="hidden xl:inline">Invite</span>
					</button>

					<button className="flex items-center gap-2 bg-black text-white rounded-md px-2 xl:px-3 py-1 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
						<Plus size={16} />
						<span>New Thread</span>
					</button>
				</div>
			</header>
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

						{isLoading && (
							<div className="bg-gray-200 text-black self-start p-2 rounded-xl">
								<div className="flex gap-1">
									<span className="animate-bounce text-sm">●</span>
									<span className="animate-bounce delay-100 text-sm">●</span>
									<span className="animate-bounce delay-200 text-sm">●</span>
								</div>
							</div>
						)}

						<div ref={messagesEndRef} />
					</div>

					<div className="w-full flex flex-col items-center mt-70 relative left-0">
						<input
							type={text}
							value={text}
							onChange={e => setText(e.target.value)}
							onKeyDown={handleKeyPress}
							className="w-full max-w-2xl h-32 px-8 pt-1 pb-20 border rounded-2xl placeholder:text-gray-600 transition-shadow border-black/10 shadow-lg hover:shadow-xl outline-0 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent
							firefox:focus:ring-purple-400
							firefox:placeholder:opacity-60 
							webkit:autofill:bg-yellow-50"
							placeholder="Ask AI a question or make a request..."
							disabled={isLoading}
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

								<span className="text-sm text-gray-500">Citation</span>
							</label>
						</div>
						<button
							onClick={handleSend}
							disabled={!text.trim() || isLoading}
							className="bg-black text-white w-8 h-8 rounded-md 
							hover:scale-110 active:scale-90 transition-transform
							firefox:active:translate-y-0.5 mt-4 2xl:ml-155 2xl:-mt-7 xl:ml-150 xl:-mt-7"
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
