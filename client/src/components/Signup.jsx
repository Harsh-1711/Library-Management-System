// src/components/Signup.jsx
import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toastify from 'toastify-js'; 
import "toastify-js/src/toastify.css"; 
import InputField from './InputField';
import Button from './Button';
import '../assets/styles/Signup.css'; 

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Navigate to login page
  const handleLoginClick = () => {
    navigate('/login');
  };

  // Function to show toast notifications
  const showToast = (message, type = "success") => {
    Toastify({
      text: message,
      duration: 5000, 
      gravity: "top", 
      position: 'center', 
      backgroundColor: type === "success" ? "#4AB19D" : "#801336", 
      close: true, // Enable close button
    }).showToast();
  };

  // Validation function
  const validate = () => {
    let errors = {};

    if (!email) {
      showToast('Email is required', 'error');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      showToast('Invalid email format', 'error');
      return false;
    }

    if (!password) {
      showToast('Password is required', 'error');
      return false;
    } else if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return false;
    }

    if (!confirmPassword) {
      showToast('Confirm your password', 'error');
      return false;
    } else if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:3000/api/signin', { email, password });
        if (response.data.success) {
          showToast('Signup successful!', 'success'); // Success toast
          navigate('/'); // Navigate to homepage after successful sign in
        } else {
          showToast('Signup failed', 'error'); // Error toast
        }
      } catch (error) {
        console.error('Signup error:', error);
        showToast('An error occurred while signing up', 'error'); // Error toast
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="signup-image">
          <h2>"The only person who is educated is the one who has learned how to learn...and change." </h2>
          <p>— Carl Rogers</p>
        </div>
        <div className="signup-form">
          <h3>Get Started with Your Account</h3>
          <h4>Sign Up</h4>
          <p>Create your account to explore more.</p>
          <form onSubmit={handleSubmit}>
            <InputField
              label="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
              label="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="signup-checkbox-group">
              <input type="checkbox" id="agreeTerms" />
              <label htmlFor="agreeTerms">I agree to the terms and conditions</label>
            </div>
            <Button type="submit" className="signup-button" text="Sign Up" />
          </form>
          <p>
            Already have an account? <button className="log-link" onClick={handleLoginClick}>Log In</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
