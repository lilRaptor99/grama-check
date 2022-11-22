import React, { useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../assets/images/logo.png";
import "../assets/styles/index.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Header = () => {
  const { state, signIn, signOut } = useAuthContext();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  const handlLogout = () => {
    signOut();
    localStorage.removeItem("token");
    setToken(null);
  };

  const handleLogin = () => {
    signIn();
  };

  return (
    
    <Container fluid className="mb-1 head-body">
      <Row>
        <Col sm={3}>
          <img src={Logo} style={{ width: 140 }} />
        </Col>
        <Col sm={6} className="d-flex align-items-center">
          <Row>
            <div>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ minWidth: 210 }}>Apply for Certificate</Typography>
                <Typography sx={{ minWidth: 100 }}>Check Status</Typography>
                <Typography sx={{ minWidth: 100 }}>Help</Typography>
              </Box>
            </div>
          </Row>
        </Col>
        <Col sm={3} className="head-login">
          <Row className="head-login-btn">
            {token || state?.isAuthenticated ? (
              <Button
                variant="outlined"
                size="small"
                sx={{ width: 100 }}
                onClick={handlLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                sx={{ width: 100 }}
                onClick={handleLogin}
              >
                Login
              </Button>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
