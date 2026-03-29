const DEPT_GLASS = {
  design: {
    bg: "rgba(254, 243, 199, 0.6)",
    border: "rgba(251, 191, 36, 0.4)",
    color: "#92400e",
  },
  engineering: {
    bg: "rgba(237, 233, 254, 0.6)",
    border: "rgba(139, 92, 246, 0.35)",
    color: "#4c1d95",
  },
  marketing: {
    bg: "rgba(252, 231, 243, 0.6)",
    border: "rgba(236, 72, 153, 0.35)",
    color: "#9d174d",
  },
  hr: {
    bg: "rgba(209, 250, 229, 0.6)",
    border: "rgba(16, 185, 129, 0.35)",
    color: "#065f46",
  },
  product: {
    bg: "rgba(224, 242, 254, 0.6)",
    border: "rgba(59, 130, 246, 0.35)",
    color: "#1e40af",
  },
  "data & analytics": {
    bg: "rgba(224, 242, 254, 0.6)",
    border: "rgba(14, 165, 233, 0.35)",
    color: "#0c4a6e",
  },
  "customer success": {
    bg: "rgba(220, 252, 231, 0.6)",
    border: "rgba(34, 197, 94, 0.35)",
    color: "#14532d",
  },
};

function getDeptGlass(dept) {
  return (
    DEPT_GLASS[(dept || "").toLowerCase()] || {
      bg: "rgba(243, 244, 246, 0.6)",
      border: "rgba(156, 163, 175, 0.35)",
      color: "#374151",
    }
  );
}

const AVATAR_COLORS = [
  "linear-gradient(135deg, #6366f1, #818cf8)",
  "linear-gradient(135deg, #8b5cf6, #a78bfa)",
  "linear-gradient(135deg, #ec4899, #f472b6)",
  "linear-gradient(135deg, #10b981, #34d399)",
  "linear-gradient(135deg, #f59e0b, #fbbf24)",
  "linear-gradient(135deg, #3b82f6, #60a5fa)",
];

function Avatar({ name }) {
  const initials = (name || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
  const idx = initials.charCodeAt(0) % AVATAR_COLORS.length;
  const bg = AVATAR_COLORS[idx];

  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: 13,
        flexShrink: 0,
        letterSpacing: "-0.5px",
        fontFamily: "'Geist', sans-serif",
      }}
    >
      {initials}
    </div>
  );
}

const RANK_STYLES = {
  1: { color: "#f59e0b", bg: "rgba(254, 243, 199, 0.7)", border: "rgba(245,158,11,0.25)" },
  2: { color: "#9ca3af", bg: "rgba(243,244,246,0.7)", border: "rgba(156,163,175,0.25)" },
  3: { color: "#fb923c", bg: "rgba(255,247,237,0.7)", border: "rgba(251,146,60,0.25)" },
};

export default function LeaderboardTable({ users = [] }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap');

        .lb-row {
          transition: background 0.18s ease, transform 0.18s ease;
          cursor: pointer;
        }
        .lb-row:hover {
          background: rgba(99, 102, 241, 0.04) !important;
        }
        .lb-row:hover .lb-avatar-wrap {
          transform: scale(1.1);
        }
        .lb-row:hover .lb-name {
          color: #6366f1 !important;
        }
        .lb-row:hover .lb-points {
          transform: scale(1.06);
        }
        .lb-avatar-wrap {
          transition: transform 0.2s ease;
        }
        .lb-name {
          transition: color 0.18s ease;
        }
        .lb-points {
          display: inline-block;
          transition: transform 0.2s ease;
        }
      `}</style>

      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 1px 12px rgba(0,0,0,0.05)",
          fontFamily: "'Geist', sans-serif",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          {/* Header */}
          <thead>
            <tr
              style={{
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                background: "#fafafa",
              }}
            >
              {[
                { label: "Rank", width: 72 },
                { label: "Employee" },
                { label: "Department" },
                { label: "Points" },
                { label: "Badges" },
              ].map((h) => (
                <th
                  key={h.label}
                  style={{
                    padding: "13px 20px",
                    textAlign: "left",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#9ca3af",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    width: h.width || undefined,
                    fontFamily: "'Geist', sans-serif",
                  }}
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => {
                const rank = index + 1;
                const name = user.full_name || user.username || "Unknown";
                const dept = getDeptGlass(user.department);
                const rankStyle = RANK_STYLES[rank];

                return (
                  <tr
                    key={user.id || index}
                    className="lb-row"
                    style={{
                      background: "#fff",
                      borderBottom: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Rank */}
                    <td style={{ padding: "13px 20px" }}>
                      {rankStyle ? (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: rankStyle.bg,
                            border: `1px solid ${rankStyle.border}`,
                            fontWeight: 700,
                            fontSize: 12,
                            color: rankStyle.color,
                            letterSpacing: "-0.3px",
                            fontFamily: "'Geist', sans-serif",
                          }}
                        >
                          #{rank}
                        </span>
                      ) : (
                        <span
                          style={{
                            fontWeight: 500,
                            fontSize: 13,
                            color: "#9ca3af",
                            fontFamily: "'Geist', sans-serif",
                          }}
                        >
                          #{rank}
                        </span>
                      )}
                    </td>

                    {/* Employee */}
                    <td style={{ padding: "13px 20px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <div className="lb-avatar-wrap">
                          <Avatar name={name} />
                        </div>
                        <span
                          className="lb-name"
                          style={{
                            fontWeight: 600,
                            fontSize: 14,
                            color: "#111827",
                            letterSpacing: "-0.2px",
                            fontFamily: "'Geist', sans-serif",
                          }}
                        >
                          {name}
                        </span>
                      </div>
                    </td>

                    {/* Department — glassy pill */}
                    <td style={{ padding: "13px 20px" }}>
                      <span
                        style={{
                          background: dept.bg,
                          color: dept.color,
                          border: `1px solid ${dept.border}`,
                          backdropFilter: "blur(6px)",
                          WebkitBackdropFilter: "blur(6px)",
                          borderRadius: 30,
                          padding: "4px 12px",
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.5px",
                          textTransform: "uppercase",
                          display: "inline-block",
                          fontFamily: "'Geist', sans-serif",
                        }}
                      >
                        {user.department || "N/A"}
                      </span>
                    </td>

                    {/* Points */}
                    <td style={{ padding: "13px 20px" }}>
                      <span
                        className="lb-points"
                        style={{
                          fontWeight: 700,
                          fontSize: 15,
                          color: "#6366f1",
                          letterSpacing: "-0.5px",
                          fontFamily: "'Geist', sans-serif",
                        }}
                      >
                        {(user.points ?? 0).toLocaleString()}
                      </span>
                    </td>

                    {/* Badges */}
                    <td style={{ padding: "13px 20px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                        }}
                      >
                        {[
                          { icon: "🔥", count: user.fire_badges ?? 0 },
                          { icon: "⭐", count: user.star_badges ?? 0 },
                          { icon: "👍", count: user.thumb_badges ?? 0 },
                        ].map((b, i) => (
                          <span
                            key={i}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 13,
                              color: "#374151",
                              fontWeight: 600,
                              fontFamily: "'Geist', sans-serif",
                            }}
                          >
                            <span style={{ fontSize: 14 }}>{b.icon}</span>
                            {b.count}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    textAlign: "center",
                    padding: 48,
                    color: "#9ca3af",
                    fontSize: 14,
                    fontFamily: "'Geist', sans-serif",
                  }}
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}