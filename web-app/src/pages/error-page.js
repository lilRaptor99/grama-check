import { useLocation } from "react-router-dom";
import { Container, Row } from 'react-bootstrap';

const ErrorPage = () => {
    let location = useLocation();

    return (
        <Container id="error-page" className="text-center mt-4">
            <Row className="">
                <h1>Oops!</h1>
            </Row>
            <Row className="">
                <p>Sorry, an unexpected error has occurred.</p>
            </Row>
            <Row>
                <p>
                    No match for <code>{location.pathname}</code>
                </p>
            </Row>
        </Container>
    );
}

export default ErrorPage;