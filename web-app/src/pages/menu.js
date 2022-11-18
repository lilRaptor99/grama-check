import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import { useAuthContext } from "@asgardeo/auth-react";

const Menu = () => {
  const { state, getIDToken } = useAuthContext();

  useEffect(() => {
    if (!state?.isAuthenticated) {
      return;
    }
    console.log(state);

    getIDToken().then((idToken) => {
      localStorage.setItem('token', JSON.stringify(idToken));
    }).catch((error) => {
      console.log(error);
    })
  }, [state.isAuthenticated]);

  return (
    <Container>
      <Row className='text-center mb-4'>
        <h2>Menu</h2>
      </Row>
      <Row>
        <h5 className='text-center mb-5'>Select the desired service</h5>
      </Row>
      <Col className="w-25 mx-auto">
        <Row className='mt-3'>
          <Button variant="contained">Apply for Grama Check</Button>
        </Row>
        <Row className='mt-4'>
          <Button variant="outlined">Help</Button>
        </Row>
      </Col>

    </Container>
  );
};

export default Menu;