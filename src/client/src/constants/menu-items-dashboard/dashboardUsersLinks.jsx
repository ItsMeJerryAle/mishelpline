import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';

const usersLinks = {
	title: 'Users',
	children: [
		{
			id: 'systemUsers',
			title: 'System Users',
			url: '/users',
			allowedRoles: ['superAdmin'],
			icon: <PersonIcon />,
		},
		{
			id: 'adminUsers',
			title: 'Admin Users',
			url: '/users/admin',
			allowedRoles: ['superAdmin'],
			icon: <PersonIcon />,
		},
		{
			id: 'faculty',
			title: 'Faculty',
			url: '/users/faculty',
			allowedRoles: ['superAdmin'],
			icon: <PersonIcon />,
		},
		{
			id: 'Staff',
			title: 'Staff',
			url: '/users/staff',
			allowedRoles: ['superAdmin'],
			icon: <PersonIcon />,
		},
		{
			id: 'student',
			title: 'Student',
			url: '/users/student',
			allowedRoles: ['superAdmin'],
			icon: <PersonIcon />,
		},
		{
			id: 'teamManagement',
			title: 'Team Management',
			url: '/users/team',
			allowedRoles: ['superAdmin'],
			icon: <GroupIcon />,
		},
	],
};

export default usersLinks;
