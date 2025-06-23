import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Avatar,
  Grid,
  CircularProgress,
  Alert,
  Paper,
  Container,
  Button,
  Box,
  Snackbar,
} from "@mui/material";
import AdminCheck from "../../dashboard/admin/AdminCheck";

const GetByIdEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`/api/v1/getEmployee/${id}`, {
          withCredentials: true,
        });
        setEmployee(res.data.employee);
      } catch (err) {
        setError("Failed to fetch employee details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  useEffect(() => {
    const getSalariesForEmployee = async () => {
      try {
        const res = await axios.get(`/api/v1/getSalaries`);
        const allSalaries = res.data.data || [];

        const employeeSalaries = allSalaries.filter((sal) => sal.employee === id);
        setSalaries(employeeSalaries);
      } catch (error) {
        console.log("Failed to fetch salaries:", error);
      }
    };

    getSalariesForEmployee();
  }, [id]);

  const handleEdit = () => {
    navigate(`/adminDashboard/updateEmployee/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`/api/v1/deleteEmployee/${id}`, {
          withCredentials: true,
        });
        setSnackbar({
          open: true,
          message: "Employee deleted successfully",
          severity: "success",
        });
        setTimeout(() => navigate("/adminDashboard/getAllEmployee"), 1500);
      } catch (err) {
        console.error("Delete failed", err);
        setSnackbar({
          open: true,
          message: "Failed to delete employee",
          severity: "error",
        });
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Container className="flex justify-center mt-10">
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="md"  className="mt-6">
      <Paper
        elevation={4}
        sx={{
          backgroundColor: "black",
          color: "#ffffff",
          padding: 4,
          width: "90%",
          margin: "0 auto",
          borderRadius: 3,
        }}
      >
        <AdminCheck />
        <Typography variant="h5" gutterBottom align="center">
          Employee Details
        </Typography>

        {employee && (
          <Grid container spacing={2}>
            <Grid item xs={12} className="flex justify-center">
              <Avatar
                src={employee.profilePhoto}
                alt={employee.fullname}
                sx={{ width: 100, height: 100 }}
              />
            </Grid>
            {[
              { label: "Full Name", value: employee.fullname },
              { label: "Email", value: employee.email },
              { label: "Phone", value: employee.phone },
              { label: "Date of Birth", value: employee.dob },
              { label: "Gender", value: employee.gender },
              { label: "Department", value: employee.department },
              { label: "Designation", value: employee.designation },
              { label: "Joining Date", value: employee.joiningDate },
              { label: "Employment Type", value: employee.employmentType },
              { label: "Status", value: employee.status },
            ].map((field, idx) => (
              <Grid item xs={6} key={idx}>
                <Typography variant="subtitle2" color="gray">
                  {field.label}
                </Typography>
                <Typography>{field.value || "N/A"}</Typography>
              </Grid>
            ))}
          </Grid>
        )}

        <Box mt={4} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="primary" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>

        {salaries.length > 0 && (
  <>
    <Typography variant="h6" mt={5} mb={2}>
      Salary Records
    </Typography>
    <Box
      sx={{
        maxHeight: 300, // adjust height as needed
        overflowY: "auto",
        pr: 1, // padding for scrollbar space
      }}
    >
      {salaries.map((sal) => (
        <Box
          key={sal._id}
          mb={2}
          p={2}
          sx={{ backgroundColor: "#2e2e2e", borderRadius: 2 }}
        >
          <Typography>Basic Salary: Rs: {sal.basicSalary}</Typography>
          <Typography>Allowances: Rs: {sal.allowances}</Typography>
          <Typography>Deductions: Rs: {sal.deductions}</Typography>
          <Typography>Net Salary: Rs: {sal.netSalary}</Typography>
          <Typography>Payment Mode: {sal.paymentMode}</Typography>
          <Typography>
            Payment Date: {new Date(sal.paymentDate).toLocaleDateString()}
          </Typography>
        </Box>
      ))}
    </Box>
  </>
)}

      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default GetByIdEmployee;
