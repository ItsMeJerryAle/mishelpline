import {
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useEffect, useState } from 'react';
import { team } from '../constants/table-headers';
import { FetchContext } from '../context/FetchContext';
import CustomButton from './common/CustomButton';
import { SnackbarSuccess } from './SnackBars';
import { AuthContext } from '../context/AuthContext';

const TeamTable = ({ type, records, setRecords }) => {
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [successMessage, setSuccessMessage] = useState();

	const deleteUser = async (id) => {
		try {
			setLoading(true);
			const { data } = await fetchContext.authAxios.patch(
				`/teams/${id}/${type}`
			);
			setSuccessMessage(data?.message);
			setSuccess(true);
			setLoading(false);
			fetchContext.setRefreshKey(fetchContext.refreshKey + 1);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const teamsChannel = authContext.pusher.subscribe('team');

		teamsChannel.bind('created', (newTeams) => {
			setRecords((records) => [...records, newTeams]);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		teamsChannel.bind('updated', (updatedTeam) => {
			setRecords(
				records?.map((team) =>
					team._id === updatedTeam._id ? { ...records, updatedTeam } : team
				)
			);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		teamsChannel.bind('deleted-team', (deletedTeam) => {
			setRecords(
				records?.filter((team, index) => team._id !== deletedTeam[index]._id)
			);
			fetchContext.setRefreshKey(fetchContext.refreshKey + 1);
		});
		return () => {
			teamsChannel.unbind_all();
			teamsChannel.unsubscribe('team');
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
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{team.map((req, index) => (
								<TableCell key={index}>{req.label}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{records?.members?.map((member, index) => {
							return (
								<TableRow key={index}>
									<TableCell>
										{member.firstName} {member.lastName}
									</TableCell>
									<TableCell>
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
												deleteUser(member?._id);
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
		</>
	);
};

export default TeamTable;
