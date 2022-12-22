import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { putFile } from '../../api/apiGateway';
import { toBase64 } from '../../api/utils';
import BaseContainer from '../../components/BaseContainer';
import AppContext from '../../api/AppContext';
import { InputLabel, Select, MenuItem, FormControl, Button, makeStyles } from '@mui/material';
import FileUpload from '../../components/FileUpload';


export default function CreateAppointment() {

  const [files, setFiles] = React.useState<File[]>([]);

  const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '';
  const ctx = React.useContext(AppContext);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    for (let k of data.keys()) {
      console.log(k);
      console.log(data.get(k))
    }
    for (let each of files) {
      let fileData = await toBase64(each)
      await putFile(each, fileData, ctx.user.email);
    }
    //ctx.navigate?.('/patient/chooseDoctor')
    //
    // ctx.setBackDropStatus?.(true);
    // const success = () => {
    //   ctx.openSnackBar?.(`Success, please use your username and password to login!`, "success");
    //   ctx.navigate?.(`/signin${redirectTo ? `?redirect=${redirectTo}` : ''}`);
    // }
    // try {
    //   success();
    // } catch(err) {
    //   // TODO: backend fallback
    //   if (`${err}`.includes('Unrecognizable lambda output')) {
    //     success();
    //   } else {
    //     ctx.openSnackBar?.(`Error: ${err}`, "error");
    //   }
    // }
    // ctx.setBackDropStatus?.(false);
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
