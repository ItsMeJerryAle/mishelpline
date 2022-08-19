import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { rejectedRequest } from '../../../constants/table-headers';
import { AuthContext } from '../../../context/AuthContext';
import { FetchContext } from '../../../context/FetchContext';

const Rejected = () => {
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);
	const [records, setRecords] = useState([]);

	const getRejectedRequests = async () => {
		fetchContext.authAxios
			.get(`/requests/rejected`)
			.then(({ data }) => {
				setRecords(data.requests);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getRejectedRequests();

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
					List of All Rejected
				</Typography>

				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								{rejectedRequest.map((req, index) => (
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
										<TableCell>{record?.reason}</TableCell>
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

export default Rejected;
