function TopPerformerCard({ user, rank }) {
  const isCenter = rank === 1;

  const cardBg = isCenter
    ? "bg-[#F7F3E7]"
    : "bg-[#E5E7EB]";

  const medalColor =
    rank === 1
      ? "bg-yellow-500"
      : rank === 2
      ? "bg-gray-400"
      : "bg-orange-400";

  const deptColors = {
    Engineering: "bg-indigo-100 text-indigo-600",
    Marketing: "bg-yellow-100 text-yellow-700",
    Design: "bg-purple-100 text-purple-600",
    Product: "bg-blue-100 text-blue-600",
    HR: "bg-pink-100 text-pink-600",
  };

  return (
    <div className={`relative ${cardBg} w-72 rounded-2xl p-8 text-center`}>

      {/* Medal Icon */}
      <div
        className={`absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg ${medalColor}`}
      >
        🏆
      </div>

      <h3 className="mt-6 font-semibold text-gray-900">
        {user.name}
      </h3>

      <p className="text-2xl font-bold text-purple-600 mt-2">
        {user.points?.toLocaleString()}
      </p>

      <span
        className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${deptColors[user.department]}`}
      >
        {user.department}
      </span>

      <p className="text-sm text-gray-600 mt-3">
        {user.badges} badges
      </p>
    </div>
  );
}

export default TopPerformerCard;