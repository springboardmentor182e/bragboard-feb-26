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
    ...Array.from(new Set(users.map((u) => u.department).filter(Boolean))),
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
 
  const topScore = users[0]?.points ?? 0;
  const totalBadges = users.reduce(
    (acc, u) =>
      acc + (u.fire_badges ?? 0) + (u.star_badges ?? 0) + (u.thumb_badges ?? 0),
    0
  );
 
  return (
    <div
      style={{
        minHeight: "100vh",
        // ✅ Warm cream background matching the reference image
        background: "#fef9ef",
        padding: "36px 44px",
        fontFamily: "'Geist', 'DM Sans', 'Inter', sans-serif",
      }}
    >
      {/* Page Title */}
      <div style={{ marginBottom: 6 }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#111827",
            margin: 0,
            letterSpacing: "-0.5px",
            fontFamily: "'Geist', 'DM Sans', sans-serif",
          }}
        >
          Leaderboard
        </h1>
        <p
          style={{
            fontSize: 13,
            color: "#9ca3af",
            marginTop: 5,
            fontWeight: 400,
            fontFamily: "'Geist', 'DM Sans', sans-serif",
          }}
        >
          Top performers this month • Updated daily
        </p>
      </div>
 
      {/* Search + Filter */}
      <div style={{ display: "flex", gap: 12, margin: "22px 0" }}>
        <input
          type="text"
          placeholder="Search shout-outs, people, badges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "10px 16px",
            borderRadius: 10,
            border: "1.5px solid rgba(0,0,0,0.08)",
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            fontSize: 14,
            color: "#374151",
            outline: "none",
            fontFamily: "'Geist', 'DM Sans', sans-serif",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        />
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          style={{
            padding: "10px 16px",
            borderRadius: 10,
            border: "1.5px solid rgba(0,0,0,0.08)",
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            fontSize: 14,
            color: "#374151",
            outline: "none",
            cursor: "pointer",
            fontFamily: "'Geist', 'DM Sans', sans-serif",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          {departments.map((d, i) => (
            <option key={i} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
 
      {/* Loading */}
      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: 60,
            color: "#9ca3af",
            fontSize: 14,
            fontFamily: "'Geist', 'DM Sans', sans-serif",
          }}
        >
          Loading leaderboard...
        </div>
      )}
 
      {/* Error */}
      {!loading && error && (
        <div
          style={{
            textAlign: "center",
            padding: 60,
            color: "#ef4444",
            fontSize: 14,
            fontFamily: "'Geist', 'DM Sans', sans-serif",
          }}
        >
          {error}
        </div>
      )}
 
      {!loading && !error && (
        <>
          {filteredUsers.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: 60,
                color: "#9ca3af",
                fontSize: 14,
                fontFamily: "'Geist', 'DM Sans', sans-serif",
              }}
            >
              No users found.
            </div>
          ) : (
            <>
              {/* Podium — top 3 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  gap: 20,
                  marginBottom: 44,
                  paddingTop: 8,
                  paddingBottom: 4,
                }}
              >
                {/* 2nd place */}
                <PodiumCard user={top3[1]} place={2} />
                {/* 1st place — elevated via marginBottom in parent */}
                <div style={{ marginBottom: 24 }}>
                  <PodiumCard user={top3[0]} place={1} />
                </div>
                {/* 3rd place */}
                <PodiumCard user={top3[2]} place={3} />
              </div>
 
              {/* Table */}
              <LeaderboardTable users={filteredUsers} />
 
              {/* Stats footer */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 14,
                  marginTop: 24,
                }}
              >
                {[
                  {
                    icon: "🏆",
                    value: topScore.toLocaleString(),
                    label: "Top Score",
                    bg: "rgba(237,233,254,0.7)",
                    iconBg: "#6366f1",
                    border: "rgba(139,92,246,0.18)",
                  },
                  {
                    icon: "🎖️",
                    value: totalBadges,
                    label: "Total Badges",
                    bg: "rgba(220,252,231,0.7)",
                    iconBg: "#10b981",
                    border: "rgba(16,185,129,0.18)",
                  },
                  {
                    icon: "📈",
                    value: "+23%",
                    label: "From Last Month",
                    bg: "rgba(254,249,195,0.7)",
                    iconBg: "#f59e0b",
                    border: "rgba(245,158,11,0.18)",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      background: stat.bg,
                      border: `1.5px solid ${stat.border}`,
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      borderRadius: 14,
                      padding: "18px 22px",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 11,
                        background: stat.iconBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 19,
                        flexShrink: 0,
                      }}
                    >
                      {stat.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 21,
                          fontWeight: 800,
                          color: "#111827",
                          letterSpacing: "-0.5px",
                          fontFamily: "'Geist', 'DM Sans', sans-serif",
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#9ca3af",
                          marginTop: 2,
                          fontWeight: 500,
                          fontFamily: "'Geist', 'DM Sans', sans-serif",
                        }}
                      >
                        {stat.label}
                      </div>
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