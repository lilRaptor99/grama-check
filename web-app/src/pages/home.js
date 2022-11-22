import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import Button from "@mui/material/Button";
import HomeImg from "../assets/images/Home.png";

const Home = () => {
  const { signIn, signOut, state } = useAuthContext();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  const handleLogin = () => {
    signIn();
  };

  const handlLogout = () => {
    signOut();
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Container fluid className={"no-gutters mx-0 px-0"}>
      <Row noGutters={true} className="pt-10">
      <Col xs={8} md={5}>
          <Row className="justify-content-center mt-5">
            <img style={{ width: 300, height: 300 }} src={HomeImg} />
          </Row>
        </Col>
        <Col xs={10} md={7} className="hero">
          <Row className="mb-1">
            <h2>Welcome to Grama Check!</h2>
          </Row>

          <Row className="mb-3">
            <p>Apply for a police clearance certificate online and stay <br />update on the progress</p>
          </Row>
          
          <Row>
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

export default Home;
