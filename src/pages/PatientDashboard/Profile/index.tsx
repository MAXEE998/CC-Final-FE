import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';

import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import { getPatientProfile } from '../../../api/apiGateway';
import AppContext from '../../../api/AppContext';

import { ArrowBack } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

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
    const [docs, setDocs] = useState<string[]>(isProfileAvailable ? user.docs: []);

    useEffect( () => {
        if (!user.dob) {
            ctx.setBackDropStatus?.(true);
            getPatientProfile(email).then(
              (response: AxiosResponse) => {
                console.log(response.data)
                const data = response.data
                user.dob = data.dob
                user.gender = data.gender
                user.phonenumber = data.phonenumber
                user.lname = data.lname
                user.fname = data.fname
                user.docs = !!data?.docs ? data.docs : []
                localStorage.setItem("tmd-user", JSON.stringify(user));
                setName(data.fname + ' ' + data.lname);
                setGender(data.gender);
                setPhone(data.phonenumber);
                setDOB(data.dob);
                setDocs(user.docs);
                ctx.setBackDropStatus?.(false);
              })
        }
      }, [])

    const handleRefresh = async () => {
      ctx.setBackDropStatus?.(true);
      getPatientProfile(email).then(
        (response: AxiosResponse) => {
          console.log(response.data)
          const data = response.data
          user.dob = data.dob
          user.gender = data.gender
          user.phonenumber = data.phonenumber
          user.lname = data.lname
          user.fname = data.fname
          user.docs = !!data?.docs ? data.docs : []
          localStorage.setItem("tmd-user", JSON.stringify(user));
          setName(data.fname + ' ' + data.lname);
          setGender(data.gender);
          setPhone(data.phonenumber);
          setDOB(data.dob);
          setDocs(user.docs);
          ctx.setBackDropStatus?.(false);
        })
    }


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
            {
              !userEmail
                ? null
                : <Box sx={{ width: 40, height: 40, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', right: 20, top: 20 }} onClick={handleRefresh}><RefreshIcon /></Box>
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
                <Divider sx={{ marginY: 3}} />
                <h3 style={{ margin: 0, marginBottom: 12 }}>Your medical files:</h3>
                <List>
                  { docs.map(doc => ( !doc ? null :
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <InsertDriveFileOutlinedIcon/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<a href={`https://files-telemedicine.s3.amazonaws.com/${doc}`}>{doc}</a> }
                      />
                    </ListItem>
                  ))}
                </List>
            </Paper>

            {
                userEmail
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
