import { lazy, useContext } from 'react';

// project imports
import Layout from '../layouts/Layout';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loadable from '../components/Loadable';

const Login = Loadable(lazy(() => import('../pages/Authentication/Login')));
const Signup = Loadable(lazy(() => import('../pages/Authentication/Signup')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const LoginRoute = ({ children, ...rest }) => {
	const authContext = useContext(AuthContext);

	if (!authContext.isAuthenticated()) {
		return <Layout>{children}</Layout>;
	}
	if (authContext.isAuthorized()) {
		return <Navigate to="/dashboard" />;
	}
	return <Navigate to="/home" />;
};

const AuthenticationRoutes = {
	path: '/',
	element: <Layout />,
	children: [
		{
			path: '/',
			element: <LoginRoute />,
			children: [
				{
					path: '/',
					element: <Login />,
				},
				{
					path: '/signup',
					element: <Signup />,
				},
			],
		},
	],
};

export default AuthenticationRoutes;
