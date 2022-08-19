import React from 'react';
import Header from '../../components/Header';
import { Box, Container, Grid, Typography } from '@mui/material';
import ReqCard from '../../components/Home/ReqCard';
import reqCardData from '../../constants/reqCardContent/reqCard-data';
import { Link } from 'react-router-dom';
import CustomButton from '../../components/common/CustomButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Devs from '../../components/Devs';
import Footer from '../../components/Footer';

const Home = () => {
	const theme = useTheme();
	const matchesXs = useMediaQuery(theme.breakpoints.down('sm'));
	return (
		<div>
			<Header />
			<Box
				sx={{
					padding: 3,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<img src="50426.jpg" alt="MIS" width="400" />
				<Typography
					variant={matchesXs ? 'h4' : 'h2'}
					component="h3"
					sx={{
						textTransform: 'uppercase',
						fontWeight: 600,
						color: '#192a56',
					}}
				>
					how may i help you?
				</Typography>
				<Link
					to="/request"
					style={{ color: 'inherit', textDecoration: 'none' }}
				>
					<CustomButton variant="contained">see my requests</CustomButton>
				</Link>
			</Box>
			<Box sx={{ marginTop: 5, marginBottom: 7 }}>
				<Typography
					variant="body1"
					component="p"
					sx={{ marginBottom: 2, textAlign: 'center' }}
				>
					Choose any of the following for your request
				</Typography>
				<Container maxWidth="lg">
					<Grid container direction="row" spacing={2} alignItems="stretch">
						{reqCardData.map((reqData, index) => (
							<Grid key={index} item xs={12} sm={6} md={4} lg>
								<ReqCard
									title={reqData?.title}
									icon={reqData?.icon}
									content={reqData?.content}
									url={reqData?.url}
								/>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>
			<Box mt={30}>
				<Container>
					<Devs />
				</Container>
			</Box>
			<Footer />
		</div>
	);
};

export default Home;
