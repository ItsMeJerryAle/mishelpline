import RequestPageIcon from '@mui/icons-material/RequestPage';

const requestLinks = {
	title: 'List of Requests',
	children: [
		{
			id: 'all',
			title: 'All Requests',
			type: 'item',
			url: '/requests/all',
			allowedRoles: ['superAdmin'],
			icon: <RequestPageIcon />,
		},
		{
			id: 'assigned',
			title: 'Assigned Requests',
			type: 'item',
			url: '/requests/assign',
			allowedRoles: ['admin'],
			icon: <RequestPageIcon />,
		},
		{
			id: 'pending',
			title: 'Pending',
			type: 'item',
			url: '/requests/pending',
			allowedRoles: ['superAdmin'],
			icon: <RequestPageIcon />,
		},
		{
			id: 'completed',
			title: 'Completed',
			type: 'item',
			url: '/requests/completed',
			allowedRoles: ['superAdmin'],
			icon: <RequestPageIcon />,
		},
		{
			id: 'rejected',
			title: 'Rejected',
			type: 'item',
			url: '/requests/rejected',
			allowedRoles: ['superAdmin'],
			icon: <RequestPageIcon />,
		},
	],
};

export default requestLinks;
