import { MenuItem, TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminCheck from '../../dashboard/admin/AdminCheck';

const textFieldSx = {
  mb: "10px",
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': { borderColor: 'white' },
    '&:hover fieldset': { borderColor: 'blue' },
    '&.Mui-focused fieldset': { borderColor: 'blue' },
  },
  '& .MuiInputLabel-root': {
    color: 'white',
    '&.Mui-focused': { color: 'blue' },
  },
  width: '100%',
};

const SalaryCreate = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [basicSalary, setBasicSalary] = useState("");
  const [allowances, setAllowances] = useState("");
  const [deductions, setDeductions] = useState("");
  const [netSalary, setNetSalary] = useState(0);
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [status, setStatus] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // success | error
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const paymentmode = ["Bank Transfer", "Cash", "Cheque"];
  const methodStatus = ["Paid","Pending"];

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/v1/getEmployee");
        setEmployeeList(res.data.employees);
      } catch (error) {
        console.log("Error fetching employees", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const net = Number(basicSalary || 0) + Number(allowances || 0) - Number(deductions || 0);
    setNetSalary(net);
  }, [basicSalary, allowances, deductions]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("/api/v1/addSalary", {
      employee: employeeID,
      basicSalary,
      allowances,
      deductions,
      netSalary,
      paymentDate,
      paymentMode,
      status
    });

    // ✅ Success Snackbar trigger
    setSnackbar({
      open: true,
      message: "Salary created successfully!",
      severity: "success"
    });

    // ✅ Reset form fields
    setEmployeeID("");
    setBasicSalary("");
    setAllowances("");
    setDeductions("");
    setNetSalary(0); // ← reset computed value
    setPaymentDate("");
    setPaymentMode("");

  } catch (error) {
    console.error("Error creating salary record:", error);
    setSnackbar({
      open: true,
      message: "Failed to create salary.",
      severity: "error"
    });
  }
};


  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <div style={{ width: "60%" }}>
          <h1 className='text-4xl text-center mb-5'>Employee Salary Create</h1>
<AdminCheck />
          <TextField
            label="Employee"
            select
            fullWidth
            required
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
            sx={textFieldSx}
          >
            {employeeList.map((val) => (
              <MenuItem key={val._id} value={val._id}>
                {val.email}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Basic Salary"
            type='number'
            fullWidth
            required
            value={basicSalary}
            onChange={(e) => setBasicSalary(e.target.value)}
            sx={textFieldSx}
          />

          <TextField
            label="Allowances"
            type='number'
            fullWidth
            value={allowances}
            onChange={(e) => setAllowances(e.target.value)}
            sx={textFieldSx}
          />

          <TextField
            label="Deductions"
            type='number'
            fullWidth
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
            sx={textFieldSx}
          />

          <TextField
            label="Net Salary"
            type='number'
            fullWidth
            value={netSalary}
            InputLabelProps={{ shrink: true }}
            inputProps={{ readOnly: true }}
            sx={textFieldSx}
          />

          <TextField
            label="Payment Date"
            type='date'
            fullWidth
            required
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            sx={textFieldSx}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Payment Mode"
            select
            fullWidth
            required
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            sx={textFieldSx}
          >
            {paymentmode.map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Status"
            select
            fullWidth
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={textFieldSx}
          >
            {methodStatus.map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Generate Payslip & Save
          </Button>
        </div>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SalaryCreate;
