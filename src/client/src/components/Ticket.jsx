import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FetchContext } from '../context/FetchContext';

const Ticket = ({ ticketNo, logo, reqType, handleClose, id }) => {
	const history = useNavigate();
	const fetchContext = useContext(FetchContext);
	const [loading, setLoading] = useState(false);

	const sendTicket = async () => {
		try {
			const data = { ticketNo };
			setLoading(true);
			await fetchContext.authAxios.patch(`/request/${id}`, data);
			setLoading(false);
		} catch (e) {
			setLoading(false);
		}
	};

	return (
		<Box>
			<Box
				sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
			>
				{logo}
			</Box>
			<Typography
				variant="h6"
				sx={{ textAlign: 'center', textTransform: 'uppercase' }}
			>
				your request is on the way
			</Typography>
			<Typography
				variant="subtitle2"
				sx={{ textAlign: 'center', textTransform: 'uppercase' }}
			>
				you have requested an assistance for {reqType}, your ticket no. is
			</Typography>
			<Typography
				variant="h3"
				sx={{ textAlign: 'center', textTransform: 'uppercase' }}
			>
				{ticketNo}
			</Typography>
			<Box
				sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
			>
				<Button
					variant="contained"
					color="success"
					disabled={loading === true}
					startIcon={
						loading === true ? (
							<CircularProgress size={20} color="primary" />
						) : null
					}
					onClick={() => {
						sendTicket();
						if (!loading) {
							history('/request', { replace: true });
							return handleClose();
						}
					}}
				>
					Continue
				</Button>
			</Box>
		</Box>
	);
};

export default Ticket;
