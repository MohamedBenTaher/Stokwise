import { cn } from '@/lib/utils/utils';
import { Button } from './button';
import { Home, Search, BookOpen, Bookmark, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Icons } from './icons';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

export function Sidebar({ className }: SidebarProps) {
	return (
		<div
			className={cn(
				'w-24 h-screen flex flex-col items-center border-r bg-background',
				className,
			)}
		>
			<div className="p-5 ">
				<NavLink to="/" className="w-full h-20">
					<Icons.Logo width={24} />
				</NavLink>
			</div>
			<div className="flex-1 flex flex-col items-center justify-center py-4">
				<NavLink to="/" className="w-full h-20">
					<Button variant="ghost" className="w-full h-20 justify-start">
						<Home />
					</Button>
				</NavLink>
				<NavLink to="/search" className="w-full h-20">
					<Button variant="ghost" className="w-full h-20 justify-start">
						<Search />
					</Button>
				</NavLink>
				<NavLink to="/portfolio" className="w-full h-20">
					<Button variant="ghost" className="w-full h-20 justify-start">
						<BookOpen />
					</Button>
				</NavLink>
				<NavLink to="/bookmarks" className="w-full h-20">
					<Button variant="ghost" className="w-full h-20 justify-start">
						<Bookmark />
					</Button>
				</NavLink>
				<NavLink to="/settings" className="w-full h-20">
					<Button variant="ghost" className="w-full h-20 justify-start">
						<Settings />
					</Button>
				</NavLink>
			</div>
		</div>
	);
}
