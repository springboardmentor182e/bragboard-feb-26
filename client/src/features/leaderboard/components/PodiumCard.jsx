import { useState } from "react";

const DEPT_GLASS = {
  design: {
    bg: "rgba(254, 243, 199, 0.6)",
    border: "rgba(251, 191, 36, 0.45)",
    color: "#92400e",
  },
  engineering: {
    bg: "rgba(237, 233, 254, 0.6)",
    border: "rgba(139, 92, 246, 0.4)",
    color: "#4c1d95",
  },
  marketing: {
    bg: "rgba(252, 231, 243, 0.6)",
    border: "rgba(236, 72, 153, 0.4)",
    color: "#9d174d",
  },
  hr: {
    bg: "rgba(209, 250, 229, 0.6)",
    border: "rgba(16, 185, 129, 0.4)",
    color: "#065f46",
  },
  product: {
    bg: "rgba(224, 242, 254, 0.6)",
    border: "rgba(59, 130, 246, 0.4)",
    color: "#1e40af",
  },
  "data & analytics": {
    bg: "rgba(224, 242, 254, 0.6)",
    border: "rgba(14, 165, 233, 0.4)",
    color: "#0c4a6e",
  },
  "customer success": {
    bg: "rgba(220, 252, 231, 0.6)",
    border: "rgba(34, 197, 94, 0.4)",
    color: "#14532d",
  },
};

function getDeptGlass(dept) {
  return (
    DEPT_GLASS[(dept || "").toLowerCase()] || {
      bg: "rgba(243, 244, 246, 0.6)",
      border: "rgba(156, 163, 175, 0.4)",
      color: "#374151",
    }
  );
}

