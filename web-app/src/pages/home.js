import { Container, Row, Col } from 'react-bootstrap';
import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import Button from '@mui/material/Button';

const Home = () => {
    const { signIn } = useAuthContext();
    const handleLogin = () => {
        signIn();
    }

    return (
        <Container>
            <Row className='text-center mb-4'>
                <h2>Welcome to Grama Check!</h2>
            </Row>
            <Row className="w-50 mx-auto">
                <Row className="w-50 mx-auto justify-content-center">
                    <Button variant="contained" size="small" sx={{ width: 100, }} onClick={handleLogin}>Login</Button>
                </Row>
            </Row>
        </Container>
    );
};

export default Home;