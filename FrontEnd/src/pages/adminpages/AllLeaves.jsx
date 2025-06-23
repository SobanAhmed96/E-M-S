import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AllLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchAllLeaves = async () => {
      try {
        const res = await axios.get('/api/v1/getLeave');
        console.log(res);
        
        setLeaves(res.data.leave);
      } catch (err) {
        console.error('Error fetching all leaves:', err);
      }
    };

    fetchAllLeaves();
  }, []);

  const handleView =async (id) => {
    navigate(`/adminDashboard/LeaveDetail/${id}`)
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" className="text-3xl text-center" gutterBottom>
        All Leave Requests
      </Typography>

      {leaves.length === 0 ? (
        <Typography>No leave records found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: 'black' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff' }}><strong>Employee</strong></TableCell>
                <TableCell sx={{ color: '#fff' }}><strong>Leave Type</strong></TableCell>
                <TableCell sx={{ color: '#fff' }}><strong>Start Date</strong></TableCell>
                <TableCell sx={{ color: '#fff' }}><strong>End Date</strong></TableCell>
                <TableCell sx={{ color: '#fff' }}><strong>Reason</strong></TableCell>
                <TableCell sx={{ color: '#fff' }}><strong>Status</strong></TableCell>
                <TableCell sx={{ color: '#fff' }}><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaves.map((leave, index) => (
                <TableRow key={index} sx={{backgroundColor: "black"}}>
                  <TableCell sx={{ color: '#fff' }}>{leave.employeeID || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{leave.leaveType}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{leave.startDate ? new Date(leave.startDate).toLocaleDateString() : '-'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{leave.endDate ? new Date(leave.endDate).toLocaleDateString() : '-'}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{leave.reason}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{leave.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleView(leave._id)}
                      sx={{ backgroundColor: '#1976d2' }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AllLeaves;
