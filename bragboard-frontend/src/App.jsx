import React, { useEffect, useState } from "react";
import avatar from "./assets/avatar.png";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/leaderboard/")
      .then((res) => res.json())
      .then((data) => {
        
        setUsers(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Correct image builder
  const getImageUrl = (photoUrl) => {
  if (!photoUrl) return avatar;

  // If backend already sends full path
  if (photoUrl.startsWith("/media")) {
    return `http://127.0.0.1:8000${photoUrl}`;
  }

  // If backend sends only filename
  return `http://127.0.0.1:8000/media/users/${photoUrl}`;
};

  const PodiumCard = ({ user, rank }) => {
    const configs = {
      1: {
        size: "w-80 -translate-y-6",
        border: "border-4 border-yellow-400",
        medal: "👑",
      },
      2: {
        size: "w-72",
        border: "border-4 border-gray-400",
        medal: "🥈",
      },
      3: {
        size: "w-72",
        border: "border-4 border-orange-400",
        medal: "🥉",
      },
    };

    const cfg = configs[rank] || configs[1];

    return (
      <div className={`relative ${cfg.size}`}>
        <div
          className={`rounded-3xl bg-white p-8 text-center shadow-xl ${cfg.border}`}
        >
          <div className="text-3xl mb-4">{cfg.medal}</div>

          <img
            src={getImageUrl(user.photo_url)}
            alt="profile"
            className="w-24 h-24 mx-auto rounded-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = avatar;
            }}
          />

          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {user.name}
          </h2>

          <p className="text-gray-600 font-medium mb-3">
            {user.department}
          </p>

          <p className="text-xl font-bold text-blue-600">
            {user.points} pts
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-16">
      <h1 className="text-5xl font-bold text-center mb-20 text-gray-800">
        🏆 Employee Leaderboard
      </h1>

      {users.length >= 1 && (
        <div className="flex justify-center mb-24">
          <PodiumCard user={users[0]} rank={1} />
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-4">Rank</th>
              <th className="p-4">Employee</th>
              <th className="p-4">Department</th>
              <th className="p-4">Points</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                <td className="p-4 font-bold text-gray-700">
                  #{index + 1}
                </td>

                <td className="p-4 flex items-center gap-4">
                  <img
                    src={getImageUrl(user.photo_url)}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = avatar;
                    }}
                  />
                  <span className="font-semibold text-gray-800">
                    {user.name}
                  </span>
                </td>

                <td className="p-4 text-gray-600">
                  {user.department}
                </td>

                <td className="p-4 font-bold text-blue-600">
                  {user.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;