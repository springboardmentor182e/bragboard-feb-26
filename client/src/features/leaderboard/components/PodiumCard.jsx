export default function PodiumCard({ user, place }) {

  if (!user) return null;

  // ===== RANK CONFIG =====
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

  // ===== GLASS + GRADIENT DEPARTMENT STYLE =====
  const getDeptStyle = (dept) => {
    switch (dept) {
      case "Design":
        return "bg-gradient-to-r from-pink-400/30 via-purple-400/30 to-indigo-400/30 text-purple-900 border border-white/40 backdrop-blur-md shadow-md";

      case "Engineering":
        return "bg-gradient-to-r from-purple-400/30 via-blue-400/30 to-cyan-400/30 text-blue-900 border border-white/40 backdrop-blur-md shadow-md";

      case "Marketing":
        return "bg-gradient-to-r from-orange-400/30 via-yellow-400/30 to-red-400/30 text-orange-900 border border-white/40 backdrop-blur-md shadow-md";

      default:
        return "bg-gradient-to-r from-gray-300/30 to-gray-400/30 text-gray-800 border border-white/40 backdrop-blur-md";
    }
  };

  const current = rankConfig[place];

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
        src={
          user.photo_url
            ? `http://127.0.0.1:8000${user.photo_url}`
            : "/default-avatar.png"
        }
        alt={user.full_name}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-4 shadow-lg border-2 border-white/40"
      />

      {/* Employee Name */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
        {user.full_name}
      </h2>

      {/* Department (GLASS + GRADIENT 🔥) */}
      <span
        className={`
          mt-3 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold
          transition-all duration-300 hover:scale-105
          ${getDeptStyle(user.department)}
        `}
      >
        {user.department}
      </span>

      {/* Points */}
      <p className="mt-5 text-3xl font-bold text-gray-900">
        {user.points}
      </p>
      <p className="text-sm text-gray-700">points</p>

    </div>
  );
}