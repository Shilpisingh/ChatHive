import React, { useState } from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import './styles.scss';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';

const LoginPage = () => {
  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (name: string, value: string) => {
    setFormFields((prev) => ({ ...prev, [name]: value }));
  }

  const validate = () => {
    const newErrors = {...errors};
    if (!formFields.email.includes('@')) newErrors.email = 'Please enter valid email';
    if (formFields.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const validationErrors = validate();
      setErrors(validationErrors);
      if (errors.email && errors.password) {
        return;
      }
      const userCredential = await signInWithEmailAndPassword(auth, formFields.email, formFields.password);
      var user = userCredential.user;
      console.log('user');
      if (user) {
        navigate('/chat');
      }
    } catch (error) {
      console.log('error')
    }
  }

  return (
    <div className='login-container'>
      <div className='login-wrapper'>
        <h1>Login</h1>
        <div className='login-form'>
        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            name="email"
            placeholder="Email Address"
            value={formFields.email}
            error={errors.email}
            handleChange={handleChange}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={formFields.password}
            error={errors.password}
            handleChange={handleChange}
          />
          <Button
            title='Log In'
            type='submit'
          />
          </form>
        </div>
        <p className='signup-text'>Already have account <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;