import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from 'react';
import * as React from 'react';
import BaseContainer from '../../components/BaseContainer';
import DoctorTimeSlot from '../../components/DoctorTimeSlot';
import AppContext from '../../api/AppContext';
import {getDoctors, updateAppointment} from "../../api/apiGateway";
import {AxiosResponse} from "axios";
import {getRandomArbitrary} from "../../api/utils";

export default function ChooseDoctor() {

  const ctx = React.useContext(AppContext);
  const [timeSlotChosen, setTimeSlotChosen] = useState<[string, Date]>(["", new Date()]);
  const [doctors, setDoctors] = useState<any[]>([])

  const processDoctor = (raws: { map: () => any; }) => {
    // @ts-ignore
    return raws.map((doc) => {
      const randDate = getRandomArbitrary(1,28)
      return {
      doctorName : doc.fname + ' ' + doc.lname,
      doctorID: doc.DoctorID,
      timeSlots: [new Date(2023, 1, randDate, 12), new Date(2023, 1, randDate+1, 12)],
    }})
  }

  useEffect(() => {
    ctx.setBackDropStatus?.(true);
    getDoctors().then((resp: AxiosResponse) => {
      const data = resp.data
      console.log(data)
      setDoctors(processDoctor(data))
      ctx.setBackDropStatus?.(false);
    })
  }, [])
  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    ctx.setBackDropStatus?.(true);
    console.log(timeSlotChosen)
    const form = {
      AppointmentNumber: sessionStorage.getItem("AppointmentNumber"),
      "doctor_email": timeSlotChosen[0],
      time: timeSlotChosen[1],
    }
    try {
      const resp = await updateAppointment(form);
      ctx.setBackDropStatus?.(false);
      ctx.navigate?.('/patient/chatbot');
    } catch (err) {
      ctx.openSnackBar?.(`Error: ${err}`, "error");
      ctx.setBackDropStatus?.(false);
    }
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
          <Typography component="h1" variant="h6" fontSize="16px" sx={{ p:1, width: "100%"}}>
            Choose your appointment:
          </Typography>
          <Box
            sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {doctors.map((doc) => (
              <DoctorTimeSlot {...doc} setTimeSlotChosen={setTimeSlotChosen} timeSlotChosen={timeSlotChosen} />
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
