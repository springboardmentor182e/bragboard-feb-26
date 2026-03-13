import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { EmployeeManagement } from "./pages/Admin/EmployeeManagement";
import ShoutoutManagementPage from "./features/employee-shoutout-management/pages/ShoutoutManagementPage";

function App() {
  const [users, setUsers] = useState([]);
  const [top, setTop] = useState([]);
  const [stats, setStats] = useState({});

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

  const deptColor = (dept) => {
    if (dept === "Engineering") return "bg-blue-100 text-blue-600";
    if (dept === "Marketing") return "bg-yellow-100 text-yellow-700";
    if (dept === "HR") return "bg-pink-100 text-pink-600";
    if (dept === "Design") return "bg-purple-100 text-purple-600";
    if (dept === "Sales") return "bg-green-100 text-green-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">

        {/* Navbar */}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
            <span className="text-xl font-bold text-indigo-600">BragBoard</span>
          </div>
        </nav>

        <main className="flex-1 w-full max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

          <Routes>

            {/* Redirect */}
            <Route path="/" element={<Navigate to="/leaderboard" replace />} />

            {/* Leaderboard Page */}
            <Route
              path="/leaderboard"
              element={
                <div>
                  <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 mb-10">
                    <div className="bg-yellow-50 border border-yellow-400 p-6 rounded-xl">
                      <p className="text-gray-500">Top Score</p>
                      <h2 className="text-3xl font-bold">{top.length ? top[0].points : 0}</h2>
                    </div>

                    <div className="bg-blue-50 border border-blue-400 p-6 rounded-xl">
                      <p className="text-gray-500">Total Badges</p>
                      <h2 className="text-3xl font-bold">{stats.total_badges}</h2>
                    </div>

                    <div className="bg-green-50 border border-green-400 p-6 rounded-xl">
                      <p className="text-gray-500">Growth</p>
                      <h2 className="text-3xl font-bold">+{stats.growth_percent || 0}%</h2>
                    </div>
                  </div>

                  {/* Full Rankings */}
                  {users.map((u) => (
                    <div key={u.rank} className="flex justify-between border-b py-2">
                      <span>{u.rank}</span>
                      <span>{u.name}</span>
                      <span className={`text-xs px-3 py-1 rounded-full ${deptColor(u.department)}`}>
                        {u.department}
                      </span>
                      <span>{u.points}</span>
                    </div>
                  ))}
                </div>
              }
            />

            {/* Employee Management */}
            <Route path="/admin/employees" element={<EmployeeManagement />} />

            {/* Shoutout Management */}
            <Route path="/shoutout-management" element={<ShoutoutManagementPage />} />

          </Routes>

        </main>
      </div>
    </Router>
  );
}

export default App;