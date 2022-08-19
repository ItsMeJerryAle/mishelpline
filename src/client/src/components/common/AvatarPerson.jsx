import { Avatar, Box } from '@mui/material';
import React from 'react';

const AvatarPerson = ({ pic, text }) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Avatar alt={text} src={pic} sx={{ width: 180, height: 180 }} />
		</Box>
	);
};

export default AvatarPerson;
