import { Container, Row } from 'react-bootstrap';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { handleTokenExchange } from '../services/auth';
import { useAuthContext } from '@asgardeo/auth-react';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'nic', label: 'NIC\u00a0Number' },
  { id: 'address', label: 'Address' },
  { id: 'proof', label: 'Proof of Address', minWidth: 170 },
  { id: 'nicvalid', label: 'NIC\u00a0Validity' },
  { id: 'pvalid', label: 'Police\u00a0Validity' },
  { id: 'appstatus', label: 'Application\u00a0Status' },
  { id: 'action', label: 'Action' },
];

function createData(
  name,
  nic,
  address,
  proof,
  nicvalid,
  pvalid,
  appstatus,
  action
) {
  return { name, nic, address, proof, nicvalid, pvalid, appstatus, action };
}

const rows = [
  createData('Nethmi Pathirana', '996130215V', '25, Gajaba Road, Gampaha'),
];

const Dashboard = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                  {rows
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
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
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
              count={rows.length}
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
};

export default Dashboard;
