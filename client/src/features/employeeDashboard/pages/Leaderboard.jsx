import { Trophy, Medal, Star } from "lucide-react";

const topUsers = [
  {
    name: "David Kim",
    dept: "Design",
    points: 2730,
    initials: "DK",
    position: 2,
  },
  {
    name: "Jessica Park",
    dept: "Engineering",
    points: 2845,
    initials: "JP",
    position: 1,
  },
  {
    name: "Michael Rodriguez",
    dept: "Engineering",
    points: 2615,
    initials: "MR",
    position: 3,
  },
];

const leaderboard = [
  {
    rank: 4,
    name: "Rachel Anderson",
    dept: "Customer Success",
    points: 2490,
    initials: "RA",
    badges: { heart: 8, star: 5, fire: 14 },
  },
  {
    rank: 5,
    name: "Marcus Johnson",
    dept: "Data & Analytics",
    points: 2380,
    initials: "MJ",
    badges: { heart: 7, star: 9, fire: 4 },
  },
  {
    rank: 6,
    name: "Emily Chen",
    dept: "Marketing",
    points: 2265,
    initials: "EC",
    badges: { heart: 11, star: 6, fire: 5 },
  },
  {
    rank: 7,
    name: "Alex Thompson",
    dept: "Customer Success",
    points: 2180,
    initials: "AT",
    badges: { heart: 9, star: 4, fire: 9 },
  },
  {
    rank: 8,
    name: "Sarah Chen",
    dept: "Product",
    points: 2095,
    initials: "SC",
    badges: { heart: 6, star: 8, fire: 7 },
  },
  {
    rank: 9,
    name: "Emma Watson",
    dept: "Design",
    points: 1980,
    initials: "EW",
    badges: { heart: 8, star: 10, fire: 3 },
  },
  {
    rank: 10,
    name: "James Wilson",
    dept: "Engineering",
    points: 1875,
    initials: "JW",
    badges: { heart: 5, star: 7, fire: 6 },
  },
];

const Leaderboard = () => {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Leaderboard
        </h1>
        <p className="text-slate-500">
          Top performers this month • Updated daily
        </p>
      </div>

      {/* TOP 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {topUsers.map((user, i) => (
          <div
            key={i}
            className={`
              relative bg-white rounded-2xl p-6 text-center
              border shadow-sm
              ${
                user.position === 1
                  ? "border-yellow-400 shadow-lg scale-105"
                  : "border-slate-200"
              }
            `}
          >

            {/* ICON */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-white shadow
                  ${
                    user.position === 1
                      ? "bg-yellow-500"
                      : user.position === 2
                      ? "bg-slate-400"
                      : "bg-orange-500"
                  }
                `}
              >
                {user.position === 1 ? <Trophy size={18} /> : <Medal size={18} />}
              </div>
            </div>

            {/* AVATAR */}
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white flex items-center justify-center text-lg font-bold mt-4">
              {user.initials}
            </div>

            {/* NAME */}
            <h3 className="mt-4 font-semibold text-slate-900">
              {user.name}
            </h3>

            {/* DEPT */}
            <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 inline-block mt-2">
              {user.dept}
            </span>

            {/* POINTS */}
            <p className="text-3xl font-bold text-indigo-600 mt-4">
              {user.points.toLocaleString()}
            </p>
            <p className="text-sm text-slate-500">points</p>

          </div>
        ))}

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-5 px-6 py-4 text-sm text-slate-500 border-b">
          <span>Rank</span>
          <span>Employee</span>
          <span>Department</span>
          <span>Points</span>
          <span>Badges</span>
        </div>

        {/* ROWS */}
        {leaderboard.map((user, i) => (
          <div
            key={i}
            className="grid grid-cols-5 px-6 py-4 items-center border-b last:border-none hover:bg-slate-50 transition"
          >

            {/* RANK */}
            <span className="font-medium text-slate-700">
              #{user.rank}
            </span>

            {/* USER */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-semibold">
                {user.initials}
              </div>
              <span className="font-medium text-slate-900">
                {user.name}
              </span>
            </div>

            {/* DEPT */}
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 w-fit">
              {user.dept}
            </span>

            {/* POINTS */}
            <span className="font-semibold text-indigo-600">
              {user.points.toLocaleString()}
            </span>

            {/* BADGES */}
            <div className="flex gap-3 text-sm">
              <span>❤️ {user.badges.heart}</span>
              <span>⭐ {user.badges.star}</span>
              <span>💪 {user.badges.fire}</span>
            </div>

          </div>
        ))}

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <p className="text-2xl font-bold text-slate-900">
            2,845
          </p>
          <p className="text-sm text-slate-500">Top Score</p>
        </div>

        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <p className="text-2xl font-bold text-slate-900">
            487
          </p>
          <p className="text-sm text-slate-500">Total Badges</p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
          <p className="text-2xl font-bold text-slate-900">
            +23%
          </p>
          <p className="text-sm text-slate-500">
            From Last Month
          </p>
        </div>

      </div>

    </div>
  );
};

export default Leaderboard;