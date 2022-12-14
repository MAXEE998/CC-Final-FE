import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';

import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import { getDoctorProfile } from '../../../api/apiGateway';
import AppContext from '../../../api/AppContext';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';

export default function Profile() {
    const ctx = React.useContext(AppContext);

    const location = useLocation();
    const navigate = useNavigate ();
    const userStr = localStorage.getItem("tmd-user");
    const user = !!userStr ? JSON.parse(userStr) : null;
    const userEmail = user.email;
    const isProfileAvailable = !!user.dob;

    const [name, setName] = useState(isProfileAvailable ? user.fname + ' ' + user.lname: "");
    const [gender, setGender] = useState(isProfileAvailable ? user.gender: "");
    const [email, setEmail] = useState(userEmail);
    const [phone, setPhone] = useState(isProfileAvailable ? user.phonenumber: "");
    const [dob, setDOB] = useState(isProfileAvailable ? user.dob: "");

    useEffect( () => {
        if (!user.dob) {
            ctx.setBackDropStatus?.(true);
            getDoctorProfile(email).then(
              (response: AxiosResponse) => {
                  console.log(response.data)
                  const data = response.data
                  user.dob = data.dob
                  user.gender = data.gender
                  user.phonenumber = data.phonenumber
                  user.lname = data.lname
                  user.fname = data.fname
                  localStorage.setItem("tmd-user", JSON.stringify(user));
                  setName(data.fname + ' ' + data.lname);
                  setGender(data.gender);
                  setPhone(data.phonenumber);
                  setDOB(data.dob);
                  ctx.setBackDropStatus?.(false);
              })
        }
    }, [])

    return (<>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            {
                !userEmail
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
                userEmail
                ?
                <Button
                    sx={{ width: '86%', marginTop: 5 }}
                    size="large" variant="contained" color="error"
                    onClick={() => {ctx.logout?.(true, false)}}
                >
                Log Me Out
                </Button>
                : null
            }
        </Box>
    </>);
}
