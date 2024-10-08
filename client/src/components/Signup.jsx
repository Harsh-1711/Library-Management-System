import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../assets/css/Signup.css";
import InputField from "./InputField";
import Button from "./Button";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/Login");
  };

  const validate = () => {
    let errors = {};

    if (!fullName && !email && !password && !confirmPassword) {
      toast.error("Please fill all the fields");
      return false;
    }

    if (!fullName) {
      toast.error("Full Name is required");
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
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (!confirmPassword) {
      toast.error("Confirm your password");
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
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
          "http://localhost:8080/api/users/signup",
          {
            name: fullName,
            email,
            password,
          }
        );

        if (response.data.success) {
          toast.success("Signup successful");
          console.log("Signup successful:", response.data);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Signup error:", error);

        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        } else {
          setErrors({
            ...errors,
            signin: "An unexpected error occurred. Please try again.",
          });
        }
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="signup-image">
          <h2>
            "The only person who is educated is the one who has learned how to
            learn...and change."
          </h2>
          <p>— Carl Rogers</p>
        </div>
        <div className="signup-form">
          <h3>Get Started with Your Account</h3>
          <h4>Sign Up</h4>
          <p>Create your account to explore more.</p>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />

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

            <InputField
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />

            <div className="signup-checkbox-group">
              <input type="checkbox" id="agreeTerms" />
              <label htmlFor="agreeTerms">
                I agree to the terms and conditions
              </label>
            </div>

            <Button type="submit" label="Sign Up" className="signup-button" />
          </form>
          <p>
            Already have an account?{" "}
            <Button
              type="button"
              label="Log In"
              className="log-link"
              onClick={handleLoginClick}
            />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
