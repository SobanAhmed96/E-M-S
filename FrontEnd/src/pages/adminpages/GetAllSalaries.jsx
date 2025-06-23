import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  TextField,
  Snackbar,
  Alert,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import AdminCheck from '../../dashboard/admin/AdminCheck';

const GetAllSalaries = () => {
  const [salaries, setSalaries] = useState([]);
  const [employeeMap, setEmployeeMap] = useState({});
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate()

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  useEffect(() => {
    const getSalariesAndEmployees = async () => {
      try {
        const [salaryRes, empRes] = await Promise.all([
          axios.get('/api/v1/getSalaries'),
          axios.get('/api/v1/getEmployee'),
        ]);

        const empMap = {};
        empRes.data.employees.forEach(emp => {
          empMap[emp._id] = emp.email;
        });

        setEmployeeMap(empMap);
        setSalaries(salaryRes.data.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    getSalariesAndEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/deleteSalary/${id}`);
      setSalaries(prev => prev.filter(s => s._id !== id));
      setSnackbar({ open: true, message: 'Salary deleted successfully.', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to delete salary.', severity: 'error' });
    }
  };
  const handelEdit = async(id) => {
   navigate(`/adminDashboard/updateSalary/${id}`)
  }
  const filteredSalaries = salaries.filter(salary =>
    (employeeMap[salary.employee] || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
         <TextField
        label="Search by Employee Email"
        fullWidth
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          marginBottom: 2,
          '& .MuiInputBase-root': { color: 'white' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '& .MuiInputLabel-root': { color: 'white' }
        }}
      />
      <AdminCheck />
    <Paper sx={{ padding: 3, marginTop: 4, backgroundColor: 'black', color: 'white' }}>
      <Typography className="text-center" variant="h4" gutterBottom>
        All Salary Records
      </Typography>

     

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'white' }}><b>Employee</b></TableCell>
            <TableCell sx={{ color: 'white' }}><b>Basic Salary</b></TableCell>
            <TableCell sx={{ color: 'white' }}><b>Allowances</b></TableCell>
            <TableCell sx={{ color: 'white' }}><b>Deductions</b></TableCell>
            <TableCell sx={{ color: 'white' }}><b>Net Salary</b></TableCell>
            <TableCell sx={{ color: 'white' }}><b>Payment Date</b></TableCell>
            <TableCell sx={{ color: 'white' }}><b>Payment Mode</b></TableCell>
            <TableCell sx={{ color: 'white' }}><b>Status</b></TableCell>
            <TableCell sx={{ color: 'white' }}><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSalaries.map(salary => (
            <TableRow key={salary._id}>
              <TableCell sx={{ color: 'white' }}>{employeeMap[salary.employee] || 'Unknown'}</TableCell>
              <TableCell sx={{ color: 'white' }}>{salary.basicSalary}</TableCell>
              <TableCell sx={{ color: 'white' }}>{salary.allowances}</TableCell>
              <TableCell sx={{ color: 'white' }}>{salary.deductions}</TableCell>
              <TableCell sx={{ color: 'white' }}>{salary.netSalary}</TableCell>
              <TableCell sx={{ color: 'white' }}>{new Date(salary.paymentDate).toLocaleDateString()}</TableCell>
              <TableCell sx={{ color: 'white' }}>{salary.paymentMode}</TableCell>
              <TableCell sx={{ color: 'white' }}>{salary.status}</TableCell>
              <TableCell sx={{ color: 'white' }}>
                <Button variant='contained' sx={{marginRight: "20px"}} onClick={() =>  handelEdit(salary._id)} color="primary">
                    Edit
                </Button>
                <Button variant='contained' sx={{backgroundColor: "red"}} onClick={() => handleDelete(salary._id)} color="error">
                    Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Snackbar open={snackbar.open} anchorOrigin={{vertical: "top" , horizontal: "right"}} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
    </div>

  );
};

export default GetAllSalaries;
