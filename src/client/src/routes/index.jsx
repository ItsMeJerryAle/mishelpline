import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthRoute from './AuthRoute';
import config from '../config';
import DashboardRoutes from './DashboardRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
	return useRoutes([AuthRoute, MainRoutes, DashboardRoutes], config.basename);
}
