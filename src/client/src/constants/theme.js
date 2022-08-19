import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
	palette: {
		type: 'light',
		primary: {
			main: '#192a56',
			contrastText: 'rgba(255,255,255,0.87)',
		},
		secondary: {
			main: '#e35300',
			contrastText: 'rgba(255,255,255,0.87)',
		},
		background: {
			default: '#f6f6f8',
			paper: '#fff',
		},
	},
});

export default customTheme;
