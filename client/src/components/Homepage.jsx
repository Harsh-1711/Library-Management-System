import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthorization = () => {
      console.log("Function calling");
      axios
        .get("/api/auth", { withCredentials: true })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          navigate("/login");
          console.log(err);
        });
    };
    handleAuthorization();
  }, []);

  return (
    <div>
      <h1>Welcome to the Homepage!</h1>
    </div>
  );
};

export default Homepage;
