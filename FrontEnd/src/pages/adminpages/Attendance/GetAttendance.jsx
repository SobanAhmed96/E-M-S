import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, IconButton,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const GetAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("/api/v1/getAttendance");
      setAttendanceData(res.data.attendance || []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const formatWorkingHours = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this attendance record?")) return;
    try {
        console.log(id);
        
      await axios.delete(`/api/v1/deleteAttendance/${id}`);
      fetchAttendance();
    } catch (error) {
      console.error("Failed to delete attendance", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/adminDashboard/updateAttendance/${id}`)
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom align="center">
        All Attendance
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: 'black' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Employee Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
              <TableCell sx={{ color: 'white' }}>Working Hours</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{backgroundColor: "black"}}>
            {attendanceData.map((record) => (
              <TableRow key={record._id}>
                <TableCell sx={{color: "white"}}>{record.employee?.fullname || 'N/A'}</TableCell>
                <TableCell sx={{color: "white"}}>{record.date}</TableCell>
                <TableCell sx={{color: "white"}}>{record.status}</TableCell>
                <TableCell sx={{color: "white"}}>{formatWorkingHours(record.workingHours)}</TableCell>
                <TableCell>
                  <Button variant='contained' color="primary" onClick={() => handleEdit(record._id)}>
                    Edit
                  </Button>
                  <Button variant='contained' sx={{backgroundColor: "red", marginLeft: "10px"}} color="error" onClick={() => handleDelete(record._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GetAttendance;
