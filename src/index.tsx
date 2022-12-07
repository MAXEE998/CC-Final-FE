import React from 'react';
import ReactDOM from 'react-dom';

import { useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import getTheme from './theme';

const AppContainer = () => {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () => getTheme(prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline/>
        <App/>
      </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.render(<AppContainer/>, document.getElementById('app'));
