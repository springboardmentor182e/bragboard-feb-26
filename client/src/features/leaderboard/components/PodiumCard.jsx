export default function PodiumCard({ user, place }) {
  if (!user) return null;

  const displayName = user.full_name || user.username || "No Name";

  const initials = displayName
    .split(" ")
    .map(w => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  // 🎨 COLORS BASED ON PLACE
  const styles = {
    1: {
      bg: "bg-yellow-400",
      text: "text-yellow-900",
      height: "h-32",
      label: "🥇 1st",
    },
    2: {
      bg: "bg-gray-300",
      text: "text-gray-800",
      height: "h-24",
      label: "🥈 2nd",
    },
    3: {
      bg: "bg-orange-300",
      text: "text-orange-900",
      height: "h-20",
      label: "🥉 3rd",
    },
  };

  const current = styles[place] || styles[3];

  return (
    <div className="flex flex-col items-center">

      {/* 👤 Avatar */}
      <div className={`
        w-14 h-14 rounded-full flex items-center justify-center
        text-white font-bold text-lg shadow-md mb-2
        ${current.bg}
      `}>
        {initials}
      </div>

      {/* 🧑 Name */}
      <div className="text-sm font-semibold text-gray-800 text-center">
        {displayName}
      </div>

      {/* 🏢 Department */}
      <div className="text-xs text-gray-500 mb-2">
        {user.department || "N/A"}
      </div>

      {/* 🏆 PODIUM BLOCK */}
      <div className={`
        w-20 flex items-center justify-center rounded-t-xl
        text-white font-bold text-sm shadow
        ${current.bg} ${current.height}
      `}>
        {current.label}
      </div>

      {/* ⭐ Points */}
      <div className="mt-2 text-sm font-bold text-blue-600">
        {user.points ?? 0} pts
      </div>

    </div>
  );
}