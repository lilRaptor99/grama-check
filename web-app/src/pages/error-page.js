import { useRouteError } from "react-router-dom";
import { Container, Row } from 'react-bootstrap';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

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
                    <i>{error.statusText || error.message}</i>
                </p>
            </Row>
        </Container>
    );
}

export default ErrorPage;