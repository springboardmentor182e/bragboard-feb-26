import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import Login from "./pages/Login";
import Recognition from "./pages/Recognition";
import Settings from "./pages/Settings";

import Layout from "./components/Layout";
import { EmployeeProvider } from "./context/EmployeeContext";

function App() {
  return (
    <EmployeeProvider>
      <BrowserRouter>

        <Routes>

          {/* Login Page */}
          <Route path="/" element={<Login />} />

          {/* Dashboard Layout Routes */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />

          <Route path="/employees" element={<Layout><Employees /></Layout>} />

          <Route path="/add-employee" element={<Layout><AddEmployee /></Layout>} />

          <Route path="/edit/:id" element={<Layout><EditEmployee /></Layout>} />

          <Route path="/recognition" element={<Layout><Recognition /></Layout> }/>

          <Route path="/settings"element={<Layout><Settings /></Layout> }/>

        </Routes>

      </BrowserRouter>
    </EmployeeProvider>
  );
}

export default App;