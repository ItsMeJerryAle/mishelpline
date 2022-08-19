import { Box, Grid, Paper, Typography } from '@mui/material';
import {
	blue,
	red,
	teal,
	purple,
	pink,
	green,
	deepPurple,
	cyan,
	lightGreen,
} from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Chart from 'react-apexcharts';
import { useContext, useEffect, useState } from 'react';
import { FetchContext } from '../../context/FetchContext';
import DisplayCountPaper from '../../components/common/DisplayCountPaper';
import Footer from '../../components/Footer';
import Devs from '../../components/Devs';

const pendingColor = blue[900];
const dataColor = teal[600];
const softwareColor = red[700];
const hardwareColor = purple[900];
const networkColor = pink[400];
const otherColor = deepPurple[700];
const requestColor = cyan[700];
const approveColor = lightGreen[700];
const completeColor = green[700];
const rejectColor = red[900];

const Dashboard = () => {
	const fetchContext = useContext(FetchContext);
	const [reqCount, setReqCount] = useState(0);
	const [approveReqCount, setApproveReqCount] = useState(0);
	const [completeReqCount, setCompleteReqCount] = useState(0);
	const [rejectedReqCount, setRejectedReqCount] = useState(0);
	const [pendingReqCount, setPendingReqCount] = useState(0);
	const [dataCount, setDataCount] = useState(0);
	const [softwareCount, setSoftwareCount] = useState(0);
	const [hardwareCount, setHardwareCount] = useState(0);
	const [networkCount, setNetworkCount] = useState(0);
	const [otherCount, setOtherCount] = useState(0);

	let chart = {
		series: [
			{
				data: [
					dataCount,
					softwareCount,
					hardwareCount,
					networkCount,
					otherCount,
				],
			},
		],
		options: {
			title: {
				style: {
					color: '#ffffff',
				},
			},
			chart: {
				type: 'line',
			},
			plotOptions: {
				bar: {
					borderRadius: 4,
					columnWidth: '20%',
				},
			},
			dataLabels: {
				enabled: true,
			},
			xaxis: {
				categories: [
					'Data Request',
					'Software Request',
					'Hardware Request',
					'Network Request',
					'Other Request',
				],
			},
		},
	};

	const getApproveReqCount = () => {
		fetchContext.authAxios
			.get(`/requests/count/approve`)
			.then(({ data }) => {
				setApproveReqCount(data.requests);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getReqCount = () => {
		fetchContext.authAxios
			.get(`/requests/count`)
			.then(({ data }) => {
				setReqCount(data.requests);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getCompleteReqCount = () => {
		fetchContext.authAxios
			.get(`/requests/count/complete`)
			.then(({ data }) => {
				setCompleteReqCount(data.requests);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getRejectedReqCount = () => {
		fetchContext.authAxios
			.get(`/requests/count/rejected`)
			.then(({ data }) => {
				setRejectedReqCount(data.requests);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getPendingReqCount = () => {
		fetchContext.authAxios
			.get(`/requests/count/pending`)
			.then(({ data }) => {
				setPendingReqCount(data.requests);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getDataReqCount = () => {
		fetchContext.authAxios
			.get(`/requests/count/data`)
			.then(({ data }) => {
				setDataCount(data.requests);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getSoftwareReqCount = () => {
		fetchContext.authAxios
			.get(`/requests/count/software`)
			.then(({ data }) => {
				setSoftwareCount(data.requests);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getHardwareReqCount = () => {
		fetchContext.authAxios
			.get(`/requests/count/hardware`)
			.then(({ data }) => {
				setHardwareCount(data.requests);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getNetworkReqCount = () => {
		fetchContext.authAxios
			.get(`/requests/count/network`)
			.then(({ data }) => {
				setNetworkCount(data.requests);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getOtherReqCount = () => {
		fetchContext.authAxios
			.get(`/requests/count/other`)
			.then(({ data }) => {
				setOtherCount(data.requests);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getReqCount();
		getApproveReqCount();
		getCompleteReqCount();
		getRejectedReqCount();
		getPendingReqCount();
		getDataReqCount();
		getSoftwareReqCount();
		getHardwareReqCount();
		getNetworkReqCount();
		getOtherReqCount();
	}, [fetchContext.refreshKey]);

	return (
		<div>
			<Box>
				<Typography variant="h6">Pending Requests</Typography>
				<Box mt={2}>
					<Grid container direction="row" alignItems="stretch" spacing={2}>
						<Grid item xs={12} sm={12} md={12} lg={4}>
							<DisplayCountPaper
								pending="true"
								title="Pending Requests"
								count={pendingReqCount}
								icon={
									<PendingActionsIcon
										sx={{
											position: 'absolute',
											top: 0,
											right: -40,
											opacity: 0.12,
											width: 190,
											height: 190,
										}}
									/>
								}
								bgColor={pendingColor}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={8}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={12} md={4}>
									<DisplayCountPaper
										title="Data Requests"
										count={dataCount}
										icon={
											<PendingActionsIcon
												sx={{
													position: 'absolute',
													top: 0,
													right: -24,
													opacity: 0.12,
													width: 120,
													height: 120,
												}}
											/>
										}
										bgColor={dataColor}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={4}>
									<DisplayCountPaper
										title="Software Requests"
										count={softwareCount}
										icon={
											<PendingActionsIcon
												sx={{
													position: 'absolute',
													top: 0,
													right: -24,
													opacity: 0.12,
													width: 120,
													height: 120,
												}}
											/>
										}
										bgColor={softwareColor}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={4}>
									<DisplayCountPaper
										title="Hardware Requests"
										count={hardwareCount}
										icon={
											<PendingActionsIcon
												sx={{
													position: 'absolute',
													top: 0,
													right: -24,
													opacity: 0.12,
													width: 120,
													height: 120,
												}}
											/>
										}
										bgColor={hardwareColor}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={4}>
									<DisplayCountPaper
										title="Network Requests"
										count={networkCount}
										icon={
											<PendingActionsIcon
												sx={{
													position: 'absolute',
													top: 0,
													right: -24,
													opacity: 0.12,
													width: 120,
													height: 120,
												}}
											/>
										}
										bgColor={networkColor}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={4}>
									<DisplayCountPaper
										title="Other Requests"
										count={otherCount}
										icon={
											<PendingActionsIcon
												sx={{
													position: 'absolute',
													top: 0,
													right: -24,
													opacity: 0.12,
													width: 120,
													height: 120,
												}}
											/>
										}
										bgColor={otherColor}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
				<Box mt={7}>
					<Typography variant="h6">Requests</Typography>
					<Box mt={2}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm>
								<DisplayCountPaper
									title="All Requests"
									count={reqCount}
									icon={
										<AssignmentIcon
											sx={{
												position: 'absolute',
												top: 0,
												right: -24,
												opacity: 0.12,
												width: 120,
												height: 120,
											}}
										/>
									}
									bgColor={requestColor}
								/>
							</Grid>
							<Grid item xs={12} sm>
								<DisplayCountPaper
									title="Approved Requests"
									count={approveReqCount}
									icon={
										<FactCheckIcon
											sx={{
												position: 'absolute',
												top: 0,
												right: -24,
												opacity: 0.12,
												width: 120,
												height: 120,
											}}
										/>
									}
									bgColor={approveColor}
								/>
							</Grid>
							<Grid item xs={12} sm>
								<DisplayCountPaper
									title="Completed Requests"
									count={completeReqCount}
									icon={
										<AssignmentTurnedInIcon
											sx={{
												position: 'absolute',
												top: 0,
												right: -24,
												opacity: 0.12,
												width: 120,
												height: 120,
											}}
										/>
									}
									bgColor={completeColor}
								/>
							</Grid>
							<Grid item xs={12} sm>
								<DisplayCountPaper
									title="Rejected Requests"
									count={rejectedReqCount}
									icon={
										<AssignmentLateIcon
											sx={{
												position: 'absolute',
												top: 0,
												right: -24,
												opacity: 0.12,
												width: 120,
												height: 120,
											}}
										/>
									}
									bgColor={rejectColor}
								/>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Box mt={7} mb={10}>
					<Typography variant="h6" component="h4">
						Request Turnout
					</Typography>
					<Paper elevation={8}>
						<Box mt={3} p={3}>
							<Chart
								options={chart.options}
								series={chart.series}
								type="bar"
								height={350}
							/>
						</Box>
					</Paper>
				</Box>
				<Box mt={7}>
					<Devs />
				</Box>
			</Box>
			<Footer />
		</div>
	);
};

export default Dashboard;
