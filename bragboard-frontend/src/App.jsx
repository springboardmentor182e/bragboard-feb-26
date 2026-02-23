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

  const getImageUrl = (photoUrl) => {
    if (!photoUrl) return avatar;

    if (photoUrl.startsWith("/media")) {
      return `http://127.0.0.1:8000${photoUrl}`;
    }

    return `http://127.0.0.1:8000/media/users/${photoUrl}`;
  };

  const PodiumCard = ({ user, rank }) => {

    const configs = {
      1: {
        size: "w-80",
        border: "border-4 border-yellow-400",
        medal: "👑",
        glow: `
          hover:shadow-[0_0_50px_rgba(255,215,0,0.5)]
          hover:ring-2 hover:ring-yellow-200
          hover:border-yellow-300
        `,
        stageHeight: "h-28 bg-yellow-400",
      },
      2: {
        size: "w-72",
        border: "border-4 border-gray-400",
        medal: "🥈",
        glow: `
          hover:shadow-[0_0_60px_rgba(192,192,192,0.6)]
          hover:ring-2 hover:ring-gray-300
          hover:border-gray-300
        `,
        stageHeight: "h-20 bg-gray-400",
      },
      3: {
        size: "w-72",
        border: "border-4 border-orange-400",
        medal: "🥉",
        glow: `
          hover:shadow-[0_0_60px_rgba(251,146,60,0.6)]
          hover:ring-2 hover:ring-orange-300
          hover:border-orange-300
        `,
        stageHeight: "h-16 bg-orange-400",
      },
    };

    const cfg = configs[rank] || configs[1];

    return (
      <div className="flex flex-col items-center transition-all duration-700 hover:-translate-y-2">
        
        <div
          className={`
            relative ${cfg.size}
            rounded-3xl bg-white p-8 text-center shadow-2xl
            ${cfg.border}
            transition-all duration-500 ease-in-out
            hover:scale-105
            ${cfg.glow}
            ${rank === 1 ? "animate-soft-gold" : ""}
          `}
        >

          {/* Crown with soft bounce */}
          <div className={`text-4xl mb-4 ${rank === 1 ? "animate-soft-bounce" : ""}`}>
            {cfg.medal}
          </div>

          <img
            src={getImageUrl(user.photo_url)}
            alt="profile"
            className="w-24 h-24 mx-auto rounded-full object-cover transition duration-500 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = avatar;
            }}
          />

          <h2 className="text-xl font-bold text-gray-900 mt-4 mb-2">
            {user.name}
          </h2>

          {rank === 1 && (
            <div className="text-xs font-semibold text-yellow-600 mb-2">
              ⭐ Top Performer
            </div>
          )}

          <div
            className={`
              inline-block
              px-4 py-1
              rounded-full
              text-sm font-semibold
              mb-3
              transition-all duration-300
              ${
                rank === 1
                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:shadow-sm"
                  : rank === 2
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                  : "bg-orange-100 text-orange-700 hover:bg-orange-200 hover:shadow-sm"
              }
            `}
          >
            {user.department}
          </div>

          <p className="text-xl font-bold text-blue-600">
            {user.points} pts
          </p>
        </div>

        <div
          className={`w-40 ${cfg.stageHeight} rounded-b-2xl shadow-inner mt-4 transition-all duration-500`}
        ></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-16">
      <h1 className="text-5xl font-bold text-center mb-20 text-gray-800">
        🏆 Employee Leaderboard
      </h1>

      {users.length >= 3 && (
        <div className="flex flex-col md:flex-row justify-center items-end gap-10 mb-24">
          <PodiumCard user={users[1]} rank={2} />
          <PodiumCard user={users[0]} rank={1} />
          <PodiumCard user={users[2]} rank={3} />
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
                className="
                  border-b transition-all duration-300
                  hover:bg-gradient-to-r
                  hover:from-indigo-50
                  hover:to-purple-50
                  hover:shadow-md
                  hover:scale-[1.01]
                "
              >
                <td className="p-4 font-bold text-gray-700">
                  {index === 0 && "🥇 "}
                  {index === 1 && "🥈 "}
                  {index === 2 && "🥉 "}
                  #{index + 1}
                </td>

                <td className="p-4 flex items-center gap-4">
                  <img
                    src={getImageUrl(user.photo_url)}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover transition duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]"
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