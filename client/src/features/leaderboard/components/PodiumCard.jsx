export default function PodiumCard({ user, place }) {
  if (!user) return null;

  // ===== RANK CONFIG =====
  const rankConfig = {
    1: {
      gradient: "from-yellow-300 via-amber-300 to-yellow-400",
      badge: "bg-yellow-500 text-white",
      glow: "shadow-[0_0_40px_rgba(255,215,0,0.4)]",
      hoverGlow: "hover:shadow-[0_0_60px_rgba(255,215,0,0.7)]",
      height: "h-[360px]",
      crown: true,
    },
    2: {
      gradient: "from-gray-300 via-gray-400 to-gray-500",
      badge: "bg-gray-700 text-white",
      glow: "shadow-[0_0_30px_rgba(180,180,180,0.4)]",
      hoverGlow: "hover:shadow-[0_0_50px_rgba(200,200,200,0.6)]",
      height: "h-[300px]",
    },
    3: {
      gradient: "from-orange-400 via-amber-500 to-yellow-600",
      badge: "bg-amber-700 text-white",
      glow: "shadow-[0_0_30px_rgba(205,127,50,0.4)]",
      hoverGlow: "hover:shadow-[0_0_50px_rgba(255,140,0,0.6)]",
      height: "h-[300px]",
    },
  };

  const current = rankConfig[place];

  // ===== NAME =====
  const displayName =
    user.full_name || user.username || "User";

  // ===== FIXED INITIALS (2 LETTERS) =====
  const words = displayName.trim().split(" ");

  let initials = "";

  if (words.length > 1) {
    initials = words[0][0] + words[1][0];
  } else {
    initials = words[0].substring(0, 2);
  }

  initials = initials.toUpperCase();

  // ===== POINTS =====
  const points =
    user.points ??
    (place === 1 ? 1500 : place === 2 ? 1000 : 800);

  return (
    <div
      className={`
        relative w-full sm:w-72
        ${current.height}
        p-6 rounded-3xl text-center

        bg-gradient-to-br ${current.gradient}
        backdrop-blur-lg border border-white/30

        ${current.glow}
        ${current.hoverGlow}

        transition-all duration-500
        hover:-translate-y-4 hover:scale-105

        flex flex-col items-center justify-center gap-4
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

      {/* Crown for #1 */}
      {/* Crown for #1 */}
{current.crown && (
  <div
    className="
      absolute
      left-1/2 -translate-x-1/2
      top-[7px]   
      text-2xl
      z-20
      crown-float
    "
  >
    👑
  </div>
)}

      {/* ===== INITIALS AVATAR ===== */}
      <div
        className="
          w-20 h-20 sm:w-24 sm:h-24
          rounded-full
          flex items-center justify-center

          bg-white/80 backdrop-blur-xl
          border border-white/50

          text-gray-900 text-2xl font-bold

          shadow-[0_0_25px_rgba(255,255,255,0.6)]
        "
      >
        {initials}
      </div>

      {/* Name */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
        {displayName}
      </h2>

      {/* Department (soft glass beige) */}
      <span
        className="
          px-4 py-1 rounded-full text-xs sm:text-sm font-semibold
          bg-amber-100/60 backdrop-blur-md
          border border-amber-200/50
          text-amber-900
          shadow-sm
        "
      >
        {user.department?.toUpperCase() || "N/A"}
      </span>

      {/* Points */}
      <div
        className="
          mt-3 px-4 py-2 rounded-xl
          bg-gradient-to-r from-pink-200/30 via-orange-200/30 to-yellow-200/30
          backdrop-blur-md
          border border-white/30
          shadow-sm
        "
      >
        <p className="text-[10px] text-gray-600">Points</p>
        <p className="text-lg font-bold text-gray-900">
          {points}
        </p>
      </div>
    </div>
  );
}