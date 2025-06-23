import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
   
  const checkLoggedIn = async () => {
    const res = await axios.get("/api/v1/isLoggedIn");
    console.log(res.data);
    if(res.data?.success === true){
      if(res.data.employees.email === "admin@gmail.com"){
         navigate("/adminDashboard")
      }
      else{
        navigate("/employeeDashboard")
      }
    }else if(res.data?.success === false){
       navigate("/")
    }
    
  }

  const handleSubmit =async (e) => {
       e.preventDefault();
    try {
      await axios.post("/api/v1/login", { email ,password });
      // console.log(res.data.data);
      setSuccess(true)
      checkLoggedIn()


    } catch (error) {
      console.log(error);
      
      setError(error?.response?.data?.message || "Login failed")
    }
  

  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Paper elevation={3} className="p-8 w-full max-w-md">
        <Typography variant="h3" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            sx={{ marginTop: "10px" }}
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <Button
            onClick={handleSubmit}
            sx={{ marginTop: "30px" }}
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </Button>
        </form>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Login Successful!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={5000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setError("")}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
