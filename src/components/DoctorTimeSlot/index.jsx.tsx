import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { List, ListItem, ListItemButton, ListItemText, Radio } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import React, { Dispatch, SetStateAction, useState } from 'react';


interface Props {
  doctorName: string;
  timeSlots: Date[];
  timeSlotChosen: [string, Date];
  setTimeSlotChosen: Dispatch<SetStateAction<[string, Date]>>
}

export default function DoctorTimeSlot(props: Props) {
  const [open, setOpen] = useState(false);
  const {doctorName, timeSlots, timeSlotChosen, setTimeSlotChosen} = props;

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
          title={doctorName}
          titleTypographyProps={{
            component: 'h2',
            fontSize: '14px',
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
        <div style={{backgroundColor: 'rgba(211,211,211,0.1)'}}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <CardContent sx={{typography: {fontSize: 12}, padding: 0}}>
              <Container>
                <List>
                  {timeSlots.map((timeSlot) => (
                    <>
                      <ListItem divider disablePadding sx={{m: 1}}>
                          <Radio
                            checked={doctorName === timeSlotChosen[0] && timeSlot.getTime() == timeSlotChosen[1].getTime()}
                            onChange={() =>
                              setTimeSlotChosen([doctorName, timeSlot])
                            }
                            value={timeSlot}
                            name="radio-buttons"
                            inputProps={{'aria-label': timeSlot.toString()}}
                          />
                        <ListItemText primary={timeSlot.toLocaleDateString() + ' ' + timeSlot.toLocaleTimeString()} />
                      </ListItem>
                    </>
                  ))}
                </List>
              </Container>
            </CardContent>
          </Collapse>
        </div>
      </Card>
    </>
  );
}
