import {
	Bot,
	Database,
	FolderClosed,
	GitBranch,
	Headphones,
	History,
	House,
	MessageCircle,
	Settings
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import UserMenu from '../../../../shared/lib/ui/UserMenu'
export default function Sidebar() {
	const navigate = useNavigate()
	return (
		<>
			<aside>
				<img
					src="./ai-icon-circle-png.webp"
					alt="ai"
					className="flex items-center justify-center absolute top-3 left-2 w-10 h-10"
				/>
				<div
					className="border rounded-2xl absolute -top-2 right-407 w-15 h-208 transition-shadow
             border-black/10 shadow-lg hover:shadow-xl outline-0  max-2xl:right-auto max-2xl:left-0"
				>
					<div className="flex flex-col items-center gap-4 mt-20 mr-1">
						{[
							{ icon: House, path: '/' },
							{ icon: MessageCircle, path: '/chat' },
							{ icon: History, path: '/history' },
							{ icon: Bot, path: '/bot' },
							{ icon: FolderClosed, path: '/folder' },
							{ icon: GitBranch, path: '/git' },
							{ icon: Database, path: '/database' }
						].map(({ icon: Icon, path }, index) => (
							<div
								key={index}
								onClick={() => navigate(path)}
								className="
        					relative px-4 py-2 cursor-pointer group
        					before:absolute before:left-0 before:top-0 before:bottom-0 
        					before:w-1 before:bg-purple-500 
        					before:transform before:scale-y-0 before:transition-transform before:duration-300
        					hover:before:scale-y-100
      					"
							>
								<Icon className="text-gray-400 group-hover:text-purple-500 transition-colors" />
							</div>
						))}
					</div>

					<div className="flex flex-col items-center mt-60 gap-4 mr-1">
						{[Headphones, Settings].map((Icon, index) => (
							<div
								key={index}
								className="
									relative px-4 py-2 cursor-pointer group
        					before:absolute before:left-0 before:top-0 before:bottom-0 
        					before:w-1 before:bg-purple-500 
        					before:transform before:scale-y-0 before:transition-transform before:duration-300
        					hover:before:scale-y-100"
							>
								<Icon className="text-gray-400 group-hover:text-purple-500 transition-colors" />
							</div>
						))}
						<div>
							<UserMenu />
						</div>
					</div>
				</div>
			</aside>
		</>
	)
}
