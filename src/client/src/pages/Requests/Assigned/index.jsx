import {
	Box,
	Chip,
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useContext, useEffect, useState } from 'react';
import { assignedRequest } from '../../../constants/table-headers';
import { AuthContext } from '../../../context/AuthContext';
import { FetchContext } from '../../../context/FetchContext';
import CustomButton from '../../../components/common/CustomButton';
import { SnackbarError, SnackbarSuccess } from '../../../components/SnackBars';

const Assigned = () => {
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);
	const [records, setRecords] = useState([]);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [successMessage, setSuccessMessage] = useState();
	const [errorMessage, setErrorMessage] = useState();
	const [loading, setLoading] = useState(false);

	const getAssignedRequests = async () => {
		fetchContext.authAxios
			.get(`/requests/assigned`)
			.then(({ data }) => {
				setRecords(data.requests);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const completeReq = async (values) => {
		try {
			setLoading(true);
			const { data } = await fetchContext.authAxios.patch(
				`/request/complete/${values.id}`,
				values
			);
			setSuccessMessage(data.message);
			setSuccess(true);
			setErrorMessage('');
			setLoading(false);
		} catch (e) {
			const { data } = e.response;
			setErrorMessage(data.message);
			setError(true);
			setSuccessMessage('');
			setLoading(false);
		}
	};

	useEffect(() => {
		getAssignedRequests();
		const requestChannel = authContext.pusher.subscribe('request');

		requestChannel.bind('created', (newReq) => {
			setRecords((records) => [...records, newReq]);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		requestChannel.bind('updated', (updateReq) => {
			setRecords(
				records.map((request) =>
					request._id === updateReq._id ? { ...records, updateReq } : request
				)
			);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		requestChannel.bind('deleted-req', (deletedReq) => {
			setRecords(
				records.filter((req, index) => req._id !== deletedReq[index]._id)
			);
			fetchContext.setRefreshKey(fetchContext.refreshKey + 1);
		});

		return () => {
			requestChannel.unbind_all();
			requestChannel.unsubscribe('request');
		};
	}, [fetchContext.refreshKey]);

	return (
		<>
			{successMessage && (
				<SnackbarSuccess
					open={success}
					setOpen={setSuccess}
					successMessage={successMessage}
				/>
			)}
			{errorMessage && (
				<SnackbarError
					open={error}
					setOpen={setError}
					errorMessage={errorMessage}
				/>
			)}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: 'column',
					gap: 2,
				}}
			>
				<Typography variant="h6" component="h2">
					Requests
				</Typography>

				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								{assignedRequest.map((req, index) => (
									<TableCell key={index}>{req.label}</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{records.map((record, index) => {
								const date = new Date(record?.createdAt);
								const month = date.getMonth() + 1;
								const day = date.getDate();
								return (
									<TableRow key={index}>
										<TableCell>{`${month} - ${day}`}</TableCell>
										<TableCell>{record?.ticketNo}</TableCell>
										<TableCell>{`${record?.user.firstName} ${record?.user.lastName}`}</TableCell>
										<TableCell>{record?.title}</TableCell>
										<TableCell>{record?.reqType}</TableCell>
										<TableCell>
											<Box sx={{ display: 'flex', gap: 0.5 }}>
												{record?.completed === true &&
													record?.pending === false && (
														<Chip label="Completed" color="success" />
													)}
												{record?.pending === true && (
													<Chip label="Pending" color="secondary" />
												)}
											</Box>
										</TableCell>
										<TableCell>
											{record?.pending ? (
												<CustomButton
													color="success"
													disabled={loading === true}
													startIcon={
														loading === true ? (
															<CircularProgress size={20} color="primary" />
														) : (
															<CheckCircleIcon />
														)
													}
													onClick={() => {
														completeReq(record);
													}}
												>
													Complete Request
												</CustomButton>
											) : (
												''
											)}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
};

export default Assigned;
