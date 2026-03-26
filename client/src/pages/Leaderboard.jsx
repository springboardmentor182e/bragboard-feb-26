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
 
  useEffect(() => {
    if (!BASE_URL) {
      setError("API URL is not configured.");
      setLoading(false);
      return;
    }
 
    fetch(`${BASE_URL}/employees/leaderboard`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const finalUsers = Array.isArray(data)
          ? data
          : data?.results || data?.data || [];
 
        const sorted = finalUsers
          .sort((a, b) => (b.points || 0) - (a.points || 0))
          .map((u, i) => ({ ...u, rank: i + 1 }));
 
        setUsers(sorted);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        setError("Failed to load leaderboard. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [BASE_URL]);
 
  const departments = [
    "All",
    ...Array.from(
      new Set(users.map((u) => u.department).filter(Boolean))
    ),
  ];
 
  const filteredUsers = users.filter((u) => {
    const s = search.toLowerCase();
    return (
      (selectedDept === "All" || u.department === selectedDept) &&
      (
        (u.full_name || "").toLowerCase().includes(s) ||
        (u.username || "").toLowerCase().includes(s) ||
        (u.email || "").toLowerCase().includes(s)
      )
    );
  });
 
  const top3 = filteredUsers.slice(0, 3);
  const rest = filteredUsers.slice(3);
 
  // Stats
  const topScore = users[0]?.points ?? 0;
  const totalBadges = users.reduce(
    (acc, u) => acc + (u.fire_badges ?? 0) + (u.star_badges ?? 0) + (u.thumb_badges ?? 0),
    0
  );
 
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f9fafb",
      padding: "32px 40px",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Page Title */}
      <div style={{ marginBottom: 4 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", margin: 0 }}>
          Leaderboard
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
          Top performers this month • Updated daily
        </p>
      </div>
 
      {/* Search + Filter */}
      <div style={{ display: "flex", gap: 12, margin: "24px 0" }}>
        <input
          type="text"
          placeholder="Search shout-outs, people, badges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "10px 16px",
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            background: "#fff",
            fontSize: 14,
            color: "#374151",
            outline: "none",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        />
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          style={{
            padding: "10px 16px",
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            background: "#fff",
            fontSize: 14,
            color: "#374151",
            outline: "none",
            cursor: "pointer",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          {departments.map((d, i) => (
            <option key={i} value={d}>{d}</option>
          ))}
        </select>
      </div>
 
      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: 60, color: "#6b7280", fontSize: 15 }}>
          Loading leaderboard...
        </div>
      )}
 
      {/* Error */}
      {!loading && error && (
        <div style={{ textAlign: "center", padding: 60, color: "#ef4444", fontSize: 15 }}>
          {error}
        </div>
      )}
 
      {!loading && !error && (
        <>
          {filteredUsers.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "#9ca3af", fontSize: 15 }}>
              No users found.
            </div>
          ) : (
            <>
              {/* Podium — top 3 */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                gap: 24,
                marginBottom: 40,
                paddingBottom: 8,
              }}>
                {/* 2nd place */}
                <PodiumCard user={top3[1]} place={2} />
                {/* 1st place — elevated */}
                <div style={{ marginBottom: 20 }}>
                  <PodiumCard user={top3[0]} place={1} />
                </div>
                {/* 3rd place */}
                <PodiumCard user={top3[2]} place={3} />
              </div>
 
              {/* Table — all users */}
              <LeaderboardTable users={filteredUsers} />
 
              {/* Stats footer */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                marginTop: 24,
              }}>
                {[
                  { icon: "🏆", value: topScore.toLocaleString(), label: "Top Score", bg: "#ede9fe", iconBg: "#6366f1" },
                  { icon: "🎖️", value: totalBadges, label: "Total Badges", bg: "#dcfce7", iconBg: "#10b981" },
                  { icon: "📈", value: "+23%", label: "From Last Month", bg: "#fef9c3", iconBg: "#f59e0b" },
                ].map((stat, i) => (
                  <div key={i} style={{
                    background: stat.bg,
                    borderRadius: 14,
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: stat.iconBg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20,
                    }}>
                      {stat.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>
                        {stat.value}
                      </div>
                      <div style={{ fontSize: 13, color: "#6b7280" }}>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}