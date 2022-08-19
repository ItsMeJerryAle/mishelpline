import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
	return (
		<Box sx={{ display: 'flex' }}>
			<Sidebar />
			<Box sx={{ flexGrow: 1 }}>
				<Header />
				<Box component="main" sx={{ flexGrow: 1, px: 3, pt: 5, pb: 2 }}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default MainLayout;
