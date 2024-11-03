// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';
import { toast } from 'react-toastify'; // Import toast
import { getErrorMessage } from './errorMessages'; // Import error mapping function
import './Form.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Login successful!'); // Show toast on successful login
        navigate('/'); // Redirect to home page
      } catch (error) {
        setErrors({ form: getErrorMessage(error.code) }); // Handle error
        console.error('Error logging in:', error);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className="error" role="alert">{errors.email}</p>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="error" role="alert">{errors.password}</p>}

        <button type="submit">Login</button>
        {errors.form && <p className="error" role="alert">{errors.form}</p>}
      </form>
    </div>
  );
}

export default Login;
