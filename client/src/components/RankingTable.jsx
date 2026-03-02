function RankingTable({ data }) {
  const deptColors = {
    Engineering: "bg-indigo-100 text-indigo-600",
    Marketing: "bg-yellow-100 text-yellow-700",
    Design: "bg-purple-100 text-purple-600",
    Product: "bg-blue-100 text-blue-600",
    HR: "bg-pink-100 text-pink-600",
  };

  return (
    <div className="bg-[#F3F4F6] rounded-3xl p-8 mt-14">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Full Rankings
      </h2>

      <div className="bg-white rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-4 font-medium">Rank</th>
              <th className="text-left px-6 py-4 font-medium">Employee</th>
              <th className="text-left px-6 py-4 font-medium">Department</th>
              <th className="text-left px-6 py-4 font-medium">Points</th>
              <th className="text-left px-6 py-4 font-medium">Badges</th>
              <th className="text-left px-6 py-4 font-medium">Trend</th>
            </tr>
          </thead>

          <tbody>
            {data.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-100"
              >
                <td className="px-6 py-4 text-gray-700 font-medium">
                  #{user.rank}
                </td>

                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-gray-900">
                    {user.name}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${deptColors[user.department]}`}
                  >
                    {user.department}
                  </span>
                </td>

                <td className="px-6 py-4 font-semibold text-purple-600">
                  {user.points?.toLocaleString()}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  🏆 {user.badges}
                </td>

                <td
                  className={`px-6 py-4 font-medium ${
                    user.trend === "up"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {user.trend === "up" ? "↑ Up" : "↓ Down"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RankingTable;