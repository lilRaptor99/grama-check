import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import HomeImg from '../assets/images/Home.png';

const Home = () => {
  return (
    <Container fluid className={'no-gutters mx-0 px-0'}>
      <Row noGutters={true} className="pt-10">
        <Col xs={8} md={5}>
          <Row className="justify-content-center mt-5">
            <img style={{ width: 300, height: 300 }} src={HomeImg} alt="" />
          </Row>
        </Col>
        <Col xs={10} md={7} className="hero">
          <Row className="mb-1" style={{ color: '#1E88E5' }}>
            <h2>Welcome to the Admin Portal!</h2>
          </Row>

          <Row className="mb-4">
            <p>
              Apply for a police clearance certificate online and stay <br />
              update on the progress
            </p>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
