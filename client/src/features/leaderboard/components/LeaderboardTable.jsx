export default function LeaderboardTable({ users, startRank = 1, darkMode }) {

  // ===== GLASS DEPARTMENT STYLE =====
  const getDeptStyle = (dept) => {

    // 🌙 DARK MODE (bright glass colors)
    if (darkMode) {
      switch (dept) {
        case "Design":
          return "bg-pink-500/20 text-pink-300 border border-pink-400/30 backdrop-blur-md";
        case "Engineering":
          return "bg-purple-500/20 text-purple-300 border border-purple-400/30 backdrop-blur-md";
        case "Marketing":
          return "bg-orange-500/20 text-orange-300 border border-orange-400/30 backdrop-blur-md";
        default:
          return "bg-gray-500/20 text-gray-300 border border-gray-400/30 backdrop-blur-md";
      }
    }

    // ☀️ LIGHT MODE (soft glass colors)
    switch (dept) {
      case "Design":
        return "bg-pink-200/40 text-pink-700 border border-pink-300/40 backdrop-blur-md";
      case "Engineering":
        return "bg-purple-200/40 text-purple-700 border border-purple-300/40 backdrop-blur-md";
      case "Marketing":
        return "bg-orange-200/40 text-orange-700 border border-orange-300/40 backdrop-blur-md";
      default:
        return "bg-gray-200/40 text-gray-700 border border-gray-300/40 backdrop-blur-md";
    }
  };

  return (
    <div className="overflow-x-auto">

      <table className="w-full text-left">

        {/* ===== HEADER ===== */}
        <thead>
          <tr
            className={`text-sm border-b ${
              darkMode
                ? "text-white border-slate-600"
                : "text-orange-600 border-orange-100"
            }`}
          >
            <th className="py-3">Rank</th>
            <th>Employee</th>
            <th>Department</th>
            <th className="text-right">Points</th>
          </tr>
        </thead>

        {/* ===== BODY ===== */}
        <tbody>
          {users.map((user, index) => {

            const displayName =
              (user.full_name && user.full_name.trim()) ||
              user.name ||
              user.username ||
              "No Name";

            return (
              <tr
                key={user.id || index}
                className={`border-b transition ${
                  darkMode
                    ? "border-slate-700 hover:bg-slate-700/40"
                    : "border-orange-100 hover:bg-orange-50"
                }`}
              >

                {/* Rank */}
                <td
                  className={`py-4 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  #{startRank + index}
                </td>

                {/* Employee */}
                <td className="flex items-center gap-3 py-4">

                  <img
                    src={
                      user.photo_url
                        ? `http://127.0.0.1:8000${user.photo_url}`
                        : "/default-avatar.png"
                    }
                    alt={displayName}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  />

                  <span
                    className={`font-semibold text-sm sm:text-base ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {displayName}
                  </span>

                </td>

                {/* Department (GLASS STYLE 🔥) */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getDeptStyle(
                      user.department
                    )}`}
                  >
                    {user.department || "N/A"}
                  </span>
                </td>

                {/* Points */}
                <td
                  className={`text-right font-semibold text-sm sm:text-base ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {user.points ?? 0}
                </td>

              </tr>
            );
          })}
        </tbody>

      </table>

    </div>
  );
}