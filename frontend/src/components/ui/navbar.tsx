import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { CircleUser, Menu, Package2, Search } from 'lucide-react';
import { Button } from './button';
import { SheetContent, SheetTrigger, Sheet } from './sheet';
import { ModeToggle } from './mode-toggle';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './dropdown-menu';
import { Input } from './input';

function Navbar() {
	return (
		<>
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
				<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive
								? 'flex items-center gap-2 text-lg font-semibold md:text-base'
								: 'flex items-center gap-2 text-lg font-semibold md:text-base text-muted-foreground'
						}
					>
						<Package2 className="h-6 w-6" />
						<span className="sr-only">Acme Inc</span>
					</NavLink>
					<NavLink
						to="/dashboard"
						className={({ isActive }) =>
							isActive
								? 'text-foreground font-semibold'
								: 'text-foreground transition-colors hover:text-foreground'
						}
					>
						Dashboard
					</NavLink>
					<NavLink
						to="/about"
						className={({ isActive }) =>
							isActive
								? 'text-foreground font-semibold'
								: 'text-muted-foreground transition-colors hover:text-foreground'
						}
					>
						Orders
					</NavLink>
					{/* Repeat for other links */}
					<ModeToggle />
				</nav>
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="shrink-0 md:hidden"
						>
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<nav className="grid gap-6 text-lg font-medium">
							{/* Repeat NavLink usage here for mobile navigation */}
							<ModeToggle />
						</nav>
					</SheetContent>
				</Sheet>
				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<form className="ml-auto flex-1 sm:flex-initial">
						<div className="relative">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search products..."
								className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
							/>
						</div>
					</form>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<Outlet />
		</>
	);
}

export default Navbar;
