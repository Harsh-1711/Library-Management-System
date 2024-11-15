import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast"; 
import "../assets/css/Login.css";
import InputField from "./InputField"; 
import Button from "./Button"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/Signup");
  };

  
  const validate = () => {
    let errors = {};

    if (!email && !password) {
      toast.error("Please fill all the fields");
      return false;
    }
    if (!email) {
      toast.error("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email is invalid");
      return false;
    }

    if (!password) {
      toast.error("Password is required");
      return false;
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
    
      toast.success("Login successful!");
      navigate("/Dashboard"); 
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
              label="Email"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <InputField
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <div className="checkbox-group">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>

            <Button type="submit" label="Log in" className="login-button" />

            <Button
              type="button"
              label="Register"
              className="register-button"
              onClick={handleRegisterClick}
            />

            {errors.login && <p className="error">{errors.login}</p>}
          </form>
          <Link to="/forgot">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
