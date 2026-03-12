export default function LeaderboardTable({ users }) {
  const departmentStyles = {
    Design: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300",
    Engineering:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300",
    Marketing:
      "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300",
  };

  return (
   <div
  className="
  overflow-x-auto
  bg-orange-50
  rounded-2xl
  dark:bg-slate-800
  transition
  "
>
      <table className="w-full text-left table-auto">
        {/* Header */}
        <thead>
          <tr
            className="
            text-orange-700
            dark:text-gray-400
            text-sm
            border-b
            border-orange-200
            dark:border-slate-700
            "
          >
            <th className="py-3">Rank</th>
            <th>Employee</th>
            <th className="text-center">Badges</th>
            <th className="text-center">Department</th>
            <th className="text-right">Points</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => {
            const deptStyle =
              departmentStyles[user.department] ||
              "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";

            return (
              <tr
                key={user.id}
                className="
                border-b
                border-orange-200
                dark:border-slate-700
                transition
                duration-200
                hover:bg-orange-100
                dark:hover:bg-slate-700
                "
              >
                {/* Rank */}
                <td className="py-4 font-medium text-gray-700 dark:text-gray-300">
                  #{index + 4}
                </td>

                {/* Employee */}
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`http://127.0.0.1:8000${user.photo_url}`}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover transition-transform duration-300 hover:scale-110"
                    />

                    <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                      {user.name}
                    </span>
                  </div>
                </td>

                {/* Badges */}
                <td className="text-center text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex justify-center gap-3">
                    <span>🏆 {user.badges?.gold || 0}</span>
                    <span>⭐ {user.badges?.silver || 0}</span>
                    <span>🔥 {user.badges?.bronze || 0}</span>
                  </div>
                </td>

                {/* Department */}
                <td className="text-center">
                  <span
                    className={`px-3 py-1 text-xs sm:text-sm rounded-full font-medium ${deptStyle}`}
                  >
                    {user.department}
                  </span>
                </td>

                {/* Points */}
                <td className="text-right font-semibold text-blue-600 dark:text-blue-400 text-sm sm:text-base">
                  {user.points}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}