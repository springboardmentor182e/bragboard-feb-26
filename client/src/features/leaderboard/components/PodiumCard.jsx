export default function PodiumCard({ user, place }) {
  const rankConfig = {
    1: {
      gradient: "from-yellow-400 to-yellow-500",
      badge: "bg-yellow-600 text-white",
      hoverGlow: "hover:shadow-yellow-400/70",
      height: "h-[360px]",
    },
    2: {
      gradient: "from-gray-300 to-gray-400",
      badge: "bg-gray-700 text-white",
      hoverGlow: "hover:shadow-gray-400/70",
      height: "h-[300px]",
    },
    3: {
      gradient: "from-orange-400 to-orange-500",
      badge: "bg-orange-600 text-white",
      hoverGlow: "hover:shadow-orange-400/70",
      height: "h-[300px]",
    },
  };

  const departmentStyles = {
    Design: "bg-blue-500/20 text-blue-900",
    Engineering: "bg-purple-500/20 text-purple-900",
    Marketing: "bg-green-500/20 text-green-900",
  };

  const current = rankConfig[place];
  const deptStyle =
    departmentStyles[user.department] ||
    "bg-white/30 text-gray-800";

  return (
    <div
      className={`
        relative w-full sm:w-72
        ${current.height}
        p-6 rounded-3xl text-center
        bg-gradient-to-br ${current.gradient}
        shadow-xl transition-all duration-300
        hover:-translate-y-3 hover:scale-105
        hover:shadow-2xl ${current.hoverGlow}
        flex flex-col items-center justify-center
      `}
    >
      {/* Rank Badge */}
      <div
        className={`
          absolute top-4 right-4
          px-4 py-1 rounded-full
          text-sm font-bold
          shadow-md
          ${current.badge}
        `}
      >
        #{place}
      </div>

      {/* Profile Image */}
      <img
        src={`http://127.0.0.1:8000${user.photo_url}`}
        alt={user.name}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-4 shadow-lg border-4 border-white transition duration-300"
      />

      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
        {user.name}
      </h2>

      <span
        className={`
          mt-3 px-4 py-1
          text-xs sm:text-sm
          rounded-full font-medium
          backdrop-blur-md
          ${deptStyle}
        `}
      >
        {user.department}
      </span>

      <p className="mt-5 text-3xl font-bold text-gray-900">
        {user.points}
      </p>
      <p className="text-sm text-gray-700">points</p>
    </div>
  );
}