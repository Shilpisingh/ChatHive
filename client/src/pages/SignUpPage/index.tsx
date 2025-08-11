import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import { registerUser } from "../../api/userService";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

const SignupPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (name: string, value: string) => {
    setFormFields((prev) => ({ ...prev, [name]: value }));
    setFormErrors({ ...formErrors, [name]: "" });
    setError("");
    setSuccess("");
  };

  const validate = () => {
    const newErrors = { ...formErrors };
    if (!formFields.username.length) newErrors.username = "Please enter name";
    if (!formFields.email.length) {
      newErrors.email = "Please enter email address";
    } else if (!/\S+@\S+\.\S+/.test(formFields.email)) {
      newErrors.email = "Please enter valid email";
    }
    if (!formFields.password.length) {
      newErrors.password = "Please enter password";
    } else if (formFields.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    console.log("Form errors:", newErrors);
    setFormErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validate()) return;
    const formData = new FormData();
    formData.append("username", formFields.username);
    formData.append("email", formFields.email);
    formData.append("password", formFields.password);
    if (file) {
      formData.append("avatar", file);
    }
    try {
      const response = await registerUser(formData);
      console.log("Registration response:", response);
      setSuccess(response.message || "User registered successfully");
      setFormFields({ username: "", email: "", password: "" });
      //navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      setError(message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFormErrors({ ...formErrors });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
          Sign Up
        </Typography>
        {error && (
          <Typography color="error" mb={2} textAlign="center">
            {error}
          </Typography>
        )}
        {success && <Typography color="success">✅ {success}</Typography>}
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
          noValidate
        >
          <TextField
            label="Name"
            required
            fullWidth
            value={formFields.username}
            error={!!formErrors.username}
            helperText={formErrors.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
          <TextField
            type="email"
            label="Email"
            required
            fullWidth
            value={formFields.email}
            error={!!formErrors.email}
            helperText={formErrors.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            required
            fullWidth
            value={formFields.password}
            error={!!formErrors.password}
            helperText={formErrors.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <Button variant="outlined" component="label">
            <IconButton
              component="span"
              color="primary"
              aria-label="upload picture"
            >
              <PhotoCamera />
            </IconButton>
            Upload Profile Photo (optional)
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Register
          </Button>
        </Box>
        <Typography variant="body2" align="center" mt={2}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignupPage;
