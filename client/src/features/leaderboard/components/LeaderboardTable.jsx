export default function LeaderboardTable({ users = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">

        {/* ===== HEADER ===== */}
        <thead>
          <tr className="text-left text-orange-500 text-sm font-semibold">
            <th className="p-4">Rank</th>
            <th className="p-4">Employee</th>
            <th className="p-4">Department</th>
            <th className="p-4">Points</th>
            <th className="p-4 text-center">Badges</th>
          </tr>
        </thead>

        {/* ===== BODY ===== */}
        <tbody>
          {users.map((user, index) => {
            const rank = user.rank || index + 1;

            return (
              <tr
                key={user.id || index}
                className={`
                  transition-all duration-300

                  ${
                    rank === 1
                      ? "bg-yellow-50/70"
                      : "hover:bg-orange-50/60"
                  }

                  hover:shadow-sm hover:-translate-y-[2px]
                `}
              >

                {/* ===== RANK ===== */}
                <td className="p-4 font-medium text-gray-600">
                  #{rank}
                </td>

                {/* ===== EMPLOYEE ===== */}
                <td className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                    {(user.full_name || user.username || "U")
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>

                  <span className="font-medium text-gray-800">
                    {user.full_name || user.username}
                  </span>
                </td>

                {/* ===== DEPARTMENT ===== */}
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-600">
                    {user.department?.toUpperCase()}
                  </span>
                </td>

                {/* ===== POINTS ===== */}
                <td className="p-4 font-semibold text-blue-600">
                  {user.points}
                </td>

                {/* ===== BADGES ===== */}
                <td className="p-4 flex items-center justify-center gap-4 text-sm">

                  <div className="flex items-center gap-1 text-yellow-500">
                    🤝 <span className="text-gray-700">{user.likes || 0}</span>
                  </div>

                  <div className="flex items-center gap-1 text-yellow-500">
                    ⭐ <span className="text-gray-700">{user.stars || 0}</span>
                  </div>

                  <div className="flex items-center gap-1 text-yellow-500">
                    💪 <span className="text-gray-700">{user.strength || 0}</span>
                  </div>

                </td>

              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
}