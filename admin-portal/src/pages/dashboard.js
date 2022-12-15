import { Container, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { handleTokenExchange } from '../services/auth';
import { useAuthContext } from '@asgardeo/auth-react';
import { getAllPoliceRecords } from '../services/police-check';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const columns = [
  { id: 'first_name', label: 'Name' },
  { id: 'id_number', label: 'NIC Number' },
  { id: 'address', label: 'Address' },
  { id: 'proof_image_url', label: 'Proof of Address' },
  { id: 'address_check_status', label: 'Address\u00a0Check' },
  { id: 'id_check_status', label: 'NIC\u00a0Check' },
  { id: 'police_check_status', label: 'Police\u00a0Check' },
  { id: 'appstatus', label: 'Application\u00a0Status' },
  { id: 'action', label: 'Action' },
];

const Dashboard = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [policeReports, setPoliceReports] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { state, getIDToken } = useAuthContext();

  const fetchDetails = async () => {
    const results = await getAllPoliceRecords();
    console.log(results);
    setPoliceReports(results);
  };

  useEffect(() => {
    if (!state?.isAuthenticated) {
      return;
    }

    getIDToken()
      .then((idToken) => {
        handleTokenExchange(idToken);
        fetchDetails();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getIDToken, state, state?.isAuthenticated]);

  return (
    <>
      <Container>
        <Row>
          <h5 style={{ color: '#1E88E5' }} className="my-3 text-center">
            Police Certificate Requests Received
          </h5>
        </Row>
        <Row className="d-flex justify-content-center">
          <TableContainer fluid sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {policeReports
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'action' ? (
                                <div>
                                  <CancelIcon color="error" />{' '}
                                  <CheckCircleIcon color="success" />
                                </div>
                              ) : column.format && typeof value === 'number' ? (
                                column.format(value)
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={policeReports.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
