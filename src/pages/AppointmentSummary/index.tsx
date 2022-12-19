import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import BaseContainer from '../../components/BaseContainer';
import AppointmentInfoCard from '../../components/AppointmentInfoCard';

export default function AppointmentSummary() {

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <BaseContainer
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
          <Typography component="h1" fontSize="16x" sx={{ p:1, width: "100%"}}>
            Appointment Summary:
          </Typography>
          <Box
            sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <AppointmentInfoCard
              doctorName={"Jane Master"}
              time={new Date()}
              mainComplaint="Cold"
              zoomLink="https://nyu.zoom.us/u/aBZ7UmW70"
              collapsable={false}
            />
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ mt: 3, mb: 2, width:"80%" }}
            >
              Home
            </Button>
          </Box>
        </Box>
      </Container>
    </BaseContainer>
  )
}
