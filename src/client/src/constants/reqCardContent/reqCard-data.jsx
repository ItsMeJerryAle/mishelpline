import MemoryIcon from '@mui/icons-material/Memory';
import AlbumIcon from '@mui/icons-material/Album';
import StorageIcon from '@mui/icons-material/Storage';
import LanguageIcon from '@mui/icons-material/Language';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const reqCardData = [
	{
		id: 'data',
		title: 'data',
		icon: <StorageIcon sx={{ fontSize: 40 }} />,
		content: ['Backup', 'Recovery', 'Website Content', 'Social Media Content'],
		url: '/request/data',
	},
	{
		id: 'software',
		title: 'software',
		icon: <AlbumIcon sx={{ fontSize: 40 }} />,
		content: ['Installation', 'Maintenance'],
		url: '/request/software',
	},
	{
		id: 'hardware',
		title: 'hardware',
		icon: <MemoryIcon sx={{ fontSize: 40 }} />,
		content: ['Setup', 'Maintenance'],
		url: '/request/hardware',
	},

	{
		id: 'network',
		title: 'network',
		icon: <LanguageIcon sx={{ fontSize: 40 }} />,
		content: ['Setup', 'Configure', 'Repair', 'Maintenance'],
		url: '/request/network',
	},
	{
		id: 'others',
		title: 'others',
		icon: <MoreVertIcon sx={{ fontSize: 40 }} />,
		content: ['ISMIS', 'Email', 'BISU e-learning', 'Other IT Related'],
		url: '/request/others',
	},
];

export default reqCardData;
