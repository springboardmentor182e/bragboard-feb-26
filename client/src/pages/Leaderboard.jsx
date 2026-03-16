import { useState, useMemo, useEffect } from "react";
import { useLeaderboard } from "../features/leaderboard/hooks/useLeaderboard";

import PodiumCard from "../features/leaderboard/components/PodiumCard";
import LeaderboardTable from "../features/leaderboard/components/LeaderboardTable";

export default function Leaderboard() {
  const { leaderboard = [], loading, error } = useLeaderboard();

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  // ===== SORT USERS =====
  const sorted = useMemo(() => {
    return [...leaderboard].sort((a, b) => b.points - a.points);
  }, [leaderboard]);

  // ===== FILTER USERS =====
  const filteredUsers = useMemo(() => {
    return sorted.filter((user) => {
      const name = user.full_name || "";

      const matchesSearch = name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDepartment =
        departmentFilter === "All" ||
        user.department === departmentFilter;

      return matchesSearch && matchesDepartment;
    });
  }, [sorted, search, departmentFilter]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, departmentFilter]);

  // ===== PODIUM USERS =====
  const first = filteredUsers[0] || null;
  const second = filteredUsers[1] || null;
  const third = filteredUsers[2] || null;

  // ===== USERS AFTER PODIUM =====
  const remainingUsers = filteredUsers.slice(3);

  // ===== PAGINATION =====
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;

  const currentUsers = remainingUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(remainingUsers.length / usersPerPage);

  // ===== DEPARTMENT LIST =====
  const departments = [
    "All",
    ...new Set(sorted.map((u) => u.department)),
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900 text-white text-lg">
        Loading Leaderboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900 text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 md:px-8 py-8">

      {/* ===== TITLE ===== */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 tracking-wide">
        🏆 Leaderboard
      </h1>

      {/* ===== SEARCH + FILTER ===== */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="p-3 rounded-xl bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        >
          {departments.map((dept) => (
            <option key={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* ===== PODIUM SECTION ===== */}
      <div className="flex justify-center items-end gap-3 md:gap-5 mb-14 flex-wrap">

        {second && <PodiumCard user={second} place={2} />}

        {first && <PodiumCard user={first} place={1} />}

        {third && <PodiumCard user={third} place={3} />}

      </div>

      {/* ===== TABLE SECTION ===== */}
      <div className="max-w-5xl mx-auto bg-white text-black rounded-3xl shadow-2xl p-4 md:p-6">

        {currentUsers.length > 0 ? (
          <LeaderboardTable
            users={currentUsers}
            startRank={4}
          />
        ) : (
          <p className="text-center py-10 text-gray-500">
            No employees found.
          </p>
        )}

      </div>

      {/* ===== PAGINATION ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2 flex-wrap">

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                currentPage === i + 1
                  ? "bg-yellow-500 text-black shadow-lg"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              {i + 1}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}