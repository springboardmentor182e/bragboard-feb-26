import { Trophy, ArrowRight } from "lucide-react";
import Card from "../../../../components/ui/Card";

/*
Reusable Rank Row
*/
const RankItem = ({ user, index }) => {
  const rankColors = [
    "text-yellow-500", // 1st
    "text-slate-500",  // 2nd
    "text-orange-500", // 3rd
  ];

  return (
    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* Rank */}
        <span className={`text-sm font-semibold w-6 ${rankColors[index] || "text-slate-400"}`}>
          #{index + 1}
        </span>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xs font-semibold shadow-sm">
          {user.name.charAt(0)}
        </div>

        {/* Name */}
        <span className="text-sm font-medium text-slate-800">
          {user.name}
        </span>

      </div>

      {/* POINTS */}
      <span className="text-sm font-semibold text-indigo-600">
        {user.points}
      </span>

    </div>
  );
};

const Leaderboard = () => {
  const users = [
    { name: "Rahul Sharma", points: 3200 },
    { name: "Satyam Dubey", points: 2450 },
    { name: "Ananya Singh", points: 2100 },
  ];

  return (
    <Card className="p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
            <Trophy size={18} className="text-orange-600" />
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              Leaderboard
            </p>
            <p className="text-xs text-slate-500">
              See top performers
            </p>
          </div>

        </div>

        {/* ACTION */}
        <button className="text-slate-400 hover:text-indigo-600 transition">
          <ArrowRight size={18} />
        </button>

      </div>

      {/* CURRENT USER */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-5">
        <p className="text-sm text-slate-500">
          You're rank{" "}
          <span className="font-semibold text-slate-900">#12</span>
        </p>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {users.map((user, index) => (
          <RankItem key={index} user={user} index={index} />
        ))}
      </div>

    </Card>
  );
};

export default Leaderboard;