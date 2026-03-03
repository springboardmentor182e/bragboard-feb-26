export default function LeaderboardTable({ users }) {
  const departmentStyles = {
    Design: "bg-blue-100 text-blue-600",
    Engineering: "bg-purple-100 text-purple-600",
    Marketing: "bg-green-100 text-green-600",
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm border-b">
            <th className="py-3">Rank</th>
            <th>Employee</th>
            <th>Department</th>
            <th className="text-right">Points</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => {
            const deptStyle =
              departmentStyles[user.department] ||
              "bg-gray-100 text-gray-600";

            return (
              <tr
                key={user.id}
                className="border-b transition duration-200 hover:bg-gray-50 hover:shadow-sm"
              >
                <td className="py-4 font-medium text-gray-700">
                  #{index + 4}
                </td>

                <td className="flex items-center gap-3 py-4">
                  <img
                    src={`http://127.0.0.1:8000${user.photo_url}`}
                    alt={user.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <span className="font-medium text-gray-800 text-sm sm:text-base">
                    {user.name}
                  </span>
                </td>
                <td className="flex gap-2">
  <span>🏆 {user.badges?.gold || 0}</span>
  <span>⭐ {user.badges?.silver || 0}</span>
  <span>🔥 {user.badges?.bronze || 0}</span>
</td>

                <td>
                  <span
                    className={`
                      px-2 sm:px-3 py-1
                      text-xs sm:text-sm
                      rounded-full font-medium
                      transition-all duration-200
                      hover:scale-105
                      ${deptStyle}
                    `}
                  >
                    {user.department}
                  </span>
                </td>

                <td className="text-right font-semibold text-blue-600 text-sm sm:text-base">
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