import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createAppointment, putFile } from '../../api/apiGateway';
import AppContext from '../../api/AppContext';
import { toBase64 } from '../../api/utils';
import BaseContainer from '../../components/BaseContainer';
import FileUpload from '../../components/FileUpload';

export default function CreateAppointment() {

  const [files, setFiles] = React.useState<File[]>([]);

  const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '';
  const ctx = React.useContext(AppContext);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ctx.setBackDropStatus?.(true);;
      const data = new FormData(event.currentTarget);

      // file upload
      for (let each of files) {
        let fileData = await toBase64(each)
        let resp = await putFile(each, fileData, ctx.user.email);
        console.log(resp.status)
      }
      setFiles([]);
      // create appointment
      const form = {
        AppointmentNumber: uuidv4(),
        patient_email: ctx.user.email,
        link: "https://nyu.zoom.us/j/7281807429?pwd=NTR4TXpXYXJ6K3ozeHNoLzljZitrUT09",
        details: data.get("note")
      }
      try {
        let resp = await createAppointment(form);
        sessionStorage.setItem("AppointmentNumber", form.AppointmentNumber);
        if (resp.status == 200) {
          ctx.setBackDropStatus?.(false);
          ctx.navigate?.('/patient/chooseDoctor')
        } else {
          ctx.setBackDropStatus?.(false);
          ctx.openSnackBar?.("Error: something went wrong...", "error")
        }
      } catch(err) {
        ctx.openSnackBar?.(`Error: ${err}`, "error")
    }
    ctx.setBackDropStatus?.(false);
  };

  return (
    <BaseContainer>
      <Container component="main" maxWidth="xs"   sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        width: "90%",
      }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: -8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h6" fontSize="16px" sx={{ p:1, width: "100%"}}>
            Select your main reason for seeking care today and add any additional notes
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl required fullWidth id={"mc"}>
                  <InputLabel>Main Complaint</InputLabel>
                  <Select
                    id="mc"
                    label="Main Complaint"
                    name="mc"
                  >
                    <MenuItem value={"flu"}>Flu</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="note"
                  label="Note"
                  name="note"
                  placeholder="Your enter your any additional information here..."
                  multiline
                  rows={4}
                  maxRows={8}
                />
              </Grid>
              <Grid item xs={12}>
                <FileUpload value={files} onChange={setFiles} />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Continue
            </Button>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
      </Container>
    </BaseContainer>
  );
}
