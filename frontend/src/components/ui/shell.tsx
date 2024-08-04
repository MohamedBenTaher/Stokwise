import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import Navbar from './navbar';

const Shell: React.FC = () => {
	return (
		<div className="flex h-screen">
			<aside className="">
				<Sidebar />
			</aside>
			<div className="flex flex-col flex-1">
				<header className="bg-gray-800 text-white p-4">
					{/* <h1>My Application</h1> */}
					{/* Add more header content here */}
					{/* <Navbar /> */}
				</header>
				<main className="flex-1 p-4">
					<Outlet />
				</main>
			</div>
			{/* <footer className="bg-gray-800 text-white p-4">
                <p>&copy; 2023 My Application</p>
            </footer> */}
		</div>
	);
};

export default Shell;
