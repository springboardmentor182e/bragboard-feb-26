import { useNavigate } from "react-router-dom";
import FeedCard from "../cards/FeedCard";

const data = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Engineer",
    time: "2 hours ago",
    badge: "Innovation Star",
    badgeColor: "bg-orange-100 text-orange-600 border-orange-200",
    message:
      "Alex has been an incredible mentor this quarter. Their guidance on the new architecture design helped our entire team level up.",
    likes: 24,
    comments: 5,
    initials: "SC",
  },
  {
    id: 2,
    name: "Emma Watson",
    role: "Marketing Manager",
    time: "1 day ago",
    badge: "Going Above & Beyond",
    badgeColor: "bg-indigo-100 text-indigo-600 border-indigo-200",
    message:
      "Alex went the extra mile to ensure our campaign launch was perfect. The late nights and attention to every detail made a huge impact.",
    likes: 32,
    comments: 3,
    initials: "EW",
  },
];

const Feed = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">

      {/* HEADER (IMPROVED) */}
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Feed
          </h2>
          <p className="text-sm text-slate-500">
            Team activity and recognitions
          </p>
        </div>

        <button
          onClick={() => navigate("/recognitions")}
          className="
            text-sm px-4 py-2 rounded-xl
            bg-gradient-to-r from-indigo-500 to-purple-500 text-white
            shadow hover:opacity-90 transition
          "
        >
          View All →
        </button>

      </div>

      {/* LIST */}
      <div className="space-y-6">
        {data.map((item) => (
          <FeedCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
};

export default Feed;