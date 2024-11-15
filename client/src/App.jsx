import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Abt from "./components/Abt";
import Contact from "./components/Cont";

// import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import AddBook from './components/AddBook';
import ManageBook from './components/ManageBook';
//import Analytics from './components/Analytics';

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
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/AddBook" element={<AddBook />} />
        <Route path="/ManageBook" element={<ManageBook />} /> 
        {/* <Route path="/Analytics" element={<Analytics />} />  */}
        
        
      </Routes>
    </Router>
  );
}

export default App;
