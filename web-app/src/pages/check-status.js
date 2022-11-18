import * as React from "react";
import PendingImg from "../assets/images/Pending.png";
import { Container, Row } from "react-bootstrap";

export default function CheckStatus() {
  return (
    <Container className="check-status">
      <Row>
        <h5 style={{ color: "#42A5F5" }}>Check Status</h5>
      </Row>
      <Row className="justify-content-center">
        <img
          style={{ width: 300, height: 300 }}
          src={PendingImg}
        />
      </Row>
      <Row>
        <h3 className="">The status of your application is </h3>
      </Row>
      <Row>
        <h2 className="text-center">Pending</h2>
      </Row>
    </Container>
  );
}
