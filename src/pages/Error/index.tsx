import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import AppContext from '../../api/AppContext';

export default function Error() {
  const ctx = React.useContext(AppContext);

  const goHomeHandler = () => {
    ctx.navigate?.("/");
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" onClick={goHomeHandler}>Back Home</Button>
    </Box>
  );
}
