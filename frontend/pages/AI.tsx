import {
	Code,
	Mail,
	MessageCircle,
	Paperclip,
	Plus,
	Search,
	User,
	UserRoundPlus
} from 'lucide-react'
import { useState } from 'react'

export default function Ai() {
	const [enabled, setEnabled] = useState(false)

	const handleSend = () => {
		if (enabled) {
			setEnabled(false)
		}
	}

	return (
		<div className="min-h-screen max-w-360 mx-auto overflow-x-hidden px-4">
			{/* HEADER */}
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
						className="w-4 -ml-40"
					/>
				</div>

				<div className="flex items-center gap-2 xl:gap-3">
					<button className="flex items-center gap-2 border rounded-md px-2 xl:px-3 py-1 transition-shadow border-black/10 shadow-lg hover:shadow-xl">
						<Search size={16} />
						<span className="hidden xl:inline">Search thread</span>
					</button>

					<button className="flex items-center gap-2 border rounded-md px-2 xl:px-3 py-1 transition-shadow border-black/10 shadow-lg hover:shadow-xl">
						<UserRoundPlus size={16} />
						<span className="hidden xl:inline">Invite</span>
					</button>

					<button className="flex items-center gap-2 bg-black text-white rounded-md px-2 xl:px-3 py-1 transition-shadow shadow-lg hover:shadow-xl">
						<Plus size={16} />
						<span>New Thread</span>
					</button>
				</div>
			</header>

			{/* MAIN */}
			<main className="relative flex flex-col items-center text-center mt-20">
				<img
					src="./purple-ball-png-3d-geometric-shape-transparent-background_53876-977295.jpg"
					alt="purple-circle"
					className="w-20 h-20 animate-spin mb-6"
				/>

				<h1 className="text-3xl xl:text-5xl text-black font-bold leading-tight">
					Good Afternoon, Krims <br />
					<span className="text-gray-800">
						What's on{' '}
						<span className="bg-linear-to-r from-purple-400 to-purple-700 bg-clip-text text-transparent">
							your mind?
						</span>
					</span>
				</h1>

				{/* INPUT */}
				<div className="w-full flex flex-col items-center mt-10">
					<input
						type="text"
						onKeyDown={e => e.key === 'Enter' && handleSend}
						className="w-full max-w-2xl h-32 px-8 pt-1 pb-20 border rounded-2xl placeholder:text-gray-600 transition-shadow border-black/10 shadow-lg hover:shadow-xl outline-0 text-black"
						placeholder="Ask AI a question or make a request..."
					/>

					{/* Attach */}
					<button className="relative -mt-12 mr-auto border rounded-md px-2 xl:px-3 py-1 transition-shadow border-black/10 shadow-lg hover:shadow-xl xl:ml-75 2xl:ml-95 lg:ml-50 flex items-center gap-1 text-black max-[1280px]:ml-40">
						<Paperclip size={15} />
						Attach
					</button>

					{/* OPTIONS */}
					<div className="flex flex-wrap justify-center items-center gap-4 -mt-8">
						<select className="border rounded-md px-3 py-1 xl:px-3 transition-shadow border-black/10 shadow-lg hover:shadow-xl mr-50 2xl:ml-30 text-black">
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

							<span className="text-sm">Citation</span>
						</label>
					</div>

					{/* SEND */}
					<button
						onClick={handleSend}
						onKeyDown={event => event.key === 'Enter' && handleSend()}
						className="bg-black text-white w-8 h-8 rounded-md mt-4 2xl:ml-155 2xl:-mt-7 xl:ml-150 xl:-mt-7"
					>
						↑
					</button>
				</div>
			</main>

			{/* FOOTER */}
			<footer className="mt-16">
				<p className="uppercase text-black font-mono text-center mb-6 2xl:mr-80 2xl:-mt-5 2xl:-ml-2 xl:-ml-85 xl:-mt-5">
					Get started with an example below
				</p>

				<div className="grid grid-cols-1 xl:w-200 xl:ml-50 2xl:w-200 sm:grid-cols-2 xl:grid-cols-4 gap-4 2xl:ml-70">
					<Card
						text="Write a to-do list for a personal project"
						icon={<User className="text-black" />}
					/>
					<Card
						text="Generate an email to reply to a job offer"
						icon={<Mail className="text-black" />}
					/>
					<Card
						text="Summarize this article in one paragraph"
						icon={<MessageCircle className="text-black" />}
					/>
					<Card
						text="How does AI work in a technical capacity"
						icon={<Code className="text-black" />}
					/>
				</div>
				<img
					src="./ai-black.png"
					alt="ai-black"
					className="2xl:-mt-75 2xl:ml-94 2xl:w-4 xl:w-4 xl:-mt-75 xl:ml-74"
				/>
			</footer>
		</div>
	)
}

function Card({ text, icon }: { text: string; icon: React.ReactNode }) {
	return (
		<div className="border rounded-md bg-gray-100 p-4 transition-shadow border-black/10 shadow-lg hover:shadow-xl h-28 flex flex-col justify-between">
			<p>{text}</p>
			<div>{icon}</div>
		</div>
	)
}
