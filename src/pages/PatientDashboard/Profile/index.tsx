import * as React from 'react';

import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import AppContext from '../../../api/AppContext';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

export default function Profile() {
    const ctx = React.useContext(AppContext);

    const location = useLocation();
    const navigate = useNavigate ();
    const profileUserName = 'fw2210';

    const [name, setName] = React.useState('Florence Welch');
    const [gender, setGender] = React.useState('female');
    const [email, setEmail] = React.useState('fw@gmail.com');
    const [phone, setPhone] = React.useState('9175551511');
    const [rating, setRating] = React.useState(5);
    const [dob, setDOB] = React.useState('1998-08-08'); 

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
                <Divider sx={{ marginY: 3}} />
                <h3 style={{ margin: 0, marginBottom: 12 }}>Your medical files:</h3>
                <List>
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
                            primary={<a href="https://s3.console.aws.amazon.com/s3/object/files-telemedicine?region=us-east-1&prefix=HW2-Fall2022.pdf">HW2-Fall2022.pdf</a> }
                            secondary="2022-12-19 14:30"
                        />
                    </ListItem>
                </List>
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