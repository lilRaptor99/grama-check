import { Container, Row, Col } from 'react-bootstrap';
import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import Button from '@mui/material/Button';
// import FilledButton from '../components/button';
// import { handleLogin } from '../services/auth';

const Login = () => {
    const { state, signIn, signOut } = useAuthContext();
    const handleLogin = () => {
        signIn();
    }

    return (
        <Container>
            <Row>
                <h5 className='text-center my-5'>You need to Login in first</h5>
            </Row>
            <Row className="w-50 mx-auto justify-content-center">
                <Button variant="contained" size="small" sx={{ width: 100, }} onClick={handleLogin}>Login</Button>
            </Row>
        </Container>
    );
};

export default Login;