import React, { useEffect } from 'react';

import { Alert, AlertColor, Backdrop, CircularProgress, Snackbar } from '@mui/material';
import { Routes, useLocation, useNavigate } from 'react-router-dom';

import AppContext from './api/AppContext';
import { assign, call } from './api/utils';
import routes from './routes';


const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [backDropStatus, setBackDropStatus] = React.useState<boolean>(false);

  const [snackBarStatus, setSnackBarStatus] = React.useState<boolean>(false);
  const [snackBarSeverity, setSnackBarSeverity] = React.useState<AlertColor>('success');
  const [snackBarMessage, setSnackBarMessage] = React.useState<string>('');

  const userStr = localStorage.getItem("tmd-user");
  const user = !!userStr ? JSON.parse(userStr) : null;

  useEffect(() => { // access control
    const unauthPath = [
      '/', '/doctor', '/patient',
      '/patient/signin', '/patient/signup',
      '/doctor/signin', '/doctor/signup',
    ]


    const path = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname
    if (!userStr && !unauthPath.includes(path)) {
      navigate(`/`);
      return ;
    }

    if (!!userStr) {
      if (unauthPath.includes(path) || path.split('/')[1] !== user.role) {
        navigate(`/${user.role}/dashboard`);
        return;
      }
    }
  }, [location.pathname]);

  const handleSnackBarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarStatus(false);
  }

  const helpers = {
    setBackDropStatus,
    openSnackBar: (message: string, severity: AlertColor = 'success') => {
      setSnackBarSeverity(severity);
      setSnackBarMessage(message);
      setSnackBarStatus(true);
    },
    logout: async (showMessage = false, isPatient = true) => {
      try {
        localStorage.removeItem("tmd-user");
        navigate(`/${isPatient ? '' : 'doctor'}`);
        if (showMessage) {
          call('openSnackBar', 'Success, you are logged out!');
        }
      } catch (err) {
        console.error(`Sign out error: ${err}`)
      }
    },
    navigate: (path: string) => {
      navigate(path);
    },
    user: user
  };

  assign('helpers', helpers);

  return (
    <AppContext.Provider value={helpers}>
        <Routes>
          {routes.map(r => r)}
        </Routes>

        <Backdrop
          sx={{color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1}}
          open={backDropStatus}
        >
          <CircularProgress color="inherit"/>
        </Backdrop>

        <Snackbar open={snackBarStatus} autoHideDuration={6000} onClose={handleSnackBarClose}>
          <Alert onClose={handleSnackBarClose} severity={snackBarSeverity} sx={{ width: '100%' }}>
            {snackBarMessage}
          </Alert>
        </Snackbar>
    </AppContext.Provider>
  );
}

export default App;
