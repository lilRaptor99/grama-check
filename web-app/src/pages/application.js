import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container, Grid, Box } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { submitApplication } from '../services/application.js';

export default function Application() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      fname: formData.get('fname'),
      lname: formData.get('lname'),
      nic: formData.get('nic'),
      address: formData.get('address'),
    };
    const response = await submitApplication(data);
  };

  return (
    <body>
      <Container maxWidth="xs" className="page-body mt-3">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <TextField label="First Name" name="fname" />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField label="Last Name" name="lname" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nic"
                label="NIC number"
                name="nic"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="address"
                label="Home Address"
                id="address"
                multiline={true}
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <p>Please upload proof for address</p>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
                style={{ float: 'right' }}
              >
                Upload
                <input hidden accept="image/*" multiple type="file" />
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            submit
          </Button>
        </Box>
      </Container>
    </body>
  );
}
