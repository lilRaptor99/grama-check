import { Container, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import Button from '@mui/material/Button';

const Home = () => {
  const { signIn, signOut, state } = useAuthContext();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  const handleLogin = () => {
    signIn();
  };

  const handlLogout = () => {
    signOut();
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Container>
      <Row className="text-center mb-4">
        <h2>Welcome to Grama Check!</h2>
      </Row>
      <Row className="w-50 mx-auto">
        <Row className="w-50 mx-auto justify-content-center">
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
      </Row>
    </Container>
  );
};

export default Home;
