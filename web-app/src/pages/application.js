import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container, Grid } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

export default function Application() {
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     });
  //   };

  return (
    <body>
      <Container maxWidth="xs" className="page-body mt-3">
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <TextField label="First Name" />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField label="Last Name" />
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
            <text>Please upload proof for address</text>
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
      </Container>
    </body>
  );
}
