import { Box, Container, Paper } from '@mui/material';
import * as React from 'react';

import Title from '../../../components/Title';
import AppContext from '../../../api/AppContext';
import AppointmentInfoCard from '../../../components/AppointmentInfoCard';


export default function Appointments() {
    const ctx = React.useContext(AppContext);

    return (<>
        <Title>Your Appointments </Title>
        <Box paddingX={3}>
                <Container sx={{m:2, alignItems: 'center'}}>
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
