export default function Rankings({ leaders }) {

  const deptColors = {
    Engineering: "bg-blue-100 text-blue-600",
    Marketing: "bg-yellow-100 text-yellow-700",
    Sales: "bg-green-100 text-green-700",
    HR: "bg-pink-100 text-pink-600",
    Design: "bg-purple-100 text-purple-600"
  }

  return (

    <div className="bg-white rounded-xl p-6 shadow-sm">

      <h2 className="text-xl font-semibold mb-6">
        Full Rankings
      </h2>

      <table className="w-full">

        <thead className="text-gray-500 text-sm">

          <tr className="border-b">

            <th className="text-left py-3">Rank</th>
            <th className="text-left">Employee</th>
            <th className="text-left">Department</th>
            <th className="text-left">Points</th>
            <th className="text-left">Badges</th>
            <th className="text-left">Trend</th>

          </tr>

        </thead>

        <tbody>

          {leaders.slice(3).map((emp) => (

            <tr key={emp.id} className="border-b hover:bg-gray-50">

              {/* Rank */}

              <td className="py-5">

                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-semibold">

                  #{emp.rank}

                </div>

              </td>

              {/* Employee */}

              <td className="flex items-center gap-3 py-5">

                <img
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${emp.name}`}
                  alt="avatar"
                  className="w-10 h-10"
                />

                <span className="text-gray-800">
                  {emp.name}
                </span>

              </td>

              {/* Department */}

              <td>

                <span className={`px-3 py-1 text-xs rounded-full ${deptColors[emp.department]}`}>

                  {emp.department}

                </span>

              </td>

              {/* Points */}

              <td className="font-semibold text-gray-900">

                {emp.points.toLocaleString()}

              </td>

              {/* Badges */}

              <td>

                {emp.badges} 🏆

              </td>

              {/* Trend */}

              <td>

                {emp.trend === "up" ? (

                  <span className="text-green-600 font-medium">
                    ↗ Up
                  </span>

                ) : (

                  <span className="text-red-500 font-medium">
                    ↘ Down
                  </span>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}