import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/userService";
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";

const LoginPage = () => {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (name: string, value: string) => {
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = { ...formErrors };
    if (!formFields.email.includes("@"))
      newErrors.email = "Please enter valid email";
    if (formFields.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    const validationErrors = validate();
    setFormErrors(validationErrors);
    if (formFields.email.length < 1 && formFields.password.length < 1) {
      return;
    }
    try {
      const response = await loginUser(formFields);
      if (!response || !response.token) {
        setError("Invalid email or password");
        return;
      }
      localStorage.setItem("token", response.token); // save token
      localStorage.setItem("user", JSON.stringify(response.user));
      window.location.reload();
      setFormFields({ email: "", password: "" });
    } catch (error) {
      setError("Login failed. Please try again.");
      //console.log("error", error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
          Login to Your Account
        </Typography>
        {error && (
          <Typography color="error" mb={2} textAlign="center">
            {error}
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            required
            fullWidth
            value={formFields.email}
            error={!!formErrors.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            required
            fullWidth
            value={formFields.password}
            error={!!formErrors.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2, borderRadius: 2 }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Box>
        <Typography variant="body2" align="center" mt={2}>
          Don't have an account? <a href="/signup">Register</a>
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginPage;
