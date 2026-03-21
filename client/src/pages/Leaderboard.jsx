import { useEffect, useState } from "react";
import PodiumCard from "../features/leaderboard/components/PodiumCard.jsx";
import LeaderboardTable from "../features/leaderboard/components/LeaderboardTable.jsx";

export default function Leaderboard({ darkMode = false }) {

  // 🔥 STATES
  const [users, setUsers] = useState([]);
  const [isDark, setIsDark] = useState(darkMode);
  const [selectedDept, setSelectedDept] = useState("All");
  const [search, setSearch] = useState("");

  // 🔥 FETCH DATA
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/leaderboard/leaderboard/")
      .then(res => res.json())
      .then(data => {
        const finalUsers = data?.data || [];
        setUsers(finalUsers);
      })
      .catch(err => console.error("API ERROR:", err));
  }, []);

  // 🔥 UNIQUE DEPARTMENTS
  const departments = [
    "All",
    ...Array.from(
      new Set(
        users
          .map(u => u.department?.toLowerCase())
          .filter(Boolean)
      )
    ).map(d => d.charAt(0).toUpperCase() + d.slice(1))
  ];

  // 🔥 FILTER USERS (SAFE SEARCH)
  const filteredUsers = users.filter((u) => {
    const name = u.full_name?.toLowerCase() || "";
    const username = u.username?.toLowerCase() || "";
    const email = u.email?.toLowerCase() || "";

    const matchDept =
      selectedDept === "All" ||
      u.department?.toLowerCase() === selectedDept.toLowerCase();

    const matchSearch =
      name.includes(search.toLowerCase()) ||
      username.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase());

    return matchDept && matchSearch;
  });

  // 🔥 PODIUM FIX (SAFE)
  const topUsers = [
    filteredUsers.find(u => u.rank === 2),
    filteredUsers.find(u => u.rank === 1),
    filteredUsers.find(u => u.rank === 3),
  ].filter(Boolean); // remove undefined

  return (
    <div
      className={`
        min-h-screen p-6
        ${
          isDark
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            : "bg-gradient-to-br from-orange-100 via-amber-50 to-orange-200"
        }
      `}
    >

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">

        <h1
          className={`
            text-2xl sm:text-3xl font-bold flex items-center gap-2
            ${isDark ? "text-yellow-400" : "text-orange-600"}
          `}
        >
          🏆 Leaderboard
        </h1>

        <button
          onClick={() => setIsDark(!isDark)}
          className="px-4 py-2 rounded-xl bg-black text-white text-sm"
        >
          {isDark ? "Light ☀️" : "Dark 🌙"}
        </button>

      </div>

      {/* ===== SEARCH + FILTER ===== */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search name / username / email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`
            flex-1 px-4 py-2 rounded-xl outline-none
            ${
              isDark
                ? "bg-slate-800 text-white border border-slate-600"
                : "bg-white/60 backdrop-blur-md border border-orange-200"
            }
          `}
        />

        {/* DEPARTMENT FILTER */}
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className={`
            px-4 py-2 rounded-xl
            ${
              isDark
                ? "bg-slate-800 text-white border border-slate-600"
                : "bg-white/60 backdrop-blur-md border border-orange-200"
            }
          `}
        >
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>

      </div>

      {/* ===== PODIUM ===== */}
      <div className="flex flex-col sm:flex-row justify-center items-end gap-6 mb-10 w-full">

        {filteredUsers.find(u => u.rank === 2) && (
          <div className="flex flex-col items-center">
            <div className="text-xl mb-1">🥈</div>
            <PodiumCard user={filteredUsers.find(u => u.rank === 2)} place={2} />
          </div>
        )}

        {filteredUsers.find(u => u.rank === 1) && (
          <div className="flex flex-col items-center">
            <div className="text-2xl mb-1">🥇</div>
            <PodiumCard user={filteredUsers.find(u => u.rank === 1)} place={1} />
          </div>
        )}

        {filteredUsers.find(u => u.rank === 3) && (
          <div className="flex flex-col items-center">
            <div className="text-xl mb-1">🥉</div>
            <PodiumCard user={filteredUsers.find(u => u.rank === 3)} place={3} />
          </div>
        )}

      </div>

      {/* ===== TABLE ===== */}
      <div
        className={`
          rounded-2xl p-4
          ${
            isDark
              ? "bg-slate-800 border border-slate-700"
              : "bg-white/60 backdrop-blur-lg border border-orange-200"
          }
        `}
      >
        <LeaderboardTable users={filteredUsers} />
      </div>

    </div>
  );
}