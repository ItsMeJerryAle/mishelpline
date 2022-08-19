import Routes from './routes';
import { AuthProvider } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';
import customTheme from './constants/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

const App = () => {
	return (
		<ThemeProvider theme={customTheme}>
			<AuthProvider>
				<FetchProvider>
					<Routes />
					<CssBaseline />
				</FetchProvider>
			</AuthProvider>
		</ThemeProvider>
	);
};

export default App;
