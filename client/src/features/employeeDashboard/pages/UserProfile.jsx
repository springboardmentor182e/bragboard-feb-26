import { Heart, Trophy } from "lucide-react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams(); // later from backend

  // dummy data (replace later)
  const user = {
    name: "Sarah Chen",
    role: "Senior Engineer",
    dept: "Product",
    initials: "SC",
    points: 2095,
    shoutouts: 24,
    reactions: 156,
  };

  const shoutouts = [
    {
      message:
        "Amazing leadership and mentorship throughout the quarter!",
      badge: "Innovation Star",
      date: "2 days ago",
    },
    {
      message:
        "Great collaboration and support for the team!",
      badge: "Team Player",
      date: "5 days ago",
    },
  ];

  return (
    <div className="space-y-8">

      {/* PROFILE HEADER */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-6">

        {/* AVATAR */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center text-2xl font-bold">
          {user.initials}
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {user.name}
          </h1>
          <p className="text-slate-500">
            {user.role}
          </p>

          <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-600">
            {user.dept}
          </span>
        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-indigo-50 p-6 rounded-2xl border">
          <p className="text-2xl font-bold">{user.points}</p>
          <p className="text-sm text-slate-500">Points</p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-2xl border">
          <p className="text-2xl font-bold">
            <Trophy className="inline mr-2" size={18} />
            {user.shoutouts}
          </p>
          <p className="text-sm text-slate-500">Shout-Outs</p>
        </div>

        <div className="bg-pink-50 p-6 rounded-2xl border">
          <p className="text-2xl font-bold">
            <Heart className="inline mr-2 text-red-500" size={18} />
            {user.reactions}
          </p>
          <p className="text-sm text-slate-500">Reactions</p>
        </div>

      </div>

      {/* SHOUTOUTS */}
      <div className="space-y-4">

        <h2 className="text-xl font-semibold text-slate-900">
          Recent Recognition
        </h2>

        {shoutouts.map((item, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border shadow-sm"
          >
            <p className="text-sm text-slate-600">
              {item.message}
            </p>

            <div className="flex justify-between items-center mt-3">
              <span className="text-xs px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg">
                {item.badge}
              </span>

              <span className="text-xs text-slate-400">
                {item.date}
              </span>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default UserProfile;