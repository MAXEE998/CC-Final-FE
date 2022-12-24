import { Box } from '@mui/material';
import * as React from 'react';
import { DoctorAppointmentInfoCard } from '../../../components/DoctorAppointmentInfoCard';

import Title from '../../../components/Title';

interface Props {
    appointments: any[]
    updateHandler: any
}

export default function Appointments(props: Props) {
    const {appointments, updateHandler} = props

    return (<>
        <Title>Your Appointments </Title>
        <Box sx={{
            m: 2,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {appointments.filter(each => each.appointmentStatus !== 'declined').map(each => (
              <DoctorAppointmentInfoCard
                id={each.AppointmentNumber}
                patientName={each.patient_email.split('@')[0]}
                time={new Date(each.meet_time)}
                mainComplaint="Flu"
                zoomLink={each.link}
                collapsable={true}
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
