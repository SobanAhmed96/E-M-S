import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Snackbar,
  Alert
} from '@mui/material';

const GetLeave = () => {
  const [email, setEmail] = useState('');
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const empRes = await axios.get("/api/v1/getEmployee");
      const empEmail = empRes.data.verifyToken.email;
      setEmail(empEmail);

      const leaveRes = await axios.get("/api/v1/getLeave");
      const allLeaves = leaveRes.data.leave;

      const filtered = allLeaves.filter((leave) =>
        leave.employeeID === empEmail || leave.employeeID?.email === empEmail
      );

      setFilteredLeaves(filtered);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/deleteLeave/${id}`);
      setSnackbar({
        open: true,
        message: 'Leave deleted successfully.',
        severity: 'success',
      });
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Delete failed:', error);
      setSnackbar({
        open: true,
        message: 'Failed to delete leave.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Your Leave Requests
      </Typography>

      {filteredLeaves.length === 0 ? (
        <Typography>No leave records found.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: 'black' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#38BDF8' }}>Leave Type</TableCell>
                <TableCell sx={{ color: '#38BDF8' }}>Start Date</TableCell>
                <TableCell sx={{ color: '#38BDF8' }}>End Date</TableCell>
                <TableCell sx={{ color: '#38BDF8' }}>Reason</TableCell>
                <TableCell sx={{ color: '#38BDF8' }}>Status</TableCell>
                <TableCell sx={{ color: '#38BDF8' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLeaves.map((leave, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: 'white' }}>{leave.leaveType}</TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    {leave.startDate ? new Date(leave.startDate).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    {leave.endDate ? new Date(leave.endDate).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>{leave.reason}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{leave.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(leave._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GetLeave;
