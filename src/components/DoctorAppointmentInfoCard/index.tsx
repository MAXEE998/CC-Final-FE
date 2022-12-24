import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LinkIcon from '@mui/icons-material/Link';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, ListItemButton, ListItemIcon, Box, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ArticleIcon from '@mui/icons-material/Article';
import React, { useState } from 'react';
import {isValidDate} from "../../api/utils";

enum AppointmentStatus {
  Pending,
  Confirmed,
  Finished,
  Declined,
}

interface Props {
  id: string;
  patientName: string;
  time: Date;
  mainComplaint: string;
  zoomLink: string;
  collapsable: boolean;
  vaccinationStatus: string;
  symptoms: string;
  symptomsLasted: string;
  insurance: string;
  relevantDocuments: string[];
  summary: string;
  status: string;
  updateHandler: any;
}

export default function DoctorAppointmentInfoCard(props: Props) {

  const strToStatus = (str: string) => {
    if (str === 'pending') {
      return AppointmentStatus.Pending
    }

    if (str === 'confirmed') {
      return AppointmentStatus.Confirmed
    }

    if (str === 'declined') {
      return AppointmentStatus.Declined
    }

    return AppointmentStatus.Finished
  }
  const statusToColor = (s:AppointmentStatus) => {
    switch (s) {
      case AppointmentStatus.Confirmed:
        return 'rgba(17,121,12,0.78)'
      case AppointmentStatus.Pending:
        return 'rgba(255,255,0,0.5)'
      case AppointmentStatus.Declined:
        return 'rgb(117,6,6)'
      case AppointmentStatus.Finished:
        return 'rgba(119,119,180,0.99)'
    }
  }

  let {
    patientName, time, mainComplaint,
    zoomLink, collapsable,
    vaccinationStatus, insurance, relevantDocuments, summary,
    symptoms, symptomsLasted, status, updateHandler, id
   } = props;

  if (!isValidDate(time)) {
    time = new Date(2023, 2, 12, 12);
  }

  const [open, setOpen] = useState(!collapsable);
  const [fileOpen, setFileOpen] = useState(true);

  const buttons = () => {
    console.log(status)
    const statusEnum = strToStatus(status)
    if (statusEnum == AppointmentStatus.Pending) {
      return (
        <Box sx={{ display:'flex', justifyContent:'center' }}>
          <Button color='success' onClick={() => {updateHandler(id, "confirmed")}}>
            Accept
          </Button>
          <Button color='error' onClick={() => {updateHandler(id, "declined")}} >
            Decline
          </Button>
        </Box>
      )
    }

    if (statusEnum == AppointmentStatus.Confirmed) {
      return (
        <Box sx={{ display:'flex', justifyContent:'center' }}>
          <Button color='primary' onClick={() => {updateHandler(id, "finished")}} >
            Finish
          </Button>
        </Box>
      )
    }

    return null
  }


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
          title={`Appointment with ${patientName}`}
          titleTypographyProps={{
            component: 'h2',
            fontSize:"14px",
          }}
          sx={{
            backgroundColor: statusToColor((strToStatus(status)))
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
        <div style={{backgroundColor: 'rgba(140,96,122,0.78)'}}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <CardContent sx={{typography: {fontSize: 12}, mr: 2, mt: 0}}>
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
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <VaccinesIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={vaccinationStatus} secondary="Vaccination Status"/>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ReceiptLongIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={insurance} secondary="Insurance"/>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <CoronavirusIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={symptoms} secondary="Symptoms"/>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <HourglassBottomIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={symptomsLasted} secondary="Symptoms Lasted"/>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <SummarizeIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={summary}/>
                </ListItem>
                <Divider variant="inset" component="li"/>
                  <ListItemButton onClick={() => {setFileOpen(!fileOpen)}}>
                    <ListItemAvatar>
                      <Avatar>
                        <InboxIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Relevant Documents" />
                    {fileOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                <Collapse in={fileOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ pl: 4 }}>
                      {!relevantDocuments? null : relevantDocuments.map((doc) => (
                        <>
                          <ListItem sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <ArticleIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={<a href={`https://files-telemedicine.s3.amazonaws.com/${doc}`}>{doc}</a> }
                            />
                          </ListItem>
                          <Divider variant="middle" component="li"/>
                        </>
                        ))}
                    </List>
                  </Collapse>
              </List>

              {buttons()}
            </CardContent>
          </Collapse>
        </div>
      </Card>
    </>
  );
}

export { AppointmentStatus, DoctorAppointmentInfoCard }
