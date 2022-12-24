import { Box, Container, Typography } from '@mui/material';
import * as React from 'react';

import Title from '../../../components/Title';
import AppContext from '../../../api/AppContext';
import AppointmentInfoCard from '../../../components/AppointmentInfoCard';

interface Props {
    name: string
    appointments: any[]
}

export default function Home(props: Props) {
    const { name, appointments } = props
    const ctx = React.useContext(AppContext);

    return (<>
        <Title>{`Hi ${name}, welcome to TeleMD!`}</Title>
        <Box sx={{
            m:2,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Typography component="h1" variant="h6" fontSize="16px" sx={{ p:1, width: "100%"}}>
                Upcoming Appointment
            </Typography>
            { appointments.filter(each => each.appointmentStatus === "confirmed").map(each => (
                <AppointmentInfoCard
                    doctorName={!!each.doctor_email?each.doctor_email.split("@")[0]:""}
                    time={new Date(each.meet_time)}
                    mainComplaint="Flu"
                    zoomLink={each.link}
                    collapsable={false}
                />
                ))}
        </Box>
    </>);
}
