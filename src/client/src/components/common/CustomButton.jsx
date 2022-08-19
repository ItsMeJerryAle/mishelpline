import { Button } from '@mui/material';

const CustomButton = ({ children, ...props }) => {
	return (
		<Button variant="contained" sx={{ borderRadius: '0' }} {...props}>
			{children}
		</Button>
	);
};

export default CustomButton;
