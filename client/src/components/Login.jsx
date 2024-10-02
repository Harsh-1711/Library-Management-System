// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; 
import Toastify from 'toastify-js'; 
import "toastify-js/src/toastify.css"; 
import InputField from './InputField';
import Button from './Button';
import '../assets/styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/Signup'); 
  };

  const showToast = (message, type = 'error') => {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top", 
      position: "center", 
      backgroundColor: type === 'success' ? "#4AB19D" : "#801336", 
    }).showToast();
  };

  const validate = () => {
    let valid = true;
    
    if (!email) {
      showToast('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      showToast('Email is invalid');
      valid = false;
    }

    if (!password) {
      showToast('Password is required');
      valid = false;
    } else if (password.length < 6) {
      showToast('Password must be at least 6 characters');
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:3000/api/login', { email, password }); 
        
        if (response.data.success) { 
          showToast('Login successful!', 'success');
          navigate('/'); 
        } else {
          showToast('Invalid email or password');
        }
      } catch (error) {
        console.error('Login error:', error);
        showToast('An error occurred while logging in');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-image">
          <h2>"Learning never exhausts the mind."</h2>
          <p> — Leonardo da Vinci</p>
        </div>
        <div className="login-form">
          <h3>Empower Your Mind</h3>
          <h4>Login</h4>
          <p>Welcome Back! Let's pick up where you left off.</p>
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
            <div className="checkbox-group">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <Button type="submit" className="login-button" text="Log in" />
            <Button type="button" className="register-button" text="Register" onClick={handleRegisterClick} />
          </form>
          <Link to="/forgot"> Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
