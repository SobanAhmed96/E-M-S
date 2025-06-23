import { Button, MenuItem, Snackbar, TextField, Alert } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const textFieldSx = {
  mb: "20px",
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

const AddAttendance = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [date, setDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [workingHoursStr, setWorkingHoursStr] = useState('');
  const [workingHoursMinutes, setWorkingHoursMinutes] = useState(0);
  const [status, setStatus] = useState('');
  const [employeeList, setEmployeeList] = useState([]);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("/api/v1/getEmployee");
        setEmployeeList(res.data.employees);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (checkInTime && checkOutTime) {
      const [inHour, inMin] = checkInTime.split(":").map(Number);
      const [outHour, outMin] = checkOutTime.split(":").map(Number);

      let diff = (outHour * 60 + outMin) - (inHour * 60 + inMin);
      if (diff < 0) diff += 24 * 60;

      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;

      setWorkingHoursStr(`${hours}h ${minutes}m`);
      setWorkingHoursMinutes(diff);

      
    } else {
      setWorkingHoursStr('');
      setWorkingHoursMinutes(0);
    }
  }, [checkInTime, checkOutTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/addAttendance', {
        employee: employeeName,
        date,
        checkIn: checkInTime,
        checkOut: checkOutTime,
        workingHours: workingHoursMinutes,
        status,
      });

      setSnackbar({ open: true, message: "Attendance added successfully!", severity: "success" });

      // Reset
      setEmployeeName('');
      setDate('');
      setCheckInTime('');
      setCheckOutTime('');
      setWorkingHoursStr('');
      setWorkingHoursMinutes(0);
      setStatus('');
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "Something went wrong!", severity: "error" });
    }
  };

  return (
    <div style={{
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <form onSubmit={handleSubmit} style={{ width: "60%" }}>
        <h1 className='text-4xl text-center mb-5'>Add Attendance</h1>

        <TextField
          label="Date"
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={textFieldSx}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Employee Name"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          select
          sx={textFieldSx}
          fullWidth
        >
          {employeeList.map((emp) => (
            <MenuItem key={emp._id} value={emp._id}>
              {emp.fullname}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Check-in Time"
          type='time'
          value={checkInTime}
          onChange={(e) => setCheckInTime(e.target.value)}
          sx={textFieldSx}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Check-out Time"
          type='time'
          value={checkOutTime}
          onChange={(e) => setCheckOutTime(e.target.value)}
          sx={textFieldSx}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Working Hours"
          value={workingHoursStr}
          InputProps={{ readOnly: true }}
          sx={textFieldSx}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          select
          sx={textFieldSx}
          fullWidth
        >
          <MenuItem value="Present">Present</MenuItem>
          <MenuItem value="Late">Late</MenuItem>
          <MenuItem value="Absent">Absent</MenuItem>
        </TextField>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 2, py: 1.5 }}
        >
          Add Attendance
        </Button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddAttendance;
