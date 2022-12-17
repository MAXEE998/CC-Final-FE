import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import dayjs, { Dayjs } from 'dayjs';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BaseContainer from '../../components/BaseContainer';
import AppContext from '../../api/AppContext';
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material';

interface Props {
  isPatient: boolean
}

export default function SignUp(props: Props) {
  const { isPatient } = props;

  const [dob, setDob] = React.useState<Dayjs | null>(null);

  const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '';
  const ctx = React.useContext(AppContext);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    for (let k of data.keys()) {
      console.log(k);
      console.log(data.get(k))
    }
    //
    // ctx.setBackDropStatus?.(true);
    // const success = () => {
    //   ctx.openSnackBar?.(`Success, please use your username and password to login!`, "success");
    //   ctx.navigate?.(`/signin${redirectTo ? `?redirect=${redirectTo}` : ''}`);
    // }
    // try {
    //   success();
    // } catch(err) {
    //   // TODO: backend fallback
    //   if (`${err}`.includes('Unrecognizable lambda output')) {
    //     success();
    //   } else {
    //     ctx.openSnackBar?.(`Error: ${err}`, "error");
    //   }
    // }
    // ctx.setBackDropStatus?.(false);
  };

  return (
    <BaseContainer>
      <Container component="main" maxWidth="xs"  sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: -8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {`${isPatient ? "Patient" : "Doctor"} sign up`}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  autoComplete="first name"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="last name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phonenumber"
                  label="Phone Number"
                  name="phonenumber"
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={dob}
                    onChange={(newValue) => {
                      setDob(newValue);
                    }}
                    renderInput={(params) =>
                      <TextField {...params}
                                 required
                                 fullWidth
                                 id='dob'
                                 autoComplete="date"
                                 name='dob'
                                 type='date'
                      />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <FormControl required fullWidth id={"gender"}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    id="gender"
                    label="Gender"
                    name="gender"
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={`signin${redirectTo ? `?redirect=${redirectTo}` : ''}`} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </BaseContainer>
  );
}
