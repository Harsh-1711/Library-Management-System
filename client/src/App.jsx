import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AddBook from './components/AddBook';
import ManageBook from './components/ManageBook';
//import Analytics from './components/Analytics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        {/* <Route path="/AdminPanel" element={<AdminPanel />} /> */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/AddBook" element={<AddBook />} />
        <Route path="/ManageBook" element={<ManageBook />} /> 
        {/* <Route path="/Analytics" element={<Analytics />} />  */}
        
        
      </Routes>
    </Router>
  );
}

export default App;
