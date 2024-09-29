import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/Login.css";

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
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post("http://localhost:3000/api/login", {
          email,
          password,
        });

        if (response.data.success) {
          console.log("Login successful:", response.data);
          navigate("/");
        } else {
          setErrors({ ...errors, login: "Invalid email or password" });
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrors({ ...errors, login: "An error occurred while logging in" });
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
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="checkbox-group">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <button type="submit" className="login-button">
              Log in
            </button>
            <button
              type="button"
              className="register-button"
              onClick={handleRegisterClick}
            >
              Register
            </button>
            {errors.login && <p className="error">{errors.login}</p>}
          </form>
          <Link to="/forgot"> Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
