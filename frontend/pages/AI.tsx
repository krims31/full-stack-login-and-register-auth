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
	return (
		<>
			<header className="flex items-center justify-between px-20 py-4 text-black">
				<div className="flex items-center gap-4">
					<select
						className="border rounded-md px-7 py-1 transition-shadow
             border-black/10 shadow-lg hover:shadow-xl outline-0"
					>
						<option>ChatGPT 4o</option>
						<option>Claude Code</option>
						<option>Deepseek</option>
					</select>
					<img
						src="./ai.png"
						alt="ai"
						className="w-4 -ml-42"
					/>
				</div>

				<div className="flex items-center gap-3">
					<button
						className="flex items-center gap-2 border rounded-md px-3 py-1 transition-shadow
             border-black/10 shadow-lg hover:shadow-xl outline-0"
					>
						<Search
							size={16}
							className="text-black"
						/>
						<span>Search thread</span>
					</button>

					<button
						className="flex items-center gap-2 border rounded-md px-3 py-1 transition-shadow
             border-black/10 shadow-lg hover:shadow-xl outline-0"
					>
						<UserRoundPlus
							size={16}
							className="text-black"
						/>
						<span>Invite</span>
					</button>

					<button
						className="flex items-center gap-2 bg-black text-white rounded-md px-3 py-1 transition-shadow
             border-black/10 shadow-lg hover:shadow-xl outline-0"
					>
						<Plus size={16} />
						<span>New Thread</span>
					</button>
				</div>
			</header>

			<main>
				<div>
					<img
						src="./purple-ball-png-3d-geometric-shape-transparent-background_53876-977295.jpg"
						alt="purple-circle"
						className="w-25 h-25 flex item-center justify-center absolute top-15 left-200 animate-spin"
					/>
					<h1 className="ml-150 mt-30 text-5xl text-black">
						Good Afternoon, Krims <br />
						<span className="ml-3">
							What's on{' '}
							<span className="bg-linear-to-r from-purple-400 to-purple-700 bg-clip-text text-transparent">
								your mind?
							</span>
						</span>
					</h1>
					<div>
						<input
							type="text"
							id="user-input"
							className="mt-15 ml-110 w-193 h-40 pb-27 pl-10 border rounded-2xl placeholder:text-gray-600 transition-shadow
             border-black/10 shadow-lg hover:shadow-xl outline-0"
							placeholder="Ask AI a question or make a request..."
						/>
						<button
							className="border rounded-md relative -top-11 ml-112 w-20 h-8 text-black transition-shadow flex item-center pl-6 pt-0.5 
             border-black/10 shadow-lg hover:shadow-xl"
						>
							<Paperclip
								size={15}
								className="absolute top-2 left-1"
							/>
							Attach
						</button>
						<label>
							<select
								className="relative z-10 border rounded-md -mt-19 ml-135 w-30 h-8 flex text-center text-black transition-shadow 
             border-black/10 shadow-lg hover:shadow-xl"
							>
								<option value="1">Writing Styles</option>
							</select>
						</label>
						<div className="flex items-center gap-2">
							<label className="relative inline-flex items-center cursor-pointer -mt-8 ml-260">
								<input
									type="checkbox"
									className="sr-only peer"
									checked={enabled}
									onChange={() => setEnabled(!enabled)}
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
								<span className="ml-3 text-sm font-medium text-gray-900">
									Citation
								</span>
							</label>
						</div>
						<button
							className="border bg-black rounded-md w-8 h-8 transition-shadow 
             border-black/10 shadow-lg hover:shadow-xl text-white relative z-10 -top-8 ml-290"
						>
							↑
						</button>
					</div>
				</div>
			</main>

			<footer>
				<div>
					<p className="transform uppercase text-black font-mono mt-5 ml-110">
						Get started with an example below
					</p>
				</div>
				<div
					className="border rounded-md bg-gray-100 w-42 h-30 transition-shadow 
             border-black/10 shadow-lg hover:shadow-xl mt-5 ml-110"
				>
					<p className="mt-1 ml-3">
						Write a to-do list for a <br /> personal project
						<User className="text-black mt-10" />
					</p>
				</div>
				<div
					className="border rounded-md bg-gray-100 w-42 h-30 transition-shadow 
             border-black/10 shadow-lg hover:shadow-xl -mt-30 ml-160"
				>
					<p className="mt-1 ml-3">
						Generate an email to <br /> reply to a job offer
						<Mail className="text-black mt-10" />
					</p>
				</div>
				<div
					className="border rounded-md bg-gray-100 w-42 h-30 transition-shadow 
             border-black/10 shadow-lg hover:shadow-xl -mt-30 ml-210"
				>
					<p className="mt-1 ml-3">
						Summarize this article <br /> in one paragraph
						<MessageCircle className="text-black mt-10" />
					</p>
				</div>
				<div
					className="border rounded-md bg-gray-100 w-42 h-30 transition-shadow 
             border-black/10 shadow-lg hover:shadow-xl -mt-30 ml-260"
				>
					<p className="mt-1 ml-3">
						How does AI work in a <br /> technical capacity
						<Code className="text-black mt-10" />
					</p>
				</div>
				<img
					src="ai-black.png"
					alt="ai-black"
					width={20}
					className="-mt-86 ml-113"
				/>
			</footer>
		</>
	)
}
