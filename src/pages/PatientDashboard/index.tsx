import * as React from 'react';

import { useState, useEffect } from 'react';
import { useNavigate, useLocation, matchRoutes, Route, Routes, Link } from 'react-router-dom';

import Navigator from '../../components/BottomNavigator';
import BaseContainer from '../../components/BaseContainer';

import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Home from './Home'
import Appointments from './Appointments';
import Profile from './Profile';

export default function PatientDashboard() {
    const [tag, setTag] = useState('home');
    const navigate = useNavigate();
    const location = useLocation();

    const matches = matchRoutes([{ path: '/patient/dashboard/:tag' }], location);
    const urlTag = matches?.[0].params.tag || 'home';
    const withInDashboardPage = urlTag && 'home/appointments'.includes(urlTag);

    useEffect(() => {
        if (urlTag !== tag) {
            setTag(urlTag);
        }
    }, [urlTag]);

    const changeHandler = (newTag: string) => {
        setTag(newTag);
        navigate(`/patient/dashboard/${newTag}`);
    }

    return (<>
        <BaseContainer style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{
                flex: '1',
                overflow: 'auto',

            }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
            <Navigator currentActive={tag} changeHandler={changeHandler} />
        </BaseContainer>
        {
            withInDashboardPage ?
                (<Box sx={{ position: 'fixed', right: 30, bottom: 80, zIndex: 2 }}>
                    <Fab color="primary" aria-label="create group" component={Link} to="/patient/createAppointment">
                        <AddIcon />
                    </Fab>
                </Box>) : null
        }
    </>)
}
