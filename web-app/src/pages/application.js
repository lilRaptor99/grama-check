import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UploadIcon from '@mui/icons-material/Upload';

const theme = createTheme();

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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            //onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <h5 style={{color: "#1783ad"}}>Apply for Grama Check</h5>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nic"
              label="NIC number"
              name="nic"
              autoFocus
            />
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
            <text>Please upload proof for address</text>
            <Button variant="outlined" component="label" startIcon={<UploadIcon />} style={{float: 'right'}}>
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
