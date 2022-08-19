import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => (
	<Box>
		<Outlet />
	</Box>
);

export default Layout;
