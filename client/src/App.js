import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeDashboard from "./features/employeeDashboard/EmployeeDashboard";
import AdminShoutouts from "./features/adminDashboard/pages/AdminShoutouts";
import React from "react";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/employee/*" element={<EmployeeDashboard />} />
        <Route path="/admin" element ={<AdminShoutouts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
