import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import Navbar from './navbar';

const Shell: React.FC = () => {
	return (
		<div className="shell">
			<header>
				{/* <h1>My Application</h1> */}
				{/* Add more header content here */}
				{/* <Navbar /> */}
			</header>
			<aside>
				<Sidebar />
			</aside>
			<main>
				<Outlet />
			</main>
			{/* <footer>
				<p>&copy; 2023 My Application</p>
			</footer> */}
		</div>
	);
};

export default Shell;
