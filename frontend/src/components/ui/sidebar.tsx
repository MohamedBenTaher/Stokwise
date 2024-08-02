import { cn } from '@/lib/utils/utils';

import { Button } from './button';
import { Home, Search, BookOpen, Bookmark, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

export function Sidebar({ className }: SidebarProps) {
	const navigate = useNavigate();
	return (
		<div
			className={cn(
				' w-24 h-screen flex flex-col items-center justify-center border-r bg-background',
				className,
			)}
		>
			<div className=" py-4 flex h-[30%] flex-col items-center justify-evenly">
				<Button variant="ghost" className="w-full h-20 justify-start">
					<Home />
				</Button>
				<Button variant="ghost" className="w-full h-20 justify-start">
					<Search />
				</Button>
				<Button variant="ghost" className="w-full h-20 justify-start">
					<BookOpen />
				</Button>
				<Button variant="ghost" className="w-full h-20 justify-start">
					<Bookmark />
				</Button>
				<Button variant="ghost" className="w-full h-20 justify-start">
					<Settings />
				</Button>
			</div>
		</div>
	);
}
