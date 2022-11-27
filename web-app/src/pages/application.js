import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container, Grid } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import Axios from 'axios';

export default function Application() {
  const [imageSelected, setImageSelected] = useState();
  const [imageName, setImageName] = useState('Please upload proof for address');

  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'h3puqjru');

    Axios.post(
      'https://api.cloudinary.com/v1_1/dfgk4vgol/image/upload',
      formData
    ).then((response) => {
      console.log(response);
    });
  };

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
            <text>{imageName}</text>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
              style={{ float: 'right' }}
            >
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(event) => {
                  setImageSelected(event.target.files[0]);
                  setImageName(event.target.files[0].name);
                }}
              />
            </Button>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={uploadImage}
        >
          submit
        </Button>
      </Container>
    </body>
  );
}
