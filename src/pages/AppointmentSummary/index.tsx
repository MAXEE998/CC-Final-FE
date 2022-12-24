import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import BaseContainer from '../../components/BaseContainer';
import AppointmentInfoCard from '../../components/AppointmentInfoCard';
import AppContext from '../../api/AppContext';
import {getAppointment} from "../../api/apiGateway";
import {AxiosResponse} from "axios";

export default function AppointmentSummary() {
  const ctx = React.useContext(AppContext);
    const [appointment, setAppointment] = React.useState({
        doctor_email: "",
        meet_time: new Date(),
        link: "google.com",
    });

    React.useEffect(() => {
        ctx.setBackDropStatus?.(true);
      getAppointment(sessionStorage.getItem("AppointmentNumber")).then(
          (resp: AxiosResponse) => {
              console.log(resp.data);
              setAppointment(resp.data);
              ctx.setBackDropStatus?.(false);
          })
  }, [])
  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    sessionStorage.removeItem("AppointmentNumber")
    ctx.navigate?.(`/patient/dashboard`);
  };

  // @ts-ignore
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
              doctorName={appointment?.doctor_email.split("@")[0]}
              time={new Date(appointment?.meet_time)}
              mainComplaint="Flu"
              zoomLink={appointment?.link}
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
