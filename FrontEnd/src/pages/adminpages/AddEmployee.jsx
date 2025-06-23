import React, { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  MenuItem,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import AdminCheck from "../../dashboard/admin/AdminCheck";

const whiteTextFieldStyles = {
  "& label": { color: "white" },
  "& label.Mui-focused": { color: "white" },
  "& .MuiInputBase-input": { color: "white" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "white" },
    "&:hover fieldset": { borderColor: "white" },
    "&.Mui-focused fieldset": { borderColor: "white" },
  },
};

const genders = ["Male", "Female", "Other"];
const departments = ["HR", "IT", "Finance", "Marketing", "Sales"];
const employmentTypes = ["Full-time", "Part-time", "Contract"];
const statuss = ["Active", "Inactive"];

const AddEmployee = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const resetFields = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setDob("");
    setGender("");
    setDepartment("");
    setDesignation("");
    setJoiningDate("");
    setEmploymentType("");
    setStatus("");
    setPassword("");
    setProfilePhoto(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Field validation
    if (
      !fullname ||
      !email ||
      !phone ||
      !dob ||
      !gender ||
      !department ||
      !designation ||
      !joiningDate ||
      !employmentType ||
      !status ||
      !password ||
      !profilePhoto
    ) {
      return showSnackbar("Please fill in all fields", "error");
    }

    if (!/^\d{11}$/.test(phone)) {
      return showSnackbar(
        "Please enter a valid 11-digit phone number",
        "error"
      );
    }

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("dob", dob);
    formData.append("gender", gender);
    formData.append("department", department);
    formData.append("designation", designation);
    formData.append("joiningDate", joiningDate);
    formData.append("employmentType", employmentType);
    formData.append("status", status);
    formData.append("password", password);
    formData.append("profilePhoto", profilePhoto);

    setLoading(true);
    try {
      const res = await axios.post("/api/v1/addEmployee", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showSnackbar("Employee created successfully");
      resetFields();
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong";
      showSnackbar(msg, "error");
      console.error("Add Employee Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-4"
        encType="multipart/form-data"
      >
        <AdminCheck />
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "white" }}
        >
          Add Employee
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={2} mt={3} mb={4}>
          <TextField
            label="Full Name"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
            sx={whiteTextFieldStyles}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            sx={whiteTextFieldStyles}
          />
          <TextField
            label="Phone"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            sx={whiteTextFieldStyles}
          />
          <TextField
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            fullWidth
            required
            sx={whiteTextFieldStyles}
          />
          <TextField
            label="Gender"
            select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            fullWidth
            required
            sx={whiteTextFieldStyles}
          >
            {genders.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Department"
            select
            required
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            fullWidth
            sx={whiteTextFieldStyles}
          >
            {departments.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            fullWidth
            required
            sx={whiteTextFieldStyles}
          />
          <TextField
            label="Joining Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
            fullWidth
            required
            sx={whiteTextFieldStyles}
          />
          <TextField
            label="Employment Type"
            select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            fullWidth
            required
            sx={whiteTextFieldStyles}
          >
            {employmentTypes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Status"
            select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            required
            sx={whiteTextFieldStyles}
          >
            {statuss.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            sx={whiteTextFieldStyles}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Profile Photo"
            type="file"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            inputProps={{ accept: "image/*" }}
            sx={whiteTextFieldStyles}
            onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            color="primary"
            disabled={loading}
            startIcon={
              loading && <CircularProgress size={24} color="inherit" />
            }
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddEmployee;
