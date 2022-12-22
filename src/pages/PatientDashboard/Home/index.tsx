import { Box, Container, Typography } from '@mui/material';
import * as React from 'react';

import Title from '../../../components/Title';
import AppContext from '../../../api/AppContext';
import AppointmentInfoCard from '../../../components/AppointmentInfoCard';

interface Props {
    name: string
}

export default function Home(props: Props) {
    const { name } = props
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
            <AppointmentInfoCard
                doctorName={"Jane Master"}
                time={new Date()}
                mainComplaint="Cold"
                zoomLink="https://nyu.zoom.us/u/aBZ7UmW70"
                collapsable={false}
            />
        </Box>
    </>);
}
