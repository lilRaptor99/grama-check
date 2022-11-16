import { useAuthContext } from "@asgardeo/auth-react";
import { Container, Row } from 'react-bootstrap';
import Button from '@mui/material/Button';

const Header = () => {
    const { signOut, signIn , isAuthenticated } = useAuthContext();
    let isAuth = false;

    isAuthenticated().then((result) => {
        isAuth = result;
    }).catch((error) => {
        console.log(error);
    })

    return (
        <Container fluid className="my-3">
            <Row className="justify-content-end">
                {
                    isAuth ?
                        <Button variant="outlined" size="small" sx={{ width: 100, }} onClick={() => signOut()}>Logout</Button> 
                        : <Button variant="contained" size="small" sx={{ width: 100, }} onClick={() => signIn()}>Login</Button>
                }
            </Row>

        </Container>
    );
}

export default Header;