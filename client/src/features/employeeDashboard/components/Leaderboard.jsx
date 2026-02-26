const Leaderboard = () => {
  const users = [
    { name: "Rahul Sharma", points: 3200 },
    { name: "Satyam Dubey", points: 2450 },
    { name: "Ananya Singh", points: 2100 },
    { name: "Vikas Patel", points: 1800 },
  ];

  const getRankStyle = (index) => {
    switch (index) {
      case 0:
        return "text-yellow-500"; // Gold
      case 1:
        return "text-gray-400"; // Silver
      case 2:
        return "text-amber-600"; // Bronze
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow dark:shadow-gray-900/40 p-6 transition-all duration-300">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Leaderboard
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Top Performers
        </span>
      </div>

      <ul className="space-y-3">
        {users.map((user, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-4 rounded-xl transition-all duration-200 ${
              user.name === "Satyam Dubey"
                ? "bg-indigo-50 border border-indigo-200 dark:bg-indigo-900/40 dark:border-indigo-700"
                : "hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <div className="flex items-center gap-4">
              
              <span
                className={`text-sm font-bold ${getRankStyle(index)}`}
              >
                #{index + 1}
              </span>

              <div className="flex flex-col">
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  {user.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Employee
                </span>
              </div>
            </div>

            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {user.points} pts
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;