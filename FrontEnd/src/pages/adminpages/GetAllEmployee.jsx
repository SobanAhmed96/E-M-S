import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminCheck from "../../dashboard/admin/AdminCheck";

const GetAllEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchEmail, setSearchEmail] = useState(""); // Search input state
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/v1/getEmployee", {
          withCredentials: true,
        });
        setEmployees(res.data.employees || []);
      } catch (err) {
        setError("Failed to fetch employees");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleView = (id) => {
    navigate(`/adminDashboard/getByIdEmpoloyee/${id}`);
  };

  // Filter employees by email based on search input
  const filteredEmployees = employees.filter((emp) =>
    emp.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="p-4 min-h-screen text-white">
      <Typography variant="h4" gutterBottom align="center" color="white">
        All Employees
      </Typography>
      <AdminCheck />

      {/* Search input */}
      <TextField
        label="Search by Email"
        variant="outlined"
        size="small"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        sx={{ mb: 2, width: "100%", maxWidth: 400, color: "white" , border: "1px solid white" }}
        InputLabelProps={{ style: { color: "white" } }}
        InputProps={{
          style: { color: "white" },
        }}
      />

      {loading ? (
        <div className="flex justify-center mt-10">
          <CircularProgress />
        </div>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer
          sx={{ backgroundColor: "black" }}
          component={Paper}
          className="mt-4 text-white"
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "white" }}>
                  <strong>Photo</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>Name</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>Email</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>Phone</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>Department</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <TableRow key={emp._id}>
                    <TableCell>
                      <img
                        src={emp.profilePhoto}
                        alt="Profile"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      />
                    </TableCell>
                    <TableCell style={{ color: "white" }}>{emp.fullname}</TableCell>
                    <TableCell style={{ color: "white" }}>{emp.email}</TableCell>
                    <TableCell style={{ color: "white" }}>
                      {emp.phone || "N/A"}
                    </TableCell>
                    <TableCell style={{ color: "white" }}>
                      {emp.department || "N/A"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleView(emp._id)}
                        sx={{
                          color: "white",
                          borderColor: "white",
                          "&:hover": { borderColor: "blue" },
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    style={{ color: "white", fontStyle: "italic" }}
                  >
                    No employees found with that email.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default GetAllEmployee;
