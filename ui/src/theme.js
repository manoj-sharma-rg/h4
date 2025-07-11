import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#ff4081', // Pink
    },
    background: {
      default: '#f5f7fa',
      paper: '#fff',
    },
  },
  components: {
    MuiStepper: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #1976d2 0%, #ff4081 100%)',
          borderRadius: 12,
          padding: '16px 0',
        },
      },
    },
  },
});

export default theme; 