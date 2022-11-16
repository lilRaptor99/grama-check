import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

const Home = () => {
    return (
        <Container>
            <Row className='text-center mb-4'>
                <h2>Welcome to Grama Check!</h2>
            </Row>
            <Row>
                <h5 className='text-center mb-5'>Select your role</h5>
            </Row>
            <Row className="w-50 mx-auto">
                <Col>
                    <Link to="/menu" className='user-card mx-auto'>
                        <BadgeOutlinedIcon className='icon' color="action" sx={{ fontSize: 100 }} />
                    </Link>
                    <p className='text-center mt-3'>Applicant</p>
                </Col>
                <Col>
                    <Link to="/menu" className='user-card mx-auto'>
                        <ManageAccountsOutlinedIcon className='icon' color="action" sx={{ fontSize: 100 }} />
                    </Link>
                    <p className='text-center mt-3'>Grama Sevaka</p>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;