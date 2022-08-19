import { lazy, useContext } from 'react';
import Loadable from '../components/Loadable';
import MainLayout from '../layouts/MainLayout';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import Student from '../pages/Users/Users/Student';
import Staff from '../pages/Users/Users/Staff';
import Faculty from '../pages/Users/Users/Faculty';
import Admin from '../pages/Users/Users/Admin';

const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
const All = Loadable(lazy(() => import('../pages/Requests/All')));
const Completed = Loadable(lazy(() => import('../pages/Requests/Completed')));
const Rejected = Loadable(lazy(() => import('../pages/Requests/Rejected')));
const Pending = Loadable(lazy(() => import('../pages/Requests/Pending')));
const Team = Loadable(lazy(() => import('../pages/Users/Team')));
const Users = Loadable(lazy(() => import('../pages/Users/Users')));
const Assigned = Loadable(lazy(() => import('../pages/Requests/Assigned')));

const AuthorizedRoute = ({ children, ...rest }) => {
	const authContext = useContext(AuthContext);

	if (authContext.isAuthenticated() && authContext.isAuthorized()) {
		return <Outlet />;
	}
	if (authContext.isAuthenticated() && !authContext.isAuthorized()) {
		return <Navigate to="/home" />;
	}
	return <Navigate to="/" />;
};

const SuperAdminRoute = ({ children, ...rest }) => {
	const authContext = useContext(AuthContext);

	if (authContext.isAuthenticated() && authContext.isSuperAdmin()) {
		return <Outlet />;
	}
	if (authContext.isAuthenticated() && !authContext.isSuperAdmin()) {
		return <Navigate to="/home" />;
	}
	return <Navigate to="/" />;
};

const AdminRoute = ({ children, ...rest }) => {
	const authContext = useContext(AuthContext);

	if (authContext.isAuthenticated() && authContext.isAdmin()) {
		return <Outlet />;
	}
	if (authContext.isAuthenticated() && !authContext.isAdmin()) {
		return <Navigate to="/home" />;
	}
	return <Navigate to="/" />;
};

const DashboardRoutes = {
	path: '/',
	element: <MainLayout />,
	children: [
		{
			path: '/',
			element: <AuthorizedRoute />,
			children: [
				{
					path: '/dashboard',
					element: <Dashboard />,
				},
			],
		},
		{
			path: '/',
			element: <SuperAdminRoute />,
			children: [
				{
					path: '/requests/all',
					element: <All />,
				},
				{
					path: '/requests/pending',
					element: <Pending />,
				},
				{
					path: '/requests/completed',
					element: <Completed />,
				},
				{
					path: '/requests/rejected',
					element: <Rejected />,
				},
				{
					path: '/users',
					element: <Users />,
				},
				{
					path: '/users/student',
					element: <Student />,
				},
				{
					path: '/users/staff',
					element: <Staff />,
				},
				{
					path: '/users/faculty',
					element: <Faculty />,
				},
				{
					path: '/users/admin',
					element: <Admin />,
				},
				{
					path: '/users/team',
					element: <Team />,
				},
			],
		},
		{
			path: '/',
			element: <AdminRoute />,
			children: [
				{
					path: '/requests/assign',
					element: <Assigned />,
				},
			],
		},
	],
};

export default DashboardRoutes;
