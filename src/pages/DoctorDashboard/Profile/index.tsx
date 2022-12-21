import * as React from 'react';

import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import AppContext from '../../../api/AppContext';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';

export default function Profile() {
    const ctx = React.useContext(AppContext);

    const location = useLocation();
    const navigate = useNavigate ();
    const profileUserName = 'fw2210';

    const [name, setName] = React.useState('Meredith Grey');
    const [gender, setGender] = React.useState('female');
    const [email, setEmail] = React.useState('mg@gmail.com');
    const [phone, setPhone] = React.useState('9175551511');
    const [dob, setDOB] = React.useState('1978-08-08'); 

    return (<>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            {
                !profileUserName
                ? null
                : <Box sx={{ width: 40, height: 40, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', left: 20, top: 20 }} onClick={() => navigate(-1)}><ArrowBack /></Box>
            }
            <Avatar sx={{ width: 120, height: 120, fontSize: 40, fontWeight: 700, marginTop: 10 }} >{(name || ' ')[0].toLocaleUpperCase()}</Avatar>
            <h1>{name || 'N/A'}</h1>
            <Paper elevation={1} sx={{ width: '86%', padding: 3, borderRadius: '16px' }}>
                <h3 style={{ margin: 0, marginBottom: 12 }}>User Information</h3>
                <Box>Name: <span style={{float: 'right'}}>{name || 'N/A'}</span></Box>
                <Box>Gender: <span style={{float: 'right'}}>{gender || 'N/A'}</span></Box>
                <Box>Email: <span style={{float: 'right'}}>{email || 'N/A'}</span></Box>
                <Box>Phone: <span style={{float: 'right'}}>{phone || 'N/A'}</span></Box>
                <Box>Date of Birth: <span style={{float: 'right'}}>{dob || 'N/A'}</span></Box>
            </Paper>

            {
                profileUserName
                ? 
                <Button 
                    sx={{ width: '86%', marginTop: 5 }} 
                    size="large" variant="contained" color="error" 
                    onClick={() => {ctx.logout?.()}} 
                >
                Log Me Out
                </Button>
                : null
            }
        </Box>
    </>);
}