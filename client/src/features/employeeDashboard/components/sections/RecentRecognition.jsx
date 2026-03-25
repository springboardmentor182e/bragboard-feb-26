import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const data = [
  {
    name: "Sarah Chen",
    role: "Senior Engineer",
    time: "2 hours ago",
    badge: "Innovation Star",
    badgeColor: "bg-orange-100 text-orange-600 border-orange-200",
    message:
      "Alex has been an incredible mentor this quarter. Their guidance on the new architecture design helped our entire team level up.",
    likes: 24,
    initials: "SC",
  },
  {
    name: "Emma Watson",
    role: "Marketing Manager",
    time: "1 day ago",
    badge: "Going Above & Beyond",
    badgeColor: "bg-indigo-100 text-indigo-600 border-indigo-200",
    message:
      "Alex went the extra mile to ensure our campaign launch was perfect. The late nights and attention to every detail made a huge impact.",
    likes: 32,
    initials: "EW",
  },
];

const RecentRecognition = () => {
  const navigate = useNavigate(); // ✅ added

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Recent Recognition
          </h2>
          <p className="text-sm text-slate-500">
            Shout-outs you've received recently
          </p>
        </div>

        {/* ✅ UPDATED BUTTON */}
        <button
          onClick={() => navigate("/recognitions")}
          className="text-sm px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
        >
          View All →
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {data.map((item, index) => (
          <div
            key={index}
            className="
              bg-white 
              rounded-2xl 
              p-6 
              border border-slate-200
              shadow-sm 
              hover:shadow-md 
              transition-all duration-300
            "
          >

            {/* TOP */}
            <div className="flex justify-between items-start">

              {/* LEFT */}
              <div className="flex items-center gap-4">

                {/* AVATAR */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white flex items-center justify-center font-semibold shadow">
                  {item.initials}
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {item.role}
                  </p>
                </div>
              </div>

              {/* TIME */}
              <p className="text-xs text-slate-400">
                {item.time}
              </p>
            </div>

            {/* BADGE */}
            <div
              className={`
                inline-block mt-4 text-xs px-3 py-1 rounded-lg border font-medium
                ${item.badgeColor}
              `}
            >
              {item.badge}
            </div>

            {/* MESSAGE */}
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              {item.message}
            </p>

            {/* FOOTER */}
            <div className="mt-5">
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full w-fit text-sm text-slate-600">
                <Heart size={14} className="text-red-500" />
                {item.likes}
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default RecentRecognition;