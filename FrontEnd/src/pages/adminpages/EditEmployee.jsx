import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AdminCheck from '../../dashboard/admin/AdminCheck';

const EditEmployee = () => {
  const { id } = useParams();

  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const textFieldSx = {
    mb: "10px",
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

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/v1/getEmployee/${id}`);
        const emp = res.data.employee;

        setFullName(emp.fullname || "");
        setPhone(emp.phone || "");
        setDob(emp.dob ? emp.dob.slice(0, 10) : "");
        setGender(emp.gender || "");
        setDepartment(emp.department || "");
        setDesignation(emp.designation || "");
        setJoiningDate(emp.joiningDate ? emp.joiningDate.slice(0, 10) : "");
        setEmploymentType(emp.employmentType || "");
        setStatus(emp.status || "");
      } catch (error) {
        console.error("Failed to fetch employee data", error);
      }
    };
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('phone', phone);
    formData.append('dob', dob);
    formData.append('gender', gender);
    formData.append('department', department);
    formData.append('designation', designation);
    formData.append('joiningDate', joiningDate);
    formData.append('employmentType', employmentType);
    formData.append('status', status);
    formData.append('password', password);
    if (profilePhoto) formData.append('profilePhoto', profilePhoto);

    try {
      await axios.put(`/api/v1/updateEmployee/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSnackbar({
        open: true,
        message: "Employee updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to update employee",
        severity: "error",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 mx-auto p-4" style={{ width: "80%" }}>
        <h1 className='text-4xl mb-6 text-center'>Update Employee</h1>
        <AdminCheck />
        <TextField label="Full Name" value={fullname} onChange={(e) => setFullName(e.target.value)} sx={textFieldSx} required />
        <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} sx={textFieldSx} required />
        <TextField label="Date of Birth" type="date" value={dob} onChange={(e) => setDob(e.target.value)} sx={textFieldSx} required InputLabelProps={{ shrink: true }} />
        <TextField label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} sx={textFieldSx} required />
        <TextField label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} sx={textFieldSx} required />
        <TextField label="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} sx={textFieldSx} required />
        <TextField label="Joining Date" type="date" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} sx={textFieldSx} required InputLabelProps={{ shrink: true }} />
        <TextField label="Employment Type" value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} sx={textFieldSx} required />
        <TextField label="Status" value={status} onChange={(e) => setStatus(e.target.value)} sx={textFieldSx} required />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={textFieldSx} helperText="Enter new password or leave blank to keep current" />
        <input type="file" accept="image/*" onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)} />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Update Employee
        </Button>
      </form>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditEmployee;
