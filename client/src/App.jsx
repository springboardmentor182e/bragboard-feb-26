import { Routes, Route } from 'react-router-dom';
import { ShoutoutProvider } from './context/ShoutoutContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import Navbar from './layout/Navbar';
import Sidebar from './layout/Sidebar';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Team from './pages/Team';
import Badges from './pages/Badges';
import ShoutoutManagementPage from './features/employee-shoutout-management/pages/ShoutoutManagementPage';
import ShoutoutManagementPage from "./features/admin-shoutout-management/pages/ShoutoutManagementPage";
import MyShoutoutsPage from "./features/employee-shoutout/pages/MyShoutoutsPage";
import ShoutoutFeedPage from "./features/employee-shoutout/pages/ShoutoutFeedPage";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShoutoutManagementPage from "./features/employee-shoutout-management/pages/ShoutoutManagementPage";

function App() {
  return (
    <AnalyticsProvider>
      <ShoutoutProvider>
        <Navbar />
        <div className="flex pt-16">
          <Sidebar />
          <main className="flex-1 ml-64">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/badges" element={<Badges />} />
              <Route path="/shoutouts" element={<ShoutoutManagementPage />} />
            </Routes>
          </main>
        </div>
      </ShoutoutProvider>
    </AnalyticsProvider>
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
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-slate-200 p-10">
              <h1 className="text-3xl font-bold">Leaderboard</h1>
              <p className="text-gray-600 mb-8">
                Top performers based on recognition and engagement
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="bg-yellow-50 border border-yellow-400 p-6 rounded-xl">
                  <p className="text-gray-500">Top Score</p>
                  <h2 className="text-3xl font-bold">{top.length ? top[0].points : 0}</h2>
                  <p className="text-gray-500 text-sm">{top.length ? top[0].name : ""}</p>
                </div>
                <div className="bg-blue-50 border border-blue-400 p-6 rounded-xl">
                  <p className="text-gray-500">Total Badges</p>
                  <h2 className="text-3xl font-bold">{stats.total_badges}</h2>
                  <p className="text-gray-500 text-sm">Awarded this month</p>
                </div>
                <div className="bg-green-50 border border-green-400 p-6 rounded-xl">
                  <p className="text-gray-500">Growth</p>
                  <h2 className="text-3xl font-bold">+{stats.growth_percent || 0}%</h2>
                  <p className="text-gray-500 text-sm">vs last month</p>
                </div>
              </div>

              {/* Top Performers */}
              <div className="bg-white p-8 rounded-xl shadow mb-10">
                <h2 className="text-xl font-semibold mb-6">Top Performers</h2>
                <div className="grid grid-cols-3 gap-6">
                  {top.map((u, i) => (
                    <div key={u.rank} className={`rounded-xl p-8 text-center ${medalBg[i]}`}>
                      <div className="text-2xl mb-2">{medalEmoji[i]}</div>
                      <img
                        src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${u.name}`}
                        className="w-16 h-16 mx-auto mb-3"
                      />
                      <h3 className="font-semibold">{u.name}</h3>
                      <p className="text-purple-600 text-xl font-bold">{u.points}</p>
                      <span className={`text-xs px-3 py-1 rounded-full ${deptColor(u.department)}`}>
                        {u.department}
                      </span>
                      <p className="text-gray-500 text-sm mt-1">{u.badges} badges</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Rankings */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Full Rankings</h2>
                <div className="grid grid-cols-6 text-gray-500 text-sm font-semibold pb-3 border-b">
                  <div>Rank</div>
                  <div>Employee</div>
                  <div>Department</div>
                  <div>Points</div>
                  <div>Badges</div>
                  <div>Trend</div>
                </div>
                {users.slice(3).map((u) => (
                  <div key={u.rank} className="grid grid-cols-6 items-center py-4 border-b text-sm">
                    <div>
                      <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                        #{u.rank}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${u.name}`}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{u.name}</span>
                    </div>
                    <div>
                      <span className={`text-xs px-3 py-1 rounded-full ${deptColor(u.department)}`}>
                        {u.department}
                      </span>
                    </div>
                    <div className="font-semibold">{u.points}</div>
                    <div>{u.badges} 🏆</div>
                    <div className={`font-semibold ${u.trend > 0 ? "text-green-600" : "text-red-500"}`}>
                      {u.trend > 0 ? "↗ Up" : "↘ Down"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        />
        <Route path="/shoutout-management" element={<ShoutoutManagementPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

