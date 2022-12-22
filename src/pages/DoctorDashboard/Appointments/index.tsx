import { Box, Container, Paper } from '@mui/material';
import * as React from 'react';

import Title from '../../../components/Title';
import AppContext from '../../../api/AppContext';
import { DoctorAppointmentInfoCard, AppointmentStatus } from '../../../components/DoctorAppointmentInfoCard';


export default function Appointments() {
    const ctx = React.useContext(AppContext);

    return (<>
        <Title>Your Appointments </Title>
        <Box sx={{
            m:2, 
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
        }}>
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
                summary={"onetuhonetuhnoetuh"}
                status={AppointmentStatus.Pending}
            />
        </Box>
    </>);
}
