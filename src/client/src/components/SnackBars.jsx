import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from 'react';

const Alert = forwardRef((props, ref) => {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarSuccess = ({ open, setOpen, successMessage }) => {
	return (
		<>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				open={open}
				autoHideDuration={2000}
				onClose={() => setOpen(false)}
			>
				<Alert severity="success">{successMessage}</Alert>
			</Snackbar>
		</>
	);
};

export const SnackbarError = ({ open, setOpen, errorMessage }) => {
	return (
		<>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				open={open}
				autoHideDuration={2000}
				onClose={() => setOpen(false)}
			>
				<Alert severity="error">{errorMessage}</Alert>
			</Snackbar>
		</>
	);
};
