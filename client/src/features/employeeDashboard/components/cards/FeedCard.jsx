import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";

const FeedCard = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes);
  const [expanded, setExpanded] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl p-6
        bg-gradient-to-br from-white to-slate-50
        border border-slate-200/70
        shadow-sm
        hover:shadow-xl hover:-translate-y-1
        hover:border-indigo-200
        transition-all duration-300
      "
    >

      {/* Subtle glow */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />

      {/* TOP */}
      <div className="flex justify-between items-start">

        <div className="flex items-center gap-4">

          {/* AVATAR */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white flex items-center justify-center font-semibold shadow group-hover:scale-105 transition">
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
      <p className="text-sm text-slate-700 mt-4 leading-relaxed">
        {expanded ? item.message : item.message.slice(0, 120) + "..."}
        <span
          onClick={() => setExpanded(!expanded)}
          className="ml-2 text-indigo-600 cursor-pointer text-xs font-medium hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </span>
      </p>

      {/* FOOTER */}
      <div className="mt-5 flex items-center gap-4">

        {/* LIKE */}
        <button
          onClick={handleLike}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all duration-200
            ${liked 
              ? "bg-red-50 text-red-600 scale-105" 
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"}
          `}
        >
          <Heart
            size={14}
            className={`
              transition-all
              ${liked ? "fill-red-500 scale-110" : ""}
            `}
          />
          {likes}
        </button>

        {/* COMMENT */}
        <button className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-sm text-slate-600 hover:bg-slate-200 hover:scale-105 transition">
          <MessageCircle size={14} />
          {item.comments}
        </button>

      </div>

    </div>
  );
};

export default FeedCard;