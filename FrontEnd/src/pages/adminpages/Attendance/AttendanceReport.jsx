import React, { useState } from 'react';
import {
  TextField,
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import axios from 'axios';

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': {
      borderColor: 'black',
    },
    '&:hover fieldset': {
      borderColor: 'blue',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'blue',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'white',
    '&.Mui-focused': {
      color: 'blue',
    },
  },
  width: '100%',
};

const AttendanceReport = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);

  const handleFilter = async () => {
    try {
      const res = await axios.get('/api/v1/getAttendanceByDate', {
        params: { date: selectedDate },
      });

      setAttendanceData(res.data.attendance || []);
      console.log(res.data.attendance);
    } catch (error) {
      console.log(error);
    }
  };

  // Use workingHours if present, else calculate from checkIn/checkOut
  const calculateWorkingHours = (att) => {
    if (att.workingHours) {
      const totalMinutes = parseInt(att.workingHours, 10);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h ${minutes}m`;
    }

    const { checkIn, checkOut } = att;
    if (!checkIn || !checkOut) return 'N/A';

    const [inH, inM] = checkIn.split(':').map(Number);
    const [outH, outM] = checkOut.split(':').map(Number);

    let start = new Date();
    start.setHours(inH, inM, 0, 0);

    let end = new Date();
    end.setHours(outH, outM, 0, 0);

    if (end <= start) {
      end.setDate(end.getDate() + 1); // handle overnight shift
    }

    const diffMs = end - start;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  return (
    <Box sx={{ p: 4, color: 'white', width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Attendance Report
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2, width: '80%' }}>
        <TextField
          type="date"
          label="Select Date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={textFieldSx}
        />
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filter
        </Button>
      </Box>

      {attendanceData.length > 0 ? (
        <Paper sx={{ mt: 4, overflowX: 'auto' }}>
          <Table>
            <TableHead sx={{ backgroundColor: 'black' }}>
              <TableRow>
                <TableCell sx={{ color: '#38bdf8' }}>#</TableCell>
                <TableCell sx={{ color: '#38bdf8' }}>Employee ID</TableCell>
                <TableCell sx={{ color: '#38bdf8' }}>Employee Name</TableCell>
                <TableCell sx={{ color: '#38bdf8' }}>Status</TableCell>
                <TableCell sx={{ color: '#38bdf8' }}>Date</TableCell>
                <TableCell sx={{ color: '#38bdf8' }}>Working Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{backgroundColor: "black"}}>
              {attendanceData.map((att, index) => (
                <TableRow key={index}>
                  <TableCell sx={{color: "white"}}>{index + 1}</TableCell>
                  <TableCell sx={{color: "white"}}>{att.employee.department || att.employee._id}</TableCell>
                  <TableCell sx={{color: "white"}}>{att.employee.fullname || 'N/A'}</TableCell>
                  <TableCell sx={{color: "white"}}>{att.status}</TableCell>
                  <TableCell sx={{color: "white"}}>{att.date?.slice(0, 10)}</TableCell>
                  <TableCell sx={{color: "white"}}>{calculateWorkingHours(att)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        selectedDate && (
          <Typography sx={{ mt: 3, fontStyle: 'italic', color: 'gray' }}>
            No attendance found for {selectedDate}
          </Typography>
        )
      )}
    </Box>
  );
};

export default AttendanceReport;
