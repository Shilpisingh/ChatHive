import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { auth } from '../../firebase';
import './styles.scss'
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';

const SignupPage = () => {
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (name: string, value: string) => {
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {...errors};
    if (!formFields.name.length) newErrors.name = 'Please enter name';
    if (!formFields.email.includes('@')) newErrors.email = 'Please enter valid email';
    if (formFields.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const validationErrors = validate();
      setErrors(validationErrors);
      if (errors.name && errors.email && errors.password) {
        return;
      }
      console.log('createUserWithEmailAndPassword will called');
      const userCredential = await createUserWithEmailAndPassword(auth, formFields.email, formFields.password);
      const user = userCredential.user;
      if (user) {
        await updateProfile(user, {
          displayName: formFields.name,
        });
        console.log(user);
        navigate("/login")
      }
    } catch (error) {
      console.error('Registration error:', error);
      //const errorCode = e.code;
      //const errorMessage = error.message;
      //console.log(errorCode, errorMessage);
    }
  }
  return (
    <div className='signup-container'>
      <div className='signup-wrapper'>
        <h1>Sign Up</h1>
        <div className='signup-form'>
          <form onSubmit={handleSubmit}>
            <InputField
              type="input"
              name="name"
              placeholder="Name"
              value={formFields.name}
              error={errors.name}
              handleChange={handleChange}
            />
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
              title='Sign Up'
              type='submit'
            />
          </form>
        </div>
        <p className='login-text'>Already have account <Link to="/login">Log In</Link></p>
      </div>
    </div>
  );
};

export default SignupPage;