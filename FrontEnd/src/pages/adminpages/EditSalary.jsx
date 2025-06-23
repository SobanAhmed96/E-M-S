import React, { useEffect, useState } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AdminCheck from '../../dashboard/admin/AdminCheck';

const textFieldSx = {
  mb: '10px',
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

const paymentModes = ['Bank Transfer', 'Cash', 'Cheque'];
const statusOptions = ['Pending', 'Paid'];

const EditSalary = () => {
  const { id } = useParams(); // Fixed destructuring

  const [employeeData, setEmployeeData] = useState([]);
  const [employeeID, setEmployeeID] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [allowances, setAllowances] = useState('');
  const [deductions, setDeductions] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [netSalary, setNetSalary] = useState(0);
  const [status, setStatus] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('/api/v1/getEmployee');
        setEmployeeData(res.data.employees || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const net = Number(basicSalary || 0) + Number(allowances || 0) - Number(deductions || 0);
    setNetSalary(net);
  }, [basicSalary, allowances, deductions]);

  useEffect(() => {
    const getSalary = async () => {
      try {
        const res = await axios.get(`/api/v1/getSalary/${id}`);
        const data = res.data.data;
        console.log(res.data.data);
        

        setEmployeeID(data.employee);
        setBasicSalary(data.basicSalary);
        setAllowances(data.allowances);
        setDeductions(data.deductions);
        setPaymentDate(data.paymentDate?.substring(0, 10)); // Trim timestamp
        setPaymentMode(data.paymentMode);
        setStatus(data.status)
      } catch (error) {
        console.error('Failed to fetch salary:', error);
      }
    };
    getSalary();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeID || !basicSalary || !paymentDate || !paymentMode) {
      setSnackbarMessage('Please fill in all required fields.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      await axios.post(`/api/v1/updateSalary/${id}`, {
        employeeID,
        basicSalary,
        allowances,
        deductions,
        netSalary,
        paymentDate,
        paymentMode,
        status
      });

      setSnackbarMessage('Salary updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Failed to update salary.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <AdminCheck />
      <div style={{ width: '60%' }}>
        <h1 className="text-3xl text-center mb-5">Update Salary</h1>

        <TextField
          label="Employee *"
          fullWidth
          select
          value={employeeID}
          onChange={(e) => setEmployeeID(e.target.value)}
          sx={textFieldSx}
        >
          {employeeData.map((emp) => (
            <MenuItem key={emp._id} value={emp._id}>
              {emp.fullname} ({emp.email})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Basic Salary"
          type="number"
          value={basicSalary}
          onChange={(e) => setBasicSalary(Number(e.target.value))}
          fullWidth
          required
          sx={textFieldSx}
        />

        <TextField
          label="Allowances"
          type="number"
          value={allowances}
          onChange={(e) => setAllowances(Number(e.target.value))}
          fullWidth
          sx={textFieldSx}
          helperText="Bonus, Overtime, etc."
        />

        <TextField
          label="Deductions"
          type="number"
          value={deductions}
          onChange={(e) => setDeductions(Number(e.target.value))}
          fullWidth
          sx={textFieldSx}
          helperText="Tax, Insurance, etc."
        />

        <TextField
          label="Net Salary"
          value={netSalary}
          fullWidth
          InputProps={{ readOnly: true }}
          sx={textFieldSx}
        />

        <TextField
          label="Payment Date"
          type="date"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          sx={textFieldSx}
        />

        <TextField
          select
          label="Payment Mode"
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
          fullWidth
          required
          sx={textFieldSx}
        >
          {paymentModes.map((mode) => (
            <MenuItem key={mode} value={mode}>
              {mode}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          required
          sx={textFieldSx}
        >
          {statusOptions.map((mode) => (
            <MenuItem key={mode} value={mode}>
              {mode}
            </MenuItem>
          ))}
        </TextField>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Update Salary
        </Button>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default EditSalary;
