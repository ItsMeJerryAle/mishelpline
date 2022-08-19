import {
	Box,
	Chip,
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
import CancelIcon from '@mui/icons-material/Cancel';
import { useContext, useEffect, useState } from 'react';
import Approve from './../../../components/Request/Approve';
import Reject from './../../../components/Request/Reject';
import CustomButton from '../../../components/common/CustomButton';
import PopupDialog from '../../../components/common/PopupDialog';
import { allRequest } from '../../../constants/table-headers';
import { AuthContext } from '../../../context/AuthContext';
import { FetchContext } from '../../../context/FetchContext';

const All = () => {
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);
	const [records, setRecords] = useState([]);
	const [openPopup, setOpenPopup] = useState(false);
	const [selectedRecord, setSelectedRecord] = useState({});
	const [openRejectPopup, setOpenRejectPopup] = useState(false);

	const getRequests = () => {
		fetchContext.authAxios
			.get(`/requests`)
			.then(({ data }) => {
				setRecords(data.requests);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleClose = () => {
		setOpenPopup(false);
		setOpenRejectPopup(false);
	};

	useEffect(() => {
		getRequests();
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
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: 'column',
					gap: 2,
				}}
			>
				<Typography variant="h6" component="h2">
					List of All Request
				</Typography>

				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								{allRequest.map((req, index) => (
									<TableCell key={index}>{req.label}</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{records?.map((record, index) => {
								const date = new Date(record?.createdAt);
								const monthWithoutZero = date.getMonth() + 1;
								const month =
									monthWithoutZero < 10
										? `0${monthWithoutZero}`
										: monthWithoutZero;
								const dayWithoutZero = date.getDate();
								const day =
									dayWithoutZero < 10 ? `0${dayWithoutZero}` : dayWithoutZero;

								return (
									<TableRow key={index}>
										<TableCell>{`${month} - ${day}`}</TableCell>
										<TableCell>{record?.ticketNo}</TableCell>
										<TableCell>{`${record?.user?.firstName} ${record?.user?.lastName}`}</TableCell>
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
												{record?.approved === false &&
													record?.rejected === true && (
														<Chip label="Rejected" color="error" />
													)}
											</Box>
										</TableCell>
										{!record?.approved && !record?.rejected ? (
											<TableCell sx={{ display: 'flex', gap: 2 }}>
												<CustomButton
													color="success"
													startIcon={<CheckCircleIcon />}
													onClick={() => {
														// console.log(record?._id);
														setSelectedRecord(record);
														setOpenPopup(true);
													}}
												>
													Approve
												</CustomButton>
												<CustomButton
													color="error"
													startIcon={<CancelIcon />}
													onClick={() => {
														// console.log(record?._id);
														setSelectedRecord(record);
														setOpenRejectPopup(true);
													}}
												>
													Reject
												</CustomButton>
											</TableCell>
										) : (
											<TableCell></TableCell>
										)}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<PopupDialog
				title="By Clicking Submit, You are approving the following request"
				openPopup={openPopup}
				handleClose={handleClose}
			>
				<Approve record={selectedRecord} handleClose={handleClose} />
			</PopupDialog>
			<PopupDialog
				title="Why Reject this Request?"
				openPopup={openRejectPopup}
				handleClose={handleClose}
			>
				<Reject record={selectedRecord} handleClose={handleClose} />
			</PopupDialog>
		</>
	);
};

export default All;
