import { Box, Container, Paper } from '@mui/material';
import * as React from 'react';

import Title from '../../../components/Title';
import AppContext from '../../../api/AppContext';
import AppointmentInfoCard from '../../../components/AppointmentInfoCard';

interface Props {
    appointments: any[]
}

export default function Appointments(props: Props) {
    const { appointments } = props
    console.log(typeof appointments)
    const ctx = React.useContext(AppContext);

    return (<>
        <Title> Your Appointments </Title>
        <Box sx={{
            m:2,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
        }}>
            { appointments.map(each => (
                <AppointmentInfoCard
                    doctorName={!!each.doctor_email?each.doctor_email.split("@")[0]:""}
                    time={new Date(each.meet_time)}
                    mainComplaint="Flu"
                    zoomLink={each.link}
                    collapsable={false}
                />
            ))
            }
        </Box>
    </>);
}
