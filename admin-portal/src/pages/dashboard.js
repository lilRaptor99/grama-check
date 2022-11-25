import { Container, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { handleTokenExchange } from '../services/auth';
import { useAuthContext } from '@asgardeo/auth-react';

const Dashboard = () => {
  const { state, getIDToken } = useAuthContext();

  useEffect(() => {
    if (!state?.isAuthenticated) {
      return;
    }

    getIDToken()
      .then((idToken) => {
        console.log(idToken);
        handleTokenExchange(idToken);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getIDToken, state, state?.isAuthenticated]);

  return (
    <Container>
      <Row>
        <h5 className="text-center my-5">Welcome to the dashboard</h5>
      </Row>
    </Container>
  );
};

export default Dashboard;
