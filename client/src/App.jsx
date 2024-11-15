import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Abt from "./components/Abt";
import Contact from "./components/Cont";

// import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<Abt />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
