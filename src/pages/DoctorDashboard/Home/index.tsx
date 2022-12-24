import { Box, Typography } from '@mui/material';
import * as React from 'react';

import Title from '../../../components/Title';
import { DoctorAppointmentInfoCard } from '../../../components/DoctorAppointmentInfoCard';

interface Props {
    name: string
    appointments: any[]
    updateHandler: any
}

export default function Home(props: Props) {
    const { name, appointments, updateHandler } = props

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
            { appointments.filter(each => each.appointmentStatus === "confirmed").map(each => (
                <DoctorAppointmentInfoCard
                    id={each.AppointmentNumber}
                    patientName={each.patient_email.split("@")[0]}
                    time={new Date(each.time)}
                    mainComplaint="Flu"
                    zoomLink={each.link}
                    collapsable={false}
                    vaccinationStatus="Flu and Covid-19 series"
                    symptoms="cough"
                    symptomsLasted="3 days"
                    insurance="covered"
                    relevantDocuments={each["relevant_docs"]}
                    summary={each.details}
                    status={each["appointmentStatus"]}
                    updateHandler={updateHandler}
                />
            )) }
        </Box>
    </>);
}
