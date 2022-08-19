import { Box, Typography } from '@mui/material';
import React from 'react';
import AvatarPerson from './common/AvatarPerson';

const Devs = () => {
	return (
		<>
			<Typography variant="h5" sx={{ textAlign: 'center' }}>
				Development Team
			</Typography>
			<Box mt={5}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 1,
					}}
				>
					<AvatarPerson pic="/jerry2.jpg" alt="Jerry Ale" />
					<Box sx={{ textAlign: 'center' }}>
						<Typography variant="h6" component="span" display="block">
							Jerry Ale
						</Typography>
						<Typography variant="caption" component="span">
							Dev Adviser
						</Typography>
					</Box>
				</Box>
			</Box>
			<Box mt={7} sx={{ textAlign: 'center' }}>
				<Typography
					variant="body1"
					component="span"
					sx={{ fontWeight: 'bold' }}
				>
					Developers
				</Typography>
			</Box>
			<Box
				mt={5}
				sx={{
					display: 'flex',
					gap: 10,
					flexWrap: 'wrap',
					justifyContent: 'center',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 1.5,
					}}
				>
					<AvatarPerson pic="/buico.jpg" alt="Junaire Edris Buico" />
					<Box sx={{ textAlign: 'center' }}>
						<Typography variant="subtitle2" component="span" display="block">
							Junaire Edris Buico
						</Typography>
						<Typography variant="caption" component="span" gutterBottom>
							Lead Programmer
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 1.5,
					}}
				>
					<AvatarPerson pic="/asufra.jpg" alt="Fermo Jr Asufra" />

					<Box sx={{ textAlign: 'center' }}>
						<Typography variant="subtitle2" component="span" display="block">
							Fermo Jr Asufra
						</Typography>
						<Typography variant="caption" component="span" gutterBottom>
							Head Graphic Designer
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 1.5,
					}}
				>
					<AvatarPerson pic="/malinao.jpg" alt="Neil Abbie Malinao" />

					<Box sx={{ textAlign: 'center' }}>
						<Typography variant="subtitle2" component="span" display="block">
							Neil Abbie Malinao
						</Typography>
						<Typography variant="caption" component="span" gutterBottom>
							Graphic Designer
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 1.5,
					}}
				>
					<AvatarPerson pic="/lamoste.jpg" alt="Jay Nino Lamoste" />
					<Box sx={{ textAlign: 'center' }}>
						<Typography variant="subtitle2" component="span" display="block">
							Jay Nino Lamoste
						</Typography>
						<Typography variant="caption" component="span" gutterBottom>
							Graphic Designer
						</Typography>
					</Box>
				</Box>

				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 1.5,
					}}
				>
					<AvatarPerson pic="/pequit.jpg" alt="Joseph Pequit" />
					<Box sx={{ textAlign: 'center', width: 160 }}>
						<Typography variant="subtitle2" component="span" display="block">
							Joseph Pequit
						</Typography>
						<Typography variant="caption" component="span" gutterBottom>
							Hardware and Maintenance Personel
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 1.5,
					}}
				>
					<AvatarPerson pic="/legaspi.jpg" alt="Dennis Legaspi" />
					<Box sx={{ textAlign: 'center' }}>
						<Typography variant="subtitle2" component="span" display="block">
							Dennis Legaspi
						</Typography>
						<Typography variant="caption" component="span" gutterBottom>
							Graphic Designer
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 1.5,
					}}
				>
					<AvatarPerson pic="/cepe.jpg" alt="Jhun Jerum Cepe" />
					<Box sx={{ textAlign: 'center', width: 120 }}>
						<Typography variant="subtitle2" component="span" display="block">
							Jhun Jerum Cepe
						</Typography>
						<Typography variant="caption" component="span" gutterBottom>
							Motion Graphics Designer
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 1.5,
					}}
				>
					<AvatarPerson pic="/edem.jpg" alt="Enrie John Edem" />
					<Box sx={{ textAlign: 'center', width: 160 }}>
						<Typography variant="subtitle2" component="span" display="block">
							Enrie John Edem
						</Typography>
						<Typography variant="caption" component="span" gutterBottom>
							Hardware and Maintenance Head
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 1.5,
					}}
				>
					<AvatarPerson pic="/ibarra.jpg" alt="Jhon Kevin Ibarra" />
					<Box sx={{ textAlign: 'center', width: 120 }}>
						<Typography variant="subtitle2" component="span" display="block">
							Jhon Kevin Ibarra
						</Typography>
						<Typography variant="caption" component="span" gutterBottom>
							Motion and Graphics Designer
						</Typography>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Devs;
