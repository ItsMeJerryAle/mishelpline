import {
	Box,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Typography,
} from '@mui/material';
import { useState } from 'react';

import Forms from './Form';

const Signup = () => {
	const [selectedRole, setSelectedRole] = useState('student');

	return (
		<>
			<Container component="main" maxWidth="lg">
				<Box
					sx={{
						marginTop: selectedRole === 'faculty' ? 5 : 10,
						marginBottom: 5,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Paper sx={{ padding: 3 }} elevation={8}>
						<Typography component="h2" variant="h5" sx={{ marginBottom: 5 }}>
							Registor to MIS HelpDesk
						</Typography>
						<FormControl fullWidth>
							<InputLabel id="user type">User Type</InputLabel>
							<Select
								labelId="user type"
								id="userType"
								label="User Type"
								name="userType"
								onChange={(e) => setSelectedRole(e.target.value)}
								value={selectedRole}
							>
								<MenuItem value="staff">Staff</MenuItem>
								<MenuItem value="faculty">Faculty</MenuItem>
								<MenuItem value="student">Student</MenuItem>
							</Select>
						</FormControl>
						<Forms userType={selectedRole} />
					</Paper>
				</Box>
			</Container>
		</>
	);
};

export default Signup;
