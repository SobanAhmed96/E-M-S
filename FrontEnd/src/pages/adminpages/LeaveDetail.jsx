import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Stack,
  Avatar,
  Grid,
  CircularProgress,
} from '@mui/material';

const LeaveDetail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchLeaveAndEmployee = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/getLeaveById/${id}`);
      const leaveData = res.data.Leave;
      setLeave(leaveData);

      const empRes = await axios.get('/api/v1/getEmployee');
      const allEmployees =
        empRes.data.employees || empRes.data.verifyToken || [];

      const matchedEmployee = allEmployees.find(
        (emp) => emp.email === leaveData.employeeID
      );
      setEmployee(matchedEmployee);
    } catch (error) {
      console.error('Error fetching leave or employee:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveAndEmployee();
  }, [id]);

  const updateStatus = async (status) => {
    try {
      setUpdating(true);
      const res = await axios.put(`/api/v1/updateLeave/${id}`, { status });
      alert(res.data.message || 'Leave status updated');
      fetchLeaveAndEmployee();
    } catch (error) {
      alert('Failed to update leave status');
      console.error(`Failed to update status to ${status}`, error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !leave) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography mt={2}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Leave Details
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Grid container spacing={3}>
          {/* Employee Section */}
          <Grid item xs={12} md={4}>
            <Stack alignItems="center" spacing={2}>
              <Avatar
                alt={employee?.fullname || 'Employee'}
                src={employee?.profilePhoto || ''}
                sx={{ width: 100, height: 100 }}
              />
              <Typography variant="h6">
                {employee?.fullname || 'Not available'}
              </Typography>
              <Typography color="text.secondary">
                {employee?.department || 'Department not set'}
              </Typography>
              <Typography color="text.secondary">
                {employee?.email || 'No Email'}
              </Typography>
            </Stack>
          </Grid>

          {/* Leave Info Section */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Leave Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={1}>
              <Typography>
                <strong>Type:</strong> {leave.leaveType}
              </Typography>
              <Typography>
                <strong>Start Date:</strong>{' '}
                {new Date(leave.startDate).toLocaleDateString('en-GB')}
              </Typography>
              <Typography>
                <strong>End Date:</strong>{' '}
                {new Date(leave.endDate).toLocaleDateString('en-GB')}
              </Typography>
              <Typography>
                <strong>Reason:</strong> {leave.reason}
              </Typography>
              <Typography>
                <strong>Status:</strong>{' '}
                <span
                  style={{
                    color:
                      leave.status === 'Approved'
                        ? 'green'
                        : leave.status === 'Rejected'
                        ? 'red'
                        : 'orange',
                  }}
                >
                  {leave.status}
                </span>
              </Typography>
            </Stack>

            {leave.status === 'Pending' && (
              <Stack direction="row" spacing={2} mt={4}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => updateStatus('Approved')}
                  disabled={updating}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => updateStatus('Rejected')}
                  disabled={updating}
                >
                  Reject
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LeaveDetail;
