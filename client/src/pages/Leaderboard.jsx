import { useEffect, useState } from "react";
import PodiumCard from "../features/leaderboard/components/PodiumCard.jsx";
import LeaderboardTable from "../features/leaderboard/components/LeaderboardTable.jsx";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [selectedDept, setSelectedDept] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;

  // 🔥 FETCH DATA
  useEffect(() => {
    if (!BASE_URL) {
      console.error("VITE_API_URL is not defined in your .env file");
      setError("API URL is not configured.");
      setLoading(false);
      return;
    }

    console.log("Fetching from:", `${BASE_URL}/leaderboard/leaderboard/`);

    fetch(`${BASE_URL}/leaderboard/leaderboard/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("RAW DATA:", data);

        // ✅ Handle plain array, Django pagination (results), or custom wrapper (data)
        const finalUsers = Array.isArray(data)
          ? data
          : data?.results || data?.data || [];

        // ✅ SORT + ADD RANK
        const sorted = finalUsers
          .sort((a, b) => (b.points || 0) - (a.points || 0))
          .map((u, i) => ({
            ...u,
            rank: i + 1,
          }));

        setUsers(sorted);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        setError("Failed to load leaderboard. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [BASE_URL]);

  // 🔥 DEPARTMENTS
  const departments = [
    "All",
    ...Array.from(
      new Set(
        users
          .map((u) => u.department?.toLowerCase())
          .filter(Boolean)
      )
    ).map((d) => d.charAt(0).toUpperCase() + d.slice(1)),
  ];

  // 🔥 FILTER USERS
  const filteredUsers = users.filter((u) => {
    const searchText = search.toLowerCase();
    return (
      (selectedDept === "All" ||
        u.department?.toLowerCase() === selectedDept.toLowerCase()) &&
      (
        (u.full_name || "").toLowerCase().includes(searchText) ||
        (u.username || "").toLowerCase().includes(searchText) ||
        (u.email || "").toLowerCase().includes(searchText)
      )
    );
  });

  // 🏆 TOP 3
  const top3 = filteredUsers.slice(0, 3);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#fff7f3] via-white to-[#fdeee7]">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-orange-500">
          🏆 Leaderboard
        </h1>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <p className="text-orange-400 text-lg font-medium animate-pulse">
            Loading leaderboard...
          </p>
        </div>
      )}

      {/* ERROR STATE */}
      {!loading && error && (
        <div className="flex justify-center items-center py-20">
          <p className="text-red-500 text-lg font-medium">{error}</p>
        </div>
      )}

      {/* MAIN CONTENT */}
      {!loading && !error && (
        <>
          {/* SEARCH + FILTER */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-white border shadow-sm"
            />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white border shadow-sm"
            >
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* EMPTY STATE */}
          {filteredUsers.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <p className="text-gray-400 text-lg">No users found.</p>
            </div>
          ) : (
            <>
              {/* 🏆 PODIUM */}
              <div className="flex justify-center items-end gap-8 mb-12">
                <PodiumCard user={top3[1]} place={2} />
                <div className="-mb-6">
                  <PodiumCard user={top3[0]} place={1} />
                </div>
                <PodiumCard user={top3[2]} place={3} />
              </div>

              {/* 📊 TABLE */}
              <div className="rounded-2xl p-4 bg-white border shadow-sm">
                <LeaderboardTable users={filteredUsers} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}