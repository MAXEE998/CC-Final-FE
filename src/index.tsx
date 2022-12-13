import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import { useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import getTheme from './theme';

const container = document.getElementById('app')!;
const root = ReactDOMClient.createRoot(container);

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

root.render(<AppContainer/>);
