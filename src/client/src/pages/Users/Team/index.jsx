import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import CustomButton from '../../../components/common/CustomButton';
import PopupDialog from '../../../components/common/PopupDialog';
import TeamForm from '../../../components/TeamForm';
import TeamTable from '../../../components/TeamTable';
import { AuthContext } from '../../../context/AuthContext';
import { FetchContext } from '../../../context/FetchContext';

const TabPanel = ({ children, value, index }) => {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
		>
			{value === index && <Box pt={1}>{children}</Box>}
		</div>
	);
};

const Team = () => {
	const [value, setValue] = useState(0);
	const [requestType, setRequestType] = useState('data');
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);
	const [records, setRecords] = useState({});
	const [openPopup, setOpenPopup] = useState(false);

	const handleClose = () => {
		setOpenPopup(false);
	};

	const getTeam = async (type) => {
		try {
			const { data } = await fetchContext.authAxios.get(`/teams/${type}`);
			setRecords(data[0]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (event, newValue) => {
		const types = ['data', 'software', 'hardware', 'network', 'others'];
		setValue(newValue);
		setRequestType(types[newValue]);
		getTeam(types[newValue]);
	};

	useEffect(() => {
		getTeam(requestType);
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
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: 'column',
					gap: 2,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'baseline',
					}}
				>
					<Typography variant="h6" component="h2">
						List of All Team
					</Typography>
				</Box>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
					>
						<Tab label="Data" />
						<Tab label="Software" />
						<Tab label="Hardware" />
						<Tab label="Network" />
						<Tab label="Others" />
					</Tabs>
				</Box>
				<Box>
					<TabPanel value={value} index={0}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<CustomButton
								color="primary"
								onClick={() => {
									setOpenPopup(true);
								}}
							>
								Add New Members for {requestType} Team
							</CustomButton>
						</Box>
						<Box sx={{ marginTop: 2 }}>
							<TeamTable type={requestType} records={records} setRecords={setRecords}  />
						</Box>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<CustomButton
								color="primary"
								onClick={() => {
									setOpenPopup(true);
								}}
							>
								Add New Members for {requestType} Team
							</CustomButton>
						</Box>
						<Box sx={{ marginTop: 2 }}>
							<TeamTable type={requestType} records={records} setRecords={setRecords} />
						</Box>
					</TabPanel>
					<TabPanel value={value} index={2}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<CustomButton
								color="primary"
								onClick={() => {
									setOpenPopup(true);
								}}
							>
								Add New Members for {requestType} Team
							</CustomButton>
						</Box>
						<Box sx={{ marginTop: 2 }}>
							<TeamTable type={requestType} records={records} setRecords={setRecords} />
						</Box>
					</TabPanel>
					<TabPanel value={value} index={3}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<CustomButton
								color="primary"
								onClick={() => {
									setOpenPopup(true);
								}}
							>
								Add New Members for {requestType} Team
							</CustomButton>
						</Box>
						<Box sx={{ marginTop: 2 }}>
							<TeamTable type={requestType} records={records} setRecords={setRecords} />
						</Box>
					</TabPanel>
					<TabPanel value={value} index={4}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<CustomButton
								color="primary"
								onClick={() => {
									setOpenPopup(true);
								}}
							>
								Add New Members for {requestType} Team
							</CustomButton>
						</Box>
						<Box sx={{ marginTop: 2 }}>
							<TeamTable type={requestType} records={records} setRecords={setRecords} />
						</Box>
					</TabPanel>
				</Box>
			</Box>
			<PopupDialog
				title="Choose a new member"
				openPopup={openPopup}
				handleClose={handleClose}
			>
				<TeamForm type={requestType} team={records} handleClose={handleClose} />
			</PopupDialog>
		</>
	);
};

export default Team;
