import { Paper } from '@mui/material';

const CustomPaper = ({ children, props }) => {
	return (
		<Paper
			sx={{
				borderRadius: 0,
				border: 1,
				borderColor: '#192a56',
				backgroundColor: 'transparent',
			}}
			{...props}
		>
			{children}
		</Paper>
	);
};

export default CustomPaper;
