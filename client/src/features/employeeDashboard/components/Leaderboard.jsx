import Card from "../../../components/ui/Card";

const Leaderboard = () => {
  const users = [
    { name: "Rahul Sharma", points: 3200 },
    { name: "Satyam Dubey", points: 2450 },
    { name: "Ananya Singh", points: 2100 },
    { name: "Vikas Patel", points: 1800 },
  ];

  const getRankColor = (index) => {
    switch (index) {
      case 0:
        return "text-yellow-500"; // Gold
      case 1:
        return "text-gray-400"; // Silver
      case 2:
        return "text-amber-600"; // Bronze
      default:
        return "text-slate-500";
    }
  };

  return (
    <Card className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Leaderboard
        </h2>
        <span className="text-sm text-slate-500">
          Top Performers
        </span>
      </div>

      {/* List */}
      <ul className="space-y-4">
        {users.map((user, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-4 rounded-2xl transition-all duration-200 hover:bg-slate-50 ${
              user.name === "Satyam Dubey"
                ? "bg-indigo-50 border border-indigo-200"
                : ""
            }`}
          >
            {/* Left Section */}
            <div className="flex items-center gap-4">

              {/* Rank */}
              <span
                className={`text-sm font-bold ${getRankColor(index)}`}
              >
                #{index + 1}
              </span>

              {/* Avatar */}
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user.name.charAt(0)}
              </div>

              {/* Name */}
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800">
                  {user.name}
                </span>
                <span className="text-xs text-slate-500">
                  Employee
                </span>
              </div>
            </div>

            {/* Points */}
            <span className="font-semibold text-indigo-600">
              {user.points} pts
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default Leaderboard;