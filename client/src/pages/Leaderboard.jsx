import { useEffect, useState } from "react";
import PodiumCard from "../features/leaderboard/components/PodiumCard.jsx";
import LeaderboardTable from "../features/leaderboard/components/LeaderboardTable.jsx";

export default function Leaderboard() {

  const [users, setUsers] = useState([]);
  const [selectedDept, setSelectedDept] = useState("All");
  const [search, setSearch] = useState("");

  // 🔥 FETCH DATA
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/leaderboard/leaderboard/")
      .then(res => res.json())
      .then(data => {
        const finalUsers = Array.isArray(data) ? data : data?.data || [];
        setUsers(finalUsers);
      })
      .catch(err => console.error("API ERROR:", err));
  }, []);

  // 🔥 DEPARTMENTS
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

  // 🔥 FILTER USERS
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

  return (
    <div
      className="
        min-h-screen p-6
        bg-gradient-to-br 
        from-[#fff7f3] 
        via-[#ffffff] 
        to-[#fdeee7]
      "
    >

      {/* ===== HEADER ===== */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-orange-500">
          🏆 Leaderboard
        </h1>
      </div>

      {/* ===== SEARCH + FILTER ===== */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search name / username / email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            flex-1 px-4 py-2 rounded-xl outline-none
            bg-white/70 backdrop-blur-md
            border border-orange-100
            shadow-sm
          "
        />

        {/* FILTER */}
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="
            px-4 py-2 rounded-xl
            bg-white/70 backdrop-blur-md
            border border-orange-100
            shadow-sm
          "
        >
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>

      </div>

      {/* ===== PODIUM ===== */}
      <div className="flex justify-center items-end gap-8 mb-12">

        {/* 2nd */}
        <PodiumCard
          user={filteredUsers.find(u => u.rank === 2)}
          place={2}
        />

        {/* 1st (center raised) */}
        <div className="-mb-6">
          <PodiumCard
            user={filteredUsers.find(u => u.rank === 1)}
            place={1}
          />
        </div>

        {/* 3rd */}
        <PodiumCard
          user={filteredUsers.find(u => u.rank === 3)}
          place={3}
        />

      </div>

      {/* ===== TABLE ===== */}
      <div
        className="
          rounded-2xl p-4
          bg-white/70 backdrop-blur-md
          border border-white/40
          shadow-sm
        "
      >
        <LeaderboardTable users={filteredUsers} />
      </div>

    </div>
  );
}