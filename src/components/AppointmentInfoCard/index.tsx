import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LinkIcon from '@mui/icons-material/Link';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';

interface Props {
  doctorName: string;
  time: Date;
  mainComplaint: string;
  zoomLink: string;
  collapsable: boolean;
}

export default function DoctorTimeSlot(props: Props) {

  const {doctorName, time, mainComplaint, zoomLink, collapsable} = props;
  const [open, setOpen] = useState(!collapsable);

  return (
    <>
      <Card
        sx={{
          minWidth: 300,
          border: '1px solid rgba(211,211,211,0.6)',
          marginTop: 1,
          width: '90%',
          borderRadius: '16px'
        }}>
        <CardHeader
          title={`Appointment with ${doctorName}`}
          titleTypographyProps={{
            component: 'h2',
            fontSize:"14px",
          }}
          action={
            <IconButton
              onClick={() => setOpen(!open)}
              aria-label="expand"
              size="small"
            >
              {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </IconButton>
          }
        >
        </CardHeader>
        <div style={{backgroundColor: 'rgba(211,211,211,0.27)'}}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <CardContent sx={{typography: {fontSize: 12}, padding: 0}}>
              <Container>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <CalendarMonthIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={time.toLocaleDateString()} secondary="Date"/>
                  </ListItem>
                  <Divider variant="inset" component="li"/>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <AccessTimeIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={time.toLocaleTimeString()} secondary="Time"/>
                  </ListItem>
                  <Divider variant="inset" component="li"/>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <LinkIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<a href={zoomLink}>Click here</a>} secondary="Zoom Link"/>
                  </ListItem>
                  <Divider variant="inset" component="li"/>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <MedicalInformationIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={mainComplaint} secondary="Main Complaint"/>
                  </ListItem>
                  <Divider variant="inset" component="li"/>
                </List>
              </Container>
            </CardContent>
          </Collapse>
        </div>
      </Card>
    </>
  );
}
