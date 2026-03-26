import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoutoutManagementPage from "./features/admin-shoutout-management/pages/ShoutoutManagementPage";
import MyShoutoutsPage from "./features/employee-shoutout/pages/MyShoutoutsPage";
import ShoutoutFeedPage from "./features/employee-shoutout/pages/ShoutoutFeedPage";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShoutoutManagementPage from "./features/employee-shoutout-management/pages/ShoutoutManagementPage";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
    <Routes>
      {/* Main Page */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-purple-950 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-purple-400">
              Dashboard Home 🚀
            </h1>
          </div>
        }
      />

      {/* Shoutout Page */}
      <Route
        path="/admin/shoutouts"
        element={<ShoutoutManagementPage />}
      />

      {/* Employee My Shoutouts Page */}
      <Route path="/my-shoutouts" element={<MyShoutoutsPage />} />

      {/* Main Shoutout Feed */}
      <Route path="/shoutouts" element={<ShoutoutFeedPage />} />
    </Routes>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;