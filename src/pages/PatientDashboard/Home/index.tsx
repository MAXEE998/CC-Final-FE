import { Box, Container, Typography } from '@mui/material';
import * as React from 'react';

import Title from '../../../components/Title';
import AppContext from '../../../api/AppContext';
import AppointmentInfoCard from '../../../components/AppointmentInfoCard';


export default function Home() {
    const ctx = React.useContext(AppContext);

    return (<>
        <Title>Hi Testuser, welcome to TeleMD!</Title>
        <Box paddingX={3}>
                <Container sx={{m:2, alignItems: 'center'}}>
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
                </Container>

        </Box>
    </>);
}