const PLACE_CONFIG = {
  1: {
    rankLabel: "#1",
    rankBg: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    rankShadow: "0 4px 14px rgba(245,158,11,0.5)",
    accentColor: "#d97706",
    pointsColor: "#b45309",
    cardBg: "#fef3c7",
    cardBgHover: "#fde68a",
    cardBorder: "rgba(245, 158, 11, 0.35)",
    shadow: "0 8px 32px rgba(245,158,11,0.18)",
    hoverShadow: "0 16px 48px rgba(245,158,11,0.28)",
    avatarBg: "linear-gradient(135deg, #fbbf24, #f59e0b)",
    avatarShadow: "rgba(245,158,11,0.45)",
    isFirst: true,
    avatarSize: 80,
    nameFontSize: 16,
    pointsFontSize: 36,
  },
  2: {
    rankLabel: "#2",
    rankBg: "linear-gradient(135deg, #6b7280, #9ca3af)",
    rankShadow: "0 4px 14px rgba(107,114,128,0.45)",
    accentColor: "#6b7280",
    pointsColor: "#4b5563",
    cardBg: "#e5e7eb",
    cardBgHover: "#d1d5db",
    cardBorder: "rgba(107, 114, 128, 0.25)",
    shadow: "0 4px 20px rgba(0,0,0,0.08)",
    hoverShadow: "0 12px 40px rgba(107,114,128,0.22)",
    avatarBg: "linear-gradient(135deg, #9ca3af, #6b7280)",
    avatarShadow: "rgba(107,114,128,0.4)",
    isFirst: false,
    avatarSize: 68,
    nameFontSize: 14,
    pointsFontSize: 28,
  },
  3: {
    rankLabel: "#3",
    rankBg: "linear-gradient(135deg, #ea580c, #fb923c)",
    rankShadow: "0 4px 14px rgba(234,88,12,0.5)",
    accentColor: "#ea580c",
    pointsColor: "#c2410c",
    cardBg: "#fed7aa",
    cardBgHover: "#fdba74",
    cardBorder: "rgba(234, 88, 12, 0.28)",
    shadow: "0 4px 20px rgba(234,88,12,0.12)",
    hoverShadow: "0 12px 40px rgba(234,88,12,0.22)",
    avatarBg: "linear-gradient(135deg, #fb923c, #ea580c)",
    avatarShadow: "rgba(234,88,12,0.4)",
    isFirst: false,
    avatarSize: 68,
    nameFontSize: 14,
    pointsFontSize: 28,
  },
};

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

  const c = PLACE_CONFIG[place] || PLACE_CONFIG[3];
  const deptStyle = getDeptGlass(user.department);

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
        position: "relative",
        // Push #2 and #3 down to create podium height difference
        marginTop: c.isFirst ? 0 : 28,
      }}
    >
      {/* Rank badge — floats above card with clear 10px gap, no overlap */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: c.rankBg,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 13,
          letterSpacing: "-0.5px",
          zIndex: 2,
          boxShadow: c.rankShadow,
          fontFamily: "'Geist', 'DM Sans', sans-serif",
          transition: "transform 0.25s ease",
          transform: hovered ? "scale(1.12) translateY(-3px)" : "scale(1)",
          marginBottom: 10,
          flexShrink: 0,
        }}
      >
        {c.rankLabel}
      </div>

      {/* Card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? c.cardBgHover : c.cardBg,
          border: `1.5px solid ${c.cardBorder}`,
          borderRadius: 22,
          paddingTop: 24,
          paddingBottom: 22,
          paddingLeft: 22,
          paddingRight: 22,
          width: c.isFirst ? 204 : 180,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          boxShadow: hovered ? c.hoverShadow : c.shadow,
          transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0)",
          transition:
            "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, background 0.2s ease",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: c.avatarSize,
            height: c.avatarSize,
            borderRadius: "50%",
            background: c.avatarBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: c.isFirst ? 28 : 22,
            letterSpacing: "-1px",
            boxShadow: hovered
              ? `0 8px 24px ${c.avatarShadow}`
              : `0 4px 14px ${c.avatarShadow}`,
            transition: "box-shadow 0.25s ease",
            fontFamily: "'Geist', 'DM Sans', sans-serif",
          }}
        >
          {initials}
        </div>

        {/* Name */}
        <div
          style={{
            fontWeight: 700,
            fontSize: c.nameFontSize,
            color: "#1f2937",
            textAlign: "center",
            letterSpacing: "-0.3px",
            lineHeight: 1.3,
            fontFamily: "'Geist', 'DM Sans', sans-serif",
            marginTop: 2,
          }}
        >
          {displayName}
        </div>

        {/* Department — glassy pill */}
        <div
          style={{
            background: deptStyle.bg,
            color: deptStyle.color,
            border: `1px solid ${deptStyle.border}`,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: 30,
            padding: "4px 13px",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.7px",
            textTransform: "uppercase",
            fontFamily: "'Geist', 'DM Sans', sans-serif",
          }}
        >
          {user.department || "N/A"}
        </div>

        {/* Points */}
        <div style={{ textAlign: "center", marginTop: 2 }}>
          <div
            style={{
              fontSize: c.pointsFontSize,
              fontWeight: 800,
              color: c.pointsColor,
              lineHeight: 1,
              letterSpacing: "-1.5px",
              fontFamily: "'Geist', 'DM Sans', sans-serif",
              transition: "transform 0.2s ease",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            {(user.points ?? 0).toLocaleString()}
          </div>
          <div
            style={{
              fontSize: 10,
              color: c.accentColor,
              marginTop: 4,
              fontWeight: 600,
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              fontFamily: "'Geist', 'DM Sans', sans-serif",
              opacity: 0.75,
            }}
          >
            points
          </div>
        </div>

        {/* Badge counts */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 4,
            padding: "8px 16px",
            background: "rgba(0,0,0,0.07)",
            borderRadius: 14,
            border: "1px solid rgba(0,0,0,0.07)",
          }}
        >
          {badges.map((b, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#374151",
                  fontFamily: "'Geist', 'DM Sans', sans-serif",
                  lineHeight: 1,
                }}
              >
                {b.count}
              </span>
              <span style={{ fontSize: 15 }}>{b.icon}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}