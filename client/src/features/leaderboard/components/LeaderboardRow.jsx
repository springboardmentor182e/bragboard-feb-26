export default function LeaderboardRow({ user, index, startRank = 1 }) {

  const displayName = user.full_name || user.username || "No Name";

  const words = displayName.trim().split(" ");
  let initials = "";

  if (words.length > 1) {
    initials = words[0][0] + words[1][0];
  } else {
    initials = words[0].substring(0, 2);
  }

  initials = initials.toUpperCase();

  // 🥇 TOP USER CHECK
  const isTop = (startRank + index) === 1;

  return (
    <tr
      className={`
        transition-all duration-500 ease-in-out

        ${isTop ? `
          bg-gradient-to-r from-yellow-200/20 via-amber-200/20 to-yellow-100/20
          border-l-4 border-yellow-400
          shadow-[0_0_15px_rgba(255,215,0,0.25)]
        ` : ""}

        ${!isTop ? `
          hover:bg-[#82c2df]/20
          hover:shadow-[0_0_25px_rgba(130,194,223,0.4)]
        ` : ""}

        hover:scale-[1.01]
        cursor-pointer
      `}
    >

      {/* Rank */}
      <td className={`py-4 px-2 ${isTop ? "text-yellow-700 font-bold" : "text-gray-600"}`}>
        #{startRank + index}
      </td>

      {/* Employee */}
      <td className="flex items-center gap-3 py-4 px-2">
        <div className={`
          w-10 h-10 rounded-full flex items-center justify-center
          text-sm font-bold shadow-md

          ${isTop
            ? "bg-gradient-to-br from-yellow-300 to-amber-400 text-yellow-900"
            : "bg-gradient-to-br from-indigo-200 to-purple-200 text-indigo-700"
          }
        `}>
          {initials}
        </div>

        <span className={`font-semibold ${isTop ? "text-yellow-900" : "text-gray-800"}`}>
          {displayName}
        </span>
      </td>

      {/* Username */}
      <td className="px-2">
        <span className="
          px-3 py-1 rounded-lg text-xs font-semibold
          bg-purple-100 text-purple-700 border border-purple-200
          transition-all duration-300
          hover:scale-105 hover:shadow-[0_0_12px_rgba(168,85,247,0.5)]
        ">
          @{user.username || "unknown"}
        </span>
      </td>

      {/* Email */}
      <td className="px-2">
        <span className="
          px-3 py-1.5 rounded-xl text-xs font-medium
          bg-gradient-to-r from-orange-200/70 via-rose-200/60 to-amber-200/70
          text-orange-900
          border border-white/30
          backdrop-blur-xl
          shadow-[0_4px_12px_rgba(251,146,60,0.3)]
          transition-all duration-300
          hover:scale-105 hover:shadow-[0_0_15px_rgba(251,146,60,0.5)]
        ">
          {user.email || "-"}
        </span>
      </td>

      {/* Department */}
      <td className="px-2">
        <span className="
          px-3 py-1.5 rounded-full text-xs font-semibold
          bg-gradient-to-r from-amber-100/70 via-orange-100/60 to-yellow-100/70
          text-amber-900
          border border-white/30
          backdrop-blur-xl
          shadow-[0_4px_12px_rgba(245,158,11,0.25)]
        ">
          {user.department?.toUpperCase() || "N/A"}
        </span>
      </td>

      {/* Points */}
      <td className={`text-right px-2 font-bold ${isTop ? "text-yellow-700" : "text-blue-600"}`}>
        {user.points ?? 0}
      </td>

    </tr>
  );
}