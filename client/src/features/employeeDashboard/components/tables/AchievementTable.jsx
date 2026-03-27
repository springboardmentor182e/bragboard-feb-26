import { Heart } from "lucide-react";
import Card from "../../../../components/ui/Card";

/*
Reusable Recognition Card
*/
const RecognitionCard = ({ item }) => {
  return (
    <Card className="p-6 hover:shadow-md transition-all duration-200">

      {/* TOP */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
            {item.initials}
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              {item.name}
            </p>
            <p className="text-xs text-slate-500">
              {item.role}
            </p>
          </div>

        </div>

        {/* TIME */}
        <span className="text-xs text-slate-400">
          {item.time}
        </span>

      </div>

      {/* BADGE */}
      <div className="mt-4">
        <span
          className={`
            inline-flex items-center gap-1
            text-xs px-3 py-1 rounded-full font-medium
            ${item.badgeColor}
          `}
        >
          {item.badge}
        </span>
      </div>

      {/* MESSAGE */}
      <p className="text-sm text-slate-600 mt-4 leading-relaxed">
        {item.message}
      </p>

      {/* FOOTER */}
      <div className="mt-5 flex items-center justify-between">

        {/* Likes */}
        <div className="flex items-center gap-2 text-sm text-slate-500">

          <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full hover:bg-slate-200 transition">
            <Heart size={14} className="text-red-500" />
            <span className="font-medium">{item.likes}</span>
          </div>

        </div>

        {/* Optional future action */}
        <button className="text-xs text-indigo-600 font-medium hover:underline">
          View →
        </button>

      </div>

    </Card>
  );
};

const AchievementTable = () => {
  const recognitions = [
    {
      name: "Sarah Chen",
      role: "Senior Engineer",
      badge: "Innovation Star",
      message:
        "Alex has been an incredible mentor this quarter. Their guidance helped our entire team level up.",
      time: "2 hours ago",
      likes: 24,
      initials: "SC",
      badgeColor: "bg-orange-100 text-orange-600",
    },
    {
      name: "Emma Watson",
      role: "Marketing Manager",
      badge: "Going Above & Beyond",
      message:
        "Alex went the extra mile to ensure our campaign launch was perfect. Huge impact!",
      time: "1 day ago",
      likes: 32,
      initials: "EW",
      badgeColor: "bg-indigo-100 text-indigo-600",
    },
  ];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Recent Recognition
          </h2>
          <p className="text-sm text-slate-500">
            Shout-outs you've received recently
          </p>
        </div>

        <button className="text-sm font-medium text-indigo-600 hover:underline">
          View All →
        </button>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recognitions.map((item, index) => (
          <RecognitionCard key={index} item={item} />
        ))}
      </div>

    </div>
  );
};

export default AchievementTable;