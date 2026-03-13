import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EmployeeManagement from "./pages/Admin/EmployeeManagement";
import Login from "./pages/Login/Login";
import ShoutoutManagementPage from "./features/employee-shoutout-management/pages/ShoutoutManagementPage";

function App() {

  const [users, setUsers] = useState([]);
  const [top, setTop] = useState([]);
  const [stats, setStats] = useState({});

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const isAuthenticated = () => {
    return localStorage.getItem("access_token") !== null;
  };

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
  };

  useEffect(() => {
    if (!BASE_URL) return;

    const fetchJSON = async (url, setter) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setter(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJSON(`${BASE_URL}/leaderboard/full`, setUsers);
    fetchJSON(`${BASE_URL}/leaderboard/top`, setTop);
    fetchJSON(`${BASE_URL}/leaderboard/stats`, setStats);
  }, [BASE_URL]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">

        {/* Navbar */}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
            <span className="text-xl font-bold text-indigo-600">BragBoard</span>

            <button
              onClick={() => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </nav>

        <main className="flex-1">

          <Routes>

            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Redirect */}
            <Route path="/" element={<Navigate to="/leaderboard" replace />} />

            {/* Employee Management */}
            <Route
              path="/admin/employees"
              element={
                <ProtectedRoute>
                  <EmployeeManagement />
                </ProtectedRoute>
              }
            />

            {/* Leaderboard */}
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <div className="p-10">
                    <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

                    {users.map((u) => (
                      <div key={u.rank} className="flex justify-between border-b py-2">
                        <span>{u.rank}</span>
                        <span>{u.name}</span>
                        <span>{u.department}</span>
                        <span>{u.points}</span>
                      </div>
                    ))}
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Shoutout Management */}
            <Route
              path="/shoutout-management"
              element={
                <ProtectedRoute>
                  <ShoutoutManagementPage />
                </ProtectedRoute>
              }
            />

          </Routes>

        </main>
      </div>
    </Router>
  );
}

export default App;