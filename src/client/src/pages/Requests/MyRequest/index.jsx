import {
	Box,
	Container,
	Paper,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	TableCell,
	TableBody,
	Table,
	Chip,
	CircularProgress,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { FetchContext } from '../../../context/FetchContext';
import Header from '../../../components/Header';
import { request } from '../../../constants/table-headers';
import CustomButton from '../../../components/common/CustomButton';
import { SnackbarSuccess } from '../../../components/SnackBars';

const MyRequest = () => {
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);
	const [success, setSuccess] = useState(false);
	const [successMessage, setSuccessMessage] = useState();
	const [loading, setLoading] = useState(false);
	const [records, setRecords] = useState([]);

	const getUserRequests = async () => {
		fetchContext.authAxios
			.get(`/user-requests`)
			.then(({ data }) => {
				setRecords(data.requests);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const cancelRequest = async (id) => {
		setLoading(true);
		fetchContext.authAxios
			.delete(`/request/${id}`)
			.then(({ data }) => {
				setSuccessMessage(data.message);
				setSuccess(true);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getUserRequests();

		const requestChannel = authContext.pusher.subscribe('request');

		requestChannel.bind('created', (newReq) => {
			setRecords((records) => [...records, newReq]);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		requestChannel.bind('updated', (updateReq) => {
			setRecords(
				records?.map((request) =>
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
			<Header />
			<Container>
				<Box sx={{ marginTop: 5 }}>
					<Typography variant="h2" component="h1">
						My Requests
					</Typography>
					<Typography variant="h6" component="p" sx={{ marginTop: 2 }}>
						List of your pending and completed request
					</Typography>

					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									{request.map((req, index) => (
										<TableCell key={index}>{req.label}</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{/* <TableRow>
									{request.map((req, index) => (
										<TableCell key={index}>{req.label}</TableCell>
									))}
								</TableRow> */}
								{records.map((record, index) => {
									const date = new Date(record?.createdAt);
									const month = date.getMonth() + 1;
									const day = date.getDate();
									return (
										<TableRow key={index}>
											<TableCell>{`${month} - ${day}`}</TableCell>
											<TableCell>{record?.ticketNo}</TableCell>
											<TableCell>{record?.title}</TableCell>
											<TableCell>{record?.reqType}</TableCell>
											<TableCell>
												<Box sx={{ display: 'flex', gap: 0.5 }}>
													{record?.approved === false &&
														record?.rejected === false && (
															<Chip label="In Evaluation" color="warning" />
														)}
													{record?.approved === true && (
														<Chip label="Approved" color="success" />
													)}
													{record?.completed === true && (
														<Chip label="Completed" color="success" />
													)}
													{record?.pending === true && (
														<Chip label="Pending" color="secondary" />
													)}
													{record?.rejected === true && (
														<Chip label="Rejected" color="error" />
													)}
												</Box>
											</TableCell>
											<TableCell>
												{!record?.rejected && (
													<CustomButton
														color="error"
														onClick={() => cancelRequest(record?._id)}
														disabled={loading === true}
														startIcon={
															loading === true ? (
																<CircularProgress size={20} color="primary" />
															) : null
														}
													>
														Cancel
													</CustomButton>
												)}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Container>
		</>
	);
};

export default MyRequest;
