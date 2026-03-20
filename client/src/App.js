import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeDashboard from "./features/employeeDashboard/EmployeeDashboard";
import React from "react";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard"; // if you have this

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/employee/*" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
