import React, { useState } from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Logo from '../assets/images/logo.png';
import '../assets/styles/index.scss';

const Header = () => {
  const { state, signIn, signOut } = useAuthContext();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  const handlLogout = () => {
    signOut();
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleLogin = () => {
    signIn();
  };

  return (
    <Container fluid className="mb-3">
      <Row>
        <Col sm={3}>
          <img src={Logo} alt="logo" style={{ width: 200 }} />
        </Col>
        <Col sm={9} className="head-login">
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
