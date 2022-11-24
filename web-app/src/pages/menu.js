import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import Button from '@mui/material/Button';

const Menu = () => {
  return (
    <Container>
      <Row className="text-center mb-4">
        <h2>Menu</h2>
      </Row>
      <Row>
        <h5 className="text-center mb-5">Select the desired service</h5>
      </Row>
      <Col className="w-25 mx-auto">
        <Row className="mt-3">
          <Button variant="contained">Apply for Grama Check</Button>
        </Row>
        <Row className="mt-4">
          <Button variant="outlined">Help</Button>
        </Row>
      </Col>
    </Container>
  );
};

export default Menu;
