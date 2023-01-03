import { useState, useEffect } from 'react';
import PendingImg from '../assets/images/Pending.png';
import { Container, Row } from 'react-bootstrap';
import { useAuthContext } from '@asgardeo/auth-react';
import { getApplicationStatus } from '../services/application';

export default function CheckStatus() {
  const [email, setEmail] = useState();
  const [status, setStatus] = useState('');

  const { getDecodedIDToken } = useAuthContext();

  useEffect(() => {
    fetchApplicationStatus();
  });

  const fetchApplicationStatus = async () => {
    getDecodedIDToken()
      .then((idToken) => {
        setEmail(idToken.username);
      })
      .catch((error) => {
        console.log(error);
      });

    const data = await getApplicationStatus(email);
    if (
      data.id_check_status === 'REJECTED' ||
      data.police_check_status === 'REJECTED'
    ) {
      setStatus('REJECTED');
    } else if (
      data.id_check_status === 'APPROVED' ||
      data.police_check_status === 'REJECTED'
    ) {
      setStatus('REJECTED');
    } else if (
      (data.id_check_status === 'APPROVED' ||
        data.police_check_status === 'APPROVED') &&
      data.address_check_status === 'PENDING'
    ) {
      setStatus('PENDING');
    } else if (
      (data.id_check_status === 'APPROVED' ||
        data.police_check_status === 'APPROVED') &&
      data.address_check_status === 'APPROVED'
    ) {
      setStatus('APPROVED');
    }
  };

  return (
    <Container className="check-status mt-3">
      <Row className="justify-content-center">
        <img style={{ width: 300, height: 300 }} src={PendingImg} alt="" />
      </Row>
      <Row>
        <h3 className="">The status of your application is </h3>
      </Row>
      <Row>
        <h2 style={{ color: '#1E88E5' }} className="text-center">
          {status === 'REJECTED' ? (
            <p style={{ color: '#d32f2f' }}>{status}</p>
          ) : status === 'APPROVED' ? (
            <p style={{ color: '#2e7d32' }}>{status}</p>
          ) : (
            <p style={{ color: '#1E88E5' }}>{status}</p>
          )}
        </h2>
      </Row>
    </Container>
  );
}
