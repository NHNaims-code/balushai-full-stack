import { ThemeProvider } from '@mui/material';
import { theme } from 'config/MuiTheme';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios'
import { vendor } from 'constants'
axios.defaults.headers.common['Authorization'] = vendor || ""

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);