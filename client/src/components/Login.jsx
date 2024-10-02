import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/users/login",
          {
            email,
            password,
          }
        );

        if (response.data.success) {
          toast.success("Login successful!");
          console.log("Login successful:", response.data);
          navigate("/");
        } else {
          toast.error(response.data.error || "Invalid email or password");
          setErrors({
            ...errors,
            login: response.data.error || "Invalid email or password",
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        if (error.response) {
          toast.error(error.response.data.error);
          setErrors({
            ...errors,
            login:
              error.response.data.error || "An error occurred while logging in",
          });
        } else {
          toast.error("An unexpected error occurred. Please try again later.");
          setErrors({ ...errors, login: "An unexpected error occurred." });
        }
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
