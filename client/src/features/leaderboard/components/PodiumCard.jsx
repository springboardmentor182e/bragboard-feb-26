export default function PodiumCard({ user, place }) {
  if (!user) return null;

  const displayName = user.full_name || user.username || "User";

  const words = displayName.trim().split(" ");
  let initials =
    words.length > 1
      ? words[0][0] + words[1][0]
      : words[0].substring(0, 2);

  initials = initials.toUpperCase();

  const points = user.points ?? 0;

  return (
    <div
      className={`
        relative w-[260px]
        ${place === 1 ? "h-[320px]" : "h-[280px]"}
        rounded-2xl p-6 text-center

        bg-white
        border ${
          place === 1
            ? "border-yellow-400"
            : place === 2
            ? "border-gray-300"
            : "border-orange-400"
        }

        shadow-sm hover:shadow-lg
        transition duration-300

        flex flex-col items-center justify-center
      `}
    >
      {/* TOP BADGE */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <div
          className={`
            w-9 h-9 rounded-full flex items-center justify-center text-white text-sm
            ${
              place === 1
                ? "bg-yellow-400"
                : place === 2
                ? "bg-gray-400"
                : "bg-orange-400"
            }
          `}
        >
          🏆
        </div>
      </div>

      {/* AVATAR */}
      <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
        {initials}
      </div>

      {/* NAME */}
      <h2 className="mt-4 font-semibold text-gray-800 text-lg">
        {displayName}
      </h2>

      {/* 🔥 GLASS PURPLE DEPARTMENT */}
      <span className="
        mt-2 px-3 py-1 text-xs rounded-full
        bg-purple-200/40 backdrop-blur-md
        border border-purple-300/40
        text-purple-700
      ">
        {user.department || "N/A"}
      </span>

      {/* POINTS */}
      <p className="mt-4 text-2xl font-bold text-blue-600">
        {points}
      </p>
      <p className="text-xs text-gray-400">points</p>
    </div>
  );
}