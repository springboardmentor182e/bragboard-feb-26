import { useState, useMemo } from "react";
import { useLeaderboard } from "../features/leaderboard/hooks/useLeaderboard";

import PodiumCard from "../features/leaderboard/components/PodiumCard";
import LeaderboardTable from "../features/leaderboard/components/LeaderboardTable";

export default function Leaderboard() {
  const { leaderboard = [], loading, error } = useLeaderboard();

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  // ✅ Dark Mode Toggle
  const [darkMode, setDarkMode] = useState(true);

  // ===== SORT USERS =====
  const sorted = useMemo(() => {
    return [...leaderboard].sort((a, b) => b.points - a.points);
  }, [leaderboard]);

  // ===== FILTER USERS =====
  const filteredUsers = useMemo(() => {
    return sorted.filter((user) => {
      const name =
        user.full_name ||
        user.name ||
        user.username ||
        "";

      const matchesSearch = name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDepartment =
        departmentFilter === "All" ||
        user.department === departmentFilter;

      return matchesSearch && matchesDepartment;
    });
  }, [sorted, search, departmentFilter]);

  // ===== PODIUM USERS =====
  const first = filteredUsers[0] || null;
  const second = filteredUsers[1] || null;
  const third = filteredUsers[2] || null;

  const currentUsers = filteredUsers;

  // ===== DEPARTMENTS =====
  const departments = [
    "All",
    ...new Set(sorted.map((u) => u.department)),
  ];

  // ===== LOADING =====
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-950 text-white text-lg">
        Loading Leaderboard...
      </div>
    );
  }

  // ===== ERROR =====
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-950 text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen px-4 md:px-8 py-8 transition ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white"
          : "bg-[#fef7ed] text-gray-800" // ✅ warm cream background
      }`}
    >
      {/* ===== TITLE ===== */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-wide text-yellow-400">
        🏆 Leaderboard
      </h1>

      {/* ===== DARK MODE BUTTON ===== */}
      <div className="flex justify-end mb-8">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg font-semibold shadow-md bg-yellow-500 text-black hover:bg-yellow-400 transition"
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* ===== SEARCH + FILTER ===== */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 mb-10">
        
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`flex-1 p-3 rounded-xl border shadow-sm transition ${
            darkMode
              ? "bg-slate-800 text-white border-slate-600"
              : "bg-white border-orange-200 focus:ring-2 focus:ring-orange-300"
          }`}
        />

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className={`p-3 rounded-xl border shadow-sm transition ${
            darkMode
              ? "bg-slate-800 text-white border-slate-600"
              : "bg-white border-orange-200 focus:ring-2 focus:ring-orange-300"
          }`}
        >
          {departments.map((dept) => (
            <option key={dept}>{dept}</option>
          ))}
        </select>

      </div>

      {/* ===== PODIUM ===== */}
      <div className="flex justify-center items-end gap-3 md:gap-6 mb-14 flex-wrap">
        {second && <PodiumCard user={second} place={2} />}
        {first && <PodiumCard user={first} place={1} />}
        {third && <PodiumCard user={third} place={3} />}
      </div>

      {/* ===== TABLE ===== */}
      <div
        className={`max-w-5xl mx-auto rounded-3xl shadow-xl p-4 md:p-6 ${
          darkMode
            ? "bg-slate-800 border border-slate-700"
            : "bg-white/90 backdrop-blur-md border border-orange-100"
        }`}
      >
        {currentUsers.length > 0 ? (
          <LeaderboardTable
            users={currentUsers}
            startRank={1}
            darkMode={darkMode} // ✅ IMPORTANT
          />
        ) : (
          <p className="text-center py-10 text-gray-400">
            No employees found.
          </p>
        )}
      </div>
    </div>
  );
}