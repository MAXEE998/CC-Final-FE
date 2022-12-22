import { Box, Container, Paper } from '@mui/material';
import * as React from 'react';

import Title from '../../../components/Title';
import AppContext from '../../../api/AppContext';
import { DoctorAppointmentInfoCard, AppointmentStatus } from '../../../components/DoctorAppointmentInfoCard';

interface Props {
    appointments: any[]
}

export default function Appointments(props: Props) {
    const { appointments } = props

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
            { appointments.map(each => (
                <DoctorAppointmentInfoCard
                    patientName={each.patient_email.split("@")[0]}
                    time={new Date(each.time)}
                    mainComplaint="Flu"
                    zoomLink={each.link}
                    collapsable={true}
                    vaccinationStatus="Flu and Covid-19 series"
                    symptoms="cough"
                    symptomsLasted="3 days"
                    insurance="covered"
                    relevantDocuments={each["relevant_docs"]}
                    summary={each.details}
                    status={each.appointmentStatus}
                />
            )) }
        </Box>
    </>);
}
