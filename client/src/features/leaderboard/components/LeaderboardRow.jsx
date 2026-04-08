export default function LeaderboardRow({ user, index, startRank = 1 }) {

  console.log("ROW RENDER:", user); // DEBUG

  const rank = startRank + index;
  const displayName = user.full_name || user.username || "No Name";

  const initials = displayName
    .split(" ")
    .map(w => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const isTop = rank === 1;

  return (
    <tr
      className={`
        transition-all duration-300 rounded-xl

        ${isTop
          ? "bg-yellow-100/40 border-l-4 border-yellow-400"
          : "hover:bg-orange-50/50"
        }
      `}
    >

      {/* Rank */}
      <td className="px-3 py-3 font-semibold text-gray-600">
        #{rank}
      </td>

      {/* Employee */}
      <td className="px-3 py-3 flex items-center gap-3">
        <div className={`
          w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold
          ${isTop
            ? "bg-yellow-400 text-white"
            : "bg-indigo-200 text-indigo-700"
          }
        `}>
          {initials}
        </div>

        <span className="font-medium text-gray-800">
          {displayName}
        </span>
      </td>

      {/* Username */}
      <td className="px-3 py-3 text-purple-600">
        @{user.username || "-"}
      </td>

      {/* Email */}
      <td className="px-3 py-3 text-gray-500 text-sm">
        {user.email || "-"}
      </td>

      {/* Department */}
      <td className="px-3 py-3">
        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded-full">
          {user.department?.toUpperCase() || "N/A"}
        </span>
      </td>

      {/* Points */}
      <td className={`px-3 py-3 text-right font-bold ${
        isTop ? "text-yellow-600" : "text-blue-600"
      }`}>
        {user.points ?? 0}
      </td>

    </tr>
  );
}