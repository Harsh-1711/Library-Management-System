import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../assets/css/Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/");
  };

  // Validation function
  const validate = () => {
    let errors = {};

    if (!email) {
      toast.error("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email is invalid");
    }

    if (!password) {
      toast.error("Password is required");
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
    }

    if (!confirmPassword) {
      toast.error("Confirm your password");
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post("http://localhost:8080/api/signup", {
          email,
          password,
        });
        if (response.data.success) {
          toast.success("Signup successful");
          console.log("Signup successful:", response.data);
          navigate("/");
        } else {
          setErrors({ ...errors, signup: "Signup failed" });
        }
      } catch (error) {
        console.error("Signup error:", error);
        setErrors({ ...errors, signin: "An error occurred while signup" });
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="signup-image">
          <h2>
            "The only person who is educated is the one who has learned how to
            learn...and change."{" "}
          </h2>
          <p>— Carl Rogers</p>
        </div>
        <div className="signup-form">
          <h3>Get Started with Your Account</h3>
          <h4>Sign In</h4>
          <p>Create your account to explore more.</p>
          <form onSubmit={handleSubmit}>
            <div className="signup-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="signup-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="signup-form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="signup-checkbox-group">
              <input type="checkbox" id="agreeTerms" />
              <label htmlFor="agreeTerms">
                I agree to the terms and conditions
              </label>
            </div>
            <button type="submit" className="signup-button">
              Sign In
            </button>
            {errors.signin && <p className="error">{errors.signin}</p>}
          </form>
          <p>
            Already have an account?{" "}
            <button className="log-link" onClick={handleLoginClick}>
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
