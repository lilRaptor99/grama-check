import { useAuthContext } from "@asgardeo/auth-react";
import { Container, Row } from 'react-bootstrap';
import Button from '@mui/material/Button';

const Header = () => {
    const { state, signOut, signIn } = useAuthContext();

    return (
        <Container fluid>
            <Row>
                <h1 className="text-center">Grama check!</h1>
                {
                    state.isAuthenticated ?
                        <Button variant="outlined" size="small" sx={{ width: 100, }} onClick={() => signOut()}>Logout</Button> 
                        : <Button variant="contained" size="small" sx={{ width: 100, }} onClick={() => signIn()}>Login</Button>
                }
            </Row>

        </Container>
    );
}

export default Header;