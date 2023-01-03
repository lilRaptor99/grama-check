import * as React from 'react';
import PendingImg from '../assets/images/Pending.png';
import { Container, Row } from 'react-bootstrap';

const CheckStatus = () => {
  return (
    <Container className="check-status mt-3">
      <Row className="justify-content-center">
        <img style={{ width: 300, height: 300 }} src={PendingImg} alt="" />
      </Row>
      <Row>
        <h3 className="">The status of your application is </h3>
      </Row>
      <Row>
        <h2 style={{ color: '#1E88E5' }} className="text-center">
          Pending
        </h2>
      </Row>
    </Container>
  );
};

export default CheckStatus;
