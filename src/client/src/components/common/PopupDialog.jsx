import { IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';

const PopupDialog = ({ title, children, openPopup, handleClose, inputEl }) => {
	return (
		<Dialog
			open={openPopup}
			onClose={(_, reason) => {
				if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
					handleClose();
				}
			}}
			fullWidth
			ref={inputEl}
		>
			<DialogTitle>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					{title}

					<IconButton
						aria-label="close"
						onClick={handleClose}
						sx={{
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>
				</Box>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
};

export default PopupDialog;
