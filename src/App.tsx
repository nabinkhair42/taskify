import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { CssBaseline, Container } from '@mui/material';
import { theme } from './theme';
import { store } from './store';
import { Home } from './pages/Home';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Home />
          </Container>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 