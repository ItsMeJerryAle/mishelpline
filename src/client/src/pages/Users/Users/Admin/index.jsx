import {
	Box,
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
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useEffect, useState } from 'react';
import CustomButton from '../../../../components/common/CustomButton';
import { SnackbarSuccess } from '../../../../components/SnackBars';
import { user } from '../../../../constants/table-headers';
import { AuthContext } from '../../../../context/AuthContext';
import { FetchContext } from '../../../../context/FetchContext';

const Admin = () => {
	const fetchContext = useContext(FetchContext);
	const [success, setSuccess] = useState(false);
	const [successMessage, setSuccessMessage] = useState();
	const [loading, setLoading] = useState(false);
	const authContext = useContext(AuthContext);
	const [records, setRecords] = useState([]);

	const getUsers = () => {
		fetchContext.authAxios
			.get(`/users/admins`)
			.then(({ data }) => {
				setRecords(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteUser = async (id) => {
		try {
			setLoading(true);
			await fetchContext.authAxios.delete(`/users/${id}`);
			setSuccessMessage('User Deleted');
			setSuccess(true);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUsers();
		const usersChannel = authContext.pusher.subscribe('users');

		usersChannel.bind('created', (newUsers) => {
			setRecords((records) => [...records, newUsers]);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		usersChannel.bind('updated', (updatedUser) => {
			setRecords(
				records.map((user) =>
					user._id === updatedUser._id ? { ...records, updatedUser } : user
				)
			);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		usersChannel.bind('deleted-user', (deletedUser) => {
			setRecords(
				records.filter((user, index) => user._id !== deletedUser[index]._id)
			);
			fetchContext.setRefreshKey(fetchContext.refreshKey + 1);
		});
		// return () => {
		// 	second;
		// };
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
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: 'column',
					gap: 2,
				}}
			>
				<Typography variant="h6" component="h2">
					List of All Admin
				</Typography>

				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								{user.map((req, index) => (
									<TableCell key={index}>{req.label}</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{records?.map((record, index) => {
								return (
									<TableRow key={index}>
										<TableCell>{record?.role}</TableCell>
										<TableCell>{`${record?.firstName} ${record?.lastName}`}</TableCell>
										<TableCell>{record?.email}</TableCell>
										<TableCell>{` +63${String(record?.contact)}`}</TableCell>
										<TableCell sx={{ display: 'flex', gap: 2 }}>
											<CustomButton
												color="error"
												disabled={loading === true}
												startIcon={
													loading === true ? (
														<CircularProgress size={20} color="primary" />
													) : (
														<DeleteIcon />
													)
												}
												onClick={() => {
													// console.log(record?._id);
													deleteUser(record?._id);
												}}
											>
												Delete
											</CustomButton>
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

export default Admin;
