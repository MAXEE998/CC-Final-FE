import * as React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import BaseContainer from '../../components/BaseContainer';
import { Stack } from '@mui/material';

interface Props {
  isPatient: boolean,
}

export default function Landing(props: Props) {

  const {isPatient} = props;

  return (
  <BaseContainer style={{display: 'flex', alignItems: 'center'}}>
    <div style={{flex: 1}}>
      <Box component="span" sx={{display: 'flex', p: 2, width: '100%', justifyContent: 'center'}}>
        <Typography component="div" align='center'>
          <Box sx={{fontSize: 'h3.fontSize', m: 1, fontFamily: 'Ubuntu'}}>TeleMD</Box>
          <Box sx={{fontSize: 'h5.fontSize', m: 1, fontFamily: 'Ubuntu'}}>
            For {isPatient ? 'Patient' : 'Doctor'}
          </Box>
        </Typography>
      </Box>

      <Box component="span" sx={{display: 'flex', p: 2, marginTop: 25, width: '100%', justifyContent: 'center'}}>
        <Stack
          sx={{pt: 4}}
          direction="column"
          spacing={4}
          justifyContent="flex-end"
        >
          <Button variant="contained" sx={{padding: '11px 49px'}} component={Link} to={`/${isPatient ? 'patient' : 'doctor'}/signin`}>
            Sign In
          </Button>
          <Button sx={{border: '2px dashed', borderColor: theme => theme.palette.primary.main, padding: '10px 48px'}}
                  component={Link} to={`/${isPatient ? 'patient' : 'doctor'}/signup`}>
            Sign Up
          </Button>
        </Stack>
      </Box>
    </div>
  </BaseContainer>);
}
