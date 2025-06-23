import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

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

const leaveTypes = ["Sick", "Casual", "Earned", "Unpaid", "Maternity", "Paternity"]
const statusOptions = ["Pending"];

const AddLeave = () => {
  const [employeeID, setEmployee] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("Pending");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/v1/getEmployee`);
        setEmployee(res.data.verifyToken.email);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/v1/addLeave", {
        employeeID,
        leaveType,
        startDate,
        endDate,
        reason,
        status,
      });

      setSnackbar({
        open: true,
        message: "Leave submitted successfully!",
        severity: "success",
      });

      // Reset fields except employee
      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setReason("");
      setStatus("Pending");
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to submit leave.",
        severity: "error",
      });
    }
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 4, color: "white" }}>
      <Typography variant="h5" gutterBottom>
        Add Leave Request
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Employee Email"
          value={employeeID}
          onChange={(e) => setEmployee(e.target.value)}
          sx={{ ...whiteTextFieldStyles, mt: 2 }}
          InputProps={{ readOnly: true }}
        />
        <TextField
          select
          fullWidth
          label="Leave Type"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          sx={{ ...whiteTextFieldStyles, mt: 2 }}
          required
        >
          {leaveTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          type="date"
          label="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ ...whiteTextFieldStyles, mt: 2 }}
          required
        />
        <TextField
          fullWidth
          type="date"
          label="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ ...whiteTextFieldStyles, mt: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Reason"
          multiline
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          sx={{ ...whiteTextFieldStyles, mt: 2 }}
          required
        />
        <TextField
          select
          fullWidth
          label="Status"
          inputProps={{readOnly: true}}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ ...whiteTextFieldStyles, mt: 2 }}
        >
          {statusOptions.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
          Submit Leave
        </Button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} onClose={handleClose} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddLeave;
