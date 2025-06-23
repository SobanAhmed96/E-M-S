import { TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const textFieldSx = {
  mb: '20px',
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': {
      borderColor: 'white',
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

const UpdateAttendance = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [workingHours, setWorkingHours] = useState();
  const [status, setStatus] = useState('');

  useEffect(() => {
    const getAttendance = async () => {
      try {
        const res = await axios.get(`/api/v1/getByIdAttendance/${id}`);
        const attendanceData = res.data.getAttendance;

        setDate(attendanceData.date || '');
        setEmployeeName(attendanceData.employee?.fullname || '');
        setCheckIn(attendanceData.checkIn || '');
        setCheckOut(attendanceData.checkOut || '');
        setWorkingHours(attendanceData.workingHours || 0);
        setStatus(attendanceData.status || '');
      } catch (error) {
        console.error('Failed to fetch attendance:', error);
      }
    };
    getAttendance();
  }, [id]);

  useEffect(() => {
    if (
      checkIn &&
      checkOut &&
      checkIn.includes(':') &&
      checkOut.includes(':')
    ) {
      const [inHour, inMin] = checkIn.split(':').map(Number);
      const [outHour, outMin] = checkOut.split(':').map(Number);

      let diff = (outHour * 60 + outMin) - (inHour * 60 + inMin);
      if (diff < 0) diff += 24 * 60;

      setWorkingHours(diff);
    } else {
      setWorkingHours(0);
    }
  }, [checkIn, checkOut]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        date,
        employeeName,
        checkIn,
        checkOut,
        workingHours, // stored as minutes
        status,
      };

      await axios.put(`/api/v1/updateAttendance/${id}`, payload);
      alert('Attendance updated successfully!');
      navigate('/adminDashboard/getAttendance');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Update failed. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Update Attendance</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          value={date}
          fullWidth
          sx={textFieldSx}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          type="date"
          label="Date"
        />

        <TextField
          value={employeeName}
          fullWidth
          sx={textFieldSx}
          label="Employee Name"
          InputProps={{ readOnly: true }}
        />

        <TextField
          value={checkIn}
          fullWidth
          sx={textFieldSx}
          onChange={(e) => setCheckIn(e.target.value)}
          InputLabelProps={{ shrink: true }}
          type="time"
          label="Check In"
        />

        <TextField
          value={checkOut}
          fullWidth
          sx={textFieldSx}
          onChange={(e) => setCheckOut(e.target.value)}
          InputLabelProps={{ shrink: true }}
          type="time"
          label="Check Out"
        />

        <TextField
          value={workingHours ? (workingHours / 60).toFixed(2) : ''}
          fullWidth
          sx={textFieldSx}
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Working Hours"
          InputProps={{ readOnly: true }}
        />

        <TextField
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          sx={textFieldSx}
          label="Status"
          select
        >
          <MenuItem value="Present">Present</MenuItem>
          <MenuItem value="Absent">Absent</MenuItem>
          <MenuItem value="Late">Late</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Update Attendance
        </Button>
      </form>
    </div>
  );
};

export default UpdateAttendance;
