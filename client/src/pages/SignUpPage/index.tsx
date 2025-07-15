import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import { registerUser } from "../../api/userService";

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
    return newErrors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const validationErrors = validate();
    setFormErrors(validationErrors);
    if (formFields.username.length < 1 && formFields.email.length < 1) {
      return;
    }
    if (Object.values(validationErrors).some((error) => error.length > 0)) {
      return;
    }
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
    <div className="signup-container">
      <div className="signup-wrapper">
        <h1>Sign Up</h1>
        <div className="signup-form">
          {error && <p style={{ color: "red" }}>❌ {error}</p>}
          {success && <p style={{ color: "green" }}>✅ {success}</p>}
          <form onSubmit={handleSubmit}>
            <InputField
              type="input"
              name="username"
              placeholder="Username"
              value={formFields.username}
              error={formErrors.username}
              handleChange={handleChange}
            />
            <InputField
              type="email"
              name="email"
              placeholder="Email Address"
              value={formFields.email}
              error={formErrors.email}
              handleChange={handleChange}
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={formFields.password}
              error={formErrors.password}
              handleChange={handleChange}
            />
            <label htmlFor="avatar">Profile Image (optional):</label>
            <input
              type="file"
              accept="image/*"
              id="avatar"
              name="avatar"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button title="Sign Up" type="submit" />
          </form>
        </div>
        <p className="login-text">
          Already have account <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
