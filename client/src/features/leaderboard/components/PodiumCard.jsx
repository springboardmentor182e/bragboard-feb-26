import { useState } from "react";

export default function PodiumCard({ user, place }) {
  const [hovered, setHovered] = useState(false);

  if (!user) return null;

  const displayName = user.full_name || user.username || "No Name";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const config = {
    1: {
      border: "2px solid #f59e0b",
      trophyBg: "#f59e0b",
      trophy: "🏆",
      deptBg: "#fef3c7",
      deptColor: "#92400e",
      shadow: "0 4px 24px rgba(245,158,11,0.18)",
      hoverShadow: "0 12px 40px rgba(245,158,11,0.38)",
      hoverBorder: "2px solid #d97706",
      hoverBg: "#fffbeb",
    },
    2: {
      border: "2px solid #d1d5db",
      trophyBg: "#9ca3af",
      trophy: "🥈",
      deptBg: "#f3f4f6",
      deptColor: "#374151",
      shadow: "0 2px 12px rgba(0,0,0,0.07)",
      hoverShadow: "0 12px 36px rgba(156,163,175,0.35)",
      hoverBorder: "2px solid #9ca3af",
      hoverBg: "#f9fafb",
    },
    3: {
      border: "2px solid #fb923c",
      trophyBg: "#ea580c",
      trophy: "🎖️",
      deptBg: "#fff7ed",
      deptColor: "#9a3412",
      shadow: "0 2px 12px rgba(0,0,0,0.07)",
      hoverShadow: "0 12px 36px rgba(251,146,60,0.32)",
      hoverBorder: "2px solid #ea580c",
      hoverBg: "#fff7ed",
    },
  };

  const c = config[place] || config[3];
  const badges = [
    { icon: "🔥", count: user.fire_badges ?? 0 },
    { icon: "⭐", count: user.star_badges ?? 0 },
    { icon: "👍", count: user.thumb_badges ?? 0 },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      {/* Trophy bubble */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: c.trophyBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          marginBottom: -26,
          zIndex: 1,
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          transition: "transform 0.25s ease",
          transform: hovered ? "scale(1.12)" : "scale(1)",
        }}
      >
        {c.trophy}
      </div>

      {/* Card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? c.hoverBg : "#fff",
          border: hovered ? c.hoverBorder : c.border,
          borderRadius: 16,
          paddingTop: 38,
          paddingBottom: 20,
          paddingLeft: 24,
          paddingRight: 24,
          width: 196,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          boxShadow: hovered ? c.hoverShadow : c.shadow,
          transform: hovered ? "translateY(-8px) scale(1.03)" : "translateY(0) scale(1)",
          transition: "transform 0.25s ease, box-shadow 0.25s ease, border 0.2s ease, background 0.2s ease",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: "50%",
            background: "#6366f1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 24,
            border: "3px solid #fff",
            boxShadow: hovered
              ? "0 4px 16px rgba(99,102,241,0.4)"
              : "0 2px 10px rgba(99,102,241,0.25)",
            transition: "box-shadow 0.25s ease",
          }}
        >
          {initials}
        </div>

        {/* Name */}
        <div
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: "#111827",
            textAlign: "center",
            marginTop: 4,
          }}
        >
          {displayName}
        </div>

        {/* Department pill */}
        <div
          style={{
            background: c.deptBg,
            color: c.deptColor,
            borderRadius: 20,
            padding: "3px 12px",
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {user.department || "N/A"}
        </div>

        {/* Points */}
        <div style={{ textAlign: "center", marginTop: 4 }}>
          <div
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: "#6366f1",
              lineHeight: 1,
              transition: "transform 0.2s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          >
            {(user.points ?? 0).toLocaleString()}
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>points</div>
        </div>

        {/* Badge counts */}
        <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
          {badges.map((b, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
                {b.count}
              </span>
              <span style={{ fontSize: 18 }}>{b.icon}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}