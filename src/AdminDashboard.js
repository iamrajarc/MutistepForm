import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Box,
} from '@mui/material';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5002'); // Connect to Socket.IO server

const AdminDashboard = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    // Request initial data from server
    socket.emit('get-initial-data');

    // Listen for initial data from the server
    socket.on('initial-data', (data) => {
      setForms(data);
    });

    // Listen for real-time updates when new form data is inserted
    socket.on('new-data', (data) => {
      setForms(data); // Update the table with new data
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off('initial-data');
      socket.off('new-data');
    };
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard - Form Submissions
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Submitted Forms
              </Typography>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell>Country</TableCell>
                      <TableCell>City</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {forms.map((form, index) => (
                      <TableRow key={index}>
                        <TableCell>{form.firstName}</TableCell>
                        <TableCell>{form.lastName}</TableCell>
                        <TableCell>{form.email}</TableCell>
                        <TableCell>{form.phone}</TableCell>
                        <TableCell>{form.creditCardNumber}</TableCell>
                        <TableCell>{form.country}</TableCell>
                        <TableCell>{form.city}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
