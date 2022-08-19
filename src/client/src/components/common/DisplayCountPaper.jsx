import { Box, Icon, Paper, Typography } from '@mui/material';
import React from 'react';

const DisplayCountPaper = ({ pending, count, title, icon, bgColor }) => {
	return (
		<Paper
			sx={{
				backgroundColor: bgColor,
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			<Box p={pending ? 8.28 : 4} sx={{ position: 'relative', color: 'white' }}>
				<Typography variant={pending ? 'h1' : 'h4'} component="h4">
					{count}
				</Typography>
				<Typography variant={pending ? 'h6' : 'p'} component="p">
					{title}
				</Typography>
				{icon}
			</Box>
		</Paper>
	);
};

export default DisplayCountPaper;
