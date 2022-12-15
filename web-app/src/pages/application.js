import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container, Grid, Box } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { submitApplication } from '../services/application.js';
import { useAuthContext } from '@asgardeo/auth-react';
import { generateImageLink } from '../services/application';

export default function Application() {
  const [imageSelected, setImageSelected] = useState();
  const [email, setEmail] = useState();
  const [imgUrl, setImgUrl] = useState(null);

  const [imageName, setImageName] = useState('Please upload proof for address');

  const { getDecodedIDToken } = useAuthContext();

  // const uploadImage = async () => {

  //   if (url) {
  //     return true;
  //   }
  //   return false;
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'h3puqjru');

    const url = await generateImageLink(formData);
    setImgUrl(url);

    getDecodedIDToken()
      .then((idToken) => {
        setEmail(idToken.username);
        const data = {
          fname: formData.get('fname'),
          lname: formData.get('lname'),
          nic: formData.get('nic'),
          address: formData.get('address'),
          email: email,
          url: imgUrl,
        };
        submitApplication(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <body>
      <Container maxWidth="xs" className="page-body mt-3">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <TextField required label="First Name" name="fname" />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField required label="Last Name" name="lname" />
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
              <p>{imageName}</p>
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
            //onClick={uploadImage}
          >
            submit
          </Button>
        </Box>
      </Container>
    </body>
  );
}
