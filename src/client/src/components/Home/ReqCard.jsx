import {
	Avatar,
	Grid,
	IconButton,
	Typography,
	Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CustomPaper from '../common/CustomPaper';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ReqCard = ({ icon, title, content, url }) => {
	return (
		<CustomPaper>
			<Grid
				container
				direction="column"
				spacing={1}
				sx={{ paddingX: 3, paddingY: 4 }}
			>
				<Grid item>
					<Grid
						container
						direction="column"
						alignItems="center"
						justifyContent="center"
					>
						<Grid item>
							<Avatar
								sx={{
									width: 100,
									height: 100,
									backgroundColor: 'transparent',
									border: 1,
									borderColor: '#192a56',
									color: '#192a56',
								}}
							>
								{/* <PersonIcon fontSize="large" /> */}
								{icon}
							</Avatar>
						</Grid>
						<Grid item>
							<Typography
								variant="h6"
								sx={{ textTransform: 'uppercase', marginTop: 2 }}
								component="h6"
							>
								{title}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Box sx={{ marginTop: 1, height: 80, textAlign: 'center' }}>
						{content.map((item, index) => (
							<Typography variant="body1" component="p">
								{item}
							</Typography>
						))}
					</Box>
				</Grid>
				<Grid item>
					<Box sx={{ marginTop: 4 }}>
						<Grid container direction="column" alignItems="center">
							<Grid item>
								<Link
									to={url}
									style={{ color: 'inherit', textDecoration: 'none' }}
								>
									<IconButton>
										<ArrowForwardIosIcon />
									</IconButton>
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</CustomPaper>
	);
};

export default ReqCard;
