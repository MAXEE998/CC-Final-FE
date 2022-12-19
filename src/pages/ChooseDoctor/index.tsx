import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import * as React from 'react';
import BaseContainer from '../../components/BaseContainer';
import DoctorTimeSlot from '../../components/DoctorTimeSlot/index.jsx';

export default function ChooseDoctor() {

  const [timeSlotChosen, setTimeSlotChosen] = useState<[string, Date]>(["", new Date()]);
  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const doctors = [
    {
      doctorName: "Doctor A",
      timeSlots: [new Date(2023, 2, 23), new Date(2023, 2, 24)],
      timeSlotChosen: timeSlotChosen,
      setTimeSlotChosen: setTimeSlotChosen,
    },
    {
      doctorName: "Doctor X",
      timeSlots: [new Date(2023, 2, 23), new Date(2023, 2, 24)],
      timeSlotChosen: timeSlotChosen,
      setTimeSlotChosen: setTimeSlotChosen,
    }
  ]

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
          <Typography component="h1" variant="h5">
            Choose your appointment:
          </Typography>
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {doctors.map((doc) => (
              <DoctorTimeSlot {...doc} />
            ))}
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={!timeSlotChosen[0]}
              sx={{ mt: 3, mb: 2, width:"80%" }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Container>
    </BaseContainer>
  )
}
