import { Box, Container, Typography } from '@mui/material';
import * as React from 'react';

import Title from '../../../components/Title';
import AppContext from '../../../api/AppContext';
import { DoctorAppointmentInfoCard, AppointmentStatus } from '../../..//components/DoctorAppointmentInfoCard';

interface Props {
    name: string
}

export default function Home(props: Props) {
    const { name } = props
    const ctx = React.useContext(AppContext);

    return (<>
        <Title>{`Hi Doctor ${name}, welcome to TeleMD!`}</Title>
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
            <DoctorAppointmentInfoCard
                doctorName={"Jane Master"}
                time={new Date()}
                mainComplaint="Cold"
                zoomLink="https://nyu.zoom.us/u/aBZ7UmW70"
                collapsable={false}
                vaccinationStatus="Flu and Covid-19 series"
                symptoms="cough"
                symptomsLasted="3 days"
                insurance="covered"
                relevantDocuments={["A", "B", "C"]}
                status={AppointmentStatus.Confirmed}
            />
        </Box>
    </>);
}
