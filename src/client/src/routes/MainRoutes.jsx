import { lazy, useContext } from 'react';
import Loadable from '../components/Loadable';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from '../layouts/Layout';

const Home = Loadable(lazy(() => import('../pages/Home')));
const MyRequest = Loadable(lazy(() => import('../pages/Requests/MyRequest')));
const RequestForm = Loadable(
	lazy(() => import('../pages/Requests/RequestForm'))
);

const AuthorizedRoute = ({ children, ...rest }) => {
	const authContext = useContext(AuthContext);

	if (
		authContext.isAuthenticated() &&
		(authContext.isFaculty() ||
			authContext.isStaff() ||
			authContext.isStudent())
	) {
		return <Outlet />;
	}
	if (authContext.isAuthenticated()) {
		return <Navigate to="/home" />;
	}
	return <Navigate to="/" />;
};

const MainRoutes = {
	path: '/',
	element: <Layout />,
	children: [
		{
			path: '/',
			element: <AuthorizedRoute />,
			children: [
				{
					path: '/home',
					element: <Home />,
				},
				{
					path: '/request',
					element: <MyRequest />,
				},
				{
					path: '/request/:type',
					element: <RequestForm />,
				},
			],
		},
	],
};

export default MainRoutes;
