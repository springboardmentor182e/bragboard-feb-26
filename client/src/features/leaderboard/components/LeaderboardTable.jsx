const DEPT_STYLES = {
  design:        { bg: "#fef3c7", color: "#92400e" },
  engineering:   { bg: "#ede9fe", color: "#4c1d95" },
  marketing:     { bg: "#fce7f3", color: "#9d174d" },
  hr:            { bg: "#d1fae5", color: "#065f46" },
  product:       { bg: "#fce7f3", color: "#9d174d" },
  "data & analytics": { bg: "#e0f2fe", color: "#0c4a6e" },
  "customer success": { bg: "#dcfce7", color: "#14532d" },
};

function getDeptStyle(dept) {
  return DEPT_STYLES[(dept || "").toLowerCase()] || { bg: "#f3f4f6", color: "#374151" };
}

const AVATAR_COLORS = [
  "#6366f1", "#8b5cf6", "#ec4899",
  "#10b981", "#f59e0b", "#3b82f6",
];

function Avatar({ name }) {
  const initials = (name || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
  const bg = AVATAR_COLORS[initials.charCodeAt(0) % AVATAR_COLORS.length];

  return (
    <div style={{
      width: 38, height: 38, borderRadius: "50%",
      background: bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: 14,
      flexShrink: 0,
      transition: "transform 0.2s",
    }}>
      {initials}
    </div>
  );
}

export default function LeaderboardTable({ users = [] }) {
  return (
    <>
      {/* ✅ Inject CSS for hover effects */}
      <style>{`
        .lb-row {
          transition: background 0.15s, box-shadow 0.15s, transform 0.15s;
          cursor: pointer;
        }
        .lb-row:hover {
          background: #f0f4ff !important;
          box-shadow: inset 4px 0 0 #6366f1;
          transform: translateX(2px);
        }
        .lb-row:hover .lb-avatar {
          transform: scale(1.15);
        }
        .lb-row:hover .lb-name {
          color: #6366f1 !important;
        }
        .lb-row:hover .lb-points {
          transform: scale(1.08);
        }
        .lb-row:hover .lb-badge {
          transform: scale(1.15);
        }
        .lb-avatar {
          transition: transform 0.2s;
        }
        .lb-name {
          transition: color 0.2s;
        }
        .lb-points {
          display: inline-block;
          transition: transform 0.2s;
        }
        .lb-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: transform 0.2s;
        }
      `}</style>

      <div style={{
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>

          {/* Header */}
          <thead>
            <tr style={{ borderBottom: "2px solid #f3f4f6", background: "#fafafa" }}>
              {["Rank", "Employee", "Department", "Points", "Badges"].map((h) => (
                <th key={h} style={{
                  padding: "14px 20px",
                  textAlign: "left",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#6b7280",
                  letterSpacing: "0.02em",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => {
                const rank = index + 1;
                const name = (user.full_name || user.username || "Unknown").toUpperCase();
                const dept = getDeptStyle(user.department);
                const isTop3 = rank <= 3;

                return (
                  <tr
                    key={user.id || index}
                    className="lb-row"
                    style={{
                      background: isTop3 ? "#fafafa" : "#fff",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    {/* Rank */}
                    <td style={{ padding: "14px 20px", width: 80 }}>
                      <span style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: rank === 1 ? "#f59e0b"
                             : rank === 2 ? "#9ca3af"
                             : rank === 3 ? "#fb923c"
                             : "#374151",
                      }}>
                        #{rank}
                      </span>
                    </td>

                    {/* Employee */}
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div className="lb-avatar">
                          <Avatar name={name} />
                        </div>
                        <span className="lb-name" style={{
                          fontWeight: 600, fontSize: 14, color: "#111827"
                        }}>
                          {name}
                        </span>
                      </div>
                    </td>

                    {/* Department */}
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{
                        background: dept.bg,
                        color: dept.color,
                        borderRadius: 20,
                        padding: "4px 12px",
                        fontSize: 12,
                        fontWeight: 500,
                      }}>
                         {(user.department || "N/A").toUpperCase()}                      </span>
                    </td>

                    {/* Points */}
                    <td style={{ padding: "14px 20px" }}>
                      <span className="lb-points" style={{
                        fontWeight: 700, fontSize: 15, color: "#6366f1",
                      }}>
                        {(user.points ?? 0).toLocaleString()}
                      </span>
                    </td>

                    {/* Badges */}
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <span className="lb-badge" style={{ fontSize: 13, color: "#374151" }}>
                          🔥 <strong>{user.fire_badges ?? 0}</strong>
                        </span>
                        <span className="lb-badge" style={{ fontSize: 13, color: "#374151" }}>
                          ⭐ <strong>{user.star_badges ?? 0}</strong>
                        </span>
                        <span className="lb-badge" style={{ fontSize: 13, color: "#374151" }}>
                          👍 <strong>{user.thumb_badges ?? 0}</strong>
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} style={{
                  textAlign: "center", padding: 40,
                  color: "#9ca3af", fontSize: 14
                }}>
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