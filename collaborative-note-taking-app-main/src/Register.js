// src/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Import updateProfile
import { auth } from './firebase-config';
import { toast } from 'react-toastify'; // Import toast
import { getErrorMessage } from './errorMessages'; // Import error mapping function
import './Form.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name) {
      newErrors.name = 'User Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Set user's display name in Firebase Auth
        await updateProfile(userCredential.user, { displayName: name });
        toast.success('Registration successful!'); // Show toast on successful registration
        console.log('User registered:', userCredential.user);
        setName('');
        setEmail('');
        setPassword('');
        setErrors({});
        navigate('/'); // Redirect to home page after registration
      } catch (error) {
        setErrors({ form: getErrorMessage(error.code) }); // Display custom error message
        console.error('Error registering user:', error);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">User Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <p className="error" role="alert">{errors.name}</p>}
        
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
          minLength="6"
        />
        {errors.password && <p className="error" role="alert">{errors.password}</p>}

        <button type="submit">Register</button>
        {errors.form && <p className="error" role="alert">{errors.form}</p>}
      </form>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default Register;
