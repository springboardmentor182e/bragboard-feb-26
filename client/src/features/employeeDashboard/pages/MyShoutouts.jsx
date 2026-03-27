import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Filter,
  ArrowRight,
  Star,
} from "lucide-react";

const MyShoutouts = () => {
  const [activeTab, setActiveTab] = useState("received");

  const data = [
    {
      from: "Sarah Chen",
      to: "You",
      role: "Senior Engineer",
      message:
        "Alex has been an incredible mentor this quarter. Their guidance on architecture helped the whole team grow.",
      date: "5 hours ago",
      likes: 24,
      comments: 3,
      badge: "Innovation Star",
      campaign: "Q1 Excellence Drive",
    },
    {
      from: "You",
      to: "Emma Watson",
      role: "Marketing Manager",
      message:
        "Amazing campaign execution! Your leadership made this launch successful.",
      date: "2 days ago",
      likes: 32,
      comments: 5,
      badge: "Going Above & Beyond",
      campaign: "Innovation Week",
    },
  ];

  return (
    <div className="space-y-8">

      {/* 🔥 HEADER */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
          A
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            My Shout-Outs
          </h1>
          <p className="text-slate-500">
            Track your recognition journey
          </p>
        </div>
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatCard title="Given" value="3" color="indigo" />
        <StatCard title="Received" value="2" color="green" />
        <StatCard title="Points" value="200" color="amber" />

      </div>

      {/* 🎯 FILTER BAR */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">

        {/* TABS */}
        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
          {["received", "given"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-white shadow text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab === "received" ? "Received" : "Given"}
            </button>
          ))}
        </div>

        {/* FILTER ICON */}
        <button className="p-2 rounded-lg hover:bg-slate-100 transition">
          <Filter size={18} className="text-slate-400" />
        </button>

      </div>

      {/* 📄 SHOUTOUT LIST */}
      <div className="space-y-6">

        {data.map((item, index) => (
          <ShoutoutCard key={index} item={item} />
        ))}

      </div>

    </div>
  );
};

export default MyShoutouts;





// 🔹 COMPONENT: STAT CARD
const StatCard = ({ title, value, color }) => {
  const colors = {
    indigo: "from-indigo-500 to-purple-500",
    green: "from-emerald-500 to-green-500",
    amber: "from-amber-400 to-orange-500",
  };

  return (
    <div className="
      relative overflow-hidden
      rounded-2xl p-6
      bg-gradient-to-br from-white to-slate-50
      border border-slate-200
      shadow-sm hover:shadow-lg hover:-translate-y-1
      transition-all duration-300
    ">

      {/* Glow */}
      <div className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r ${colors[color]} opacity-20 blur-2xl`} />

      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>

    </div>
  );
};




// 🔹 COMPONENT: SHOUTOUT CARD
const ShoutoutCard = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes);

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
        border border-slate-200
        shadow-sm hover:shadow-xl hover:-translate-y-1
        hover:border-indigo-200
        transition-all duration-300
      "
    >

      {/* Glow */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />

      {/* 👤 WHO → WHOM */}
      <div className="flex items-center gap-2 text-sm mb-3">

        <span className="font-semibold text-slate-900">
          {item.from}
        </span>

        <ArrowRight size={14} className="text-slate-400" />

        <span className="font-semibold text-indigo-600">
          {item.to}
        </span>

        <span className="ml-auto text-xs text-slate-400">
          {item.date}
        </span>

      </div>

      {/* 🏅 BADGE */}
      <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-lg bg-yellow-50 text-yellow-700 border border-yellow-200 font-medium">
        <Star size={12} className="text-yellow-500 fill-yellow-500" />
        {item.badge}
      </div>

      {/* 💬 MESSAGE */}
      <p className="text-sm text-slate-700 mt-4 leading-relaxed">
        {item.message}
      </p>

      {/* 📌 CAMPAIGN */}
      <div className="mt-4 inline-block text-xs px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200">
        {item.campaign}
      </div>

      {/* ❤️ FOOTER */}
      <div className="mt-5 flex items-center gap-4">

        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all
            ${
              liked
                ? "bg-red-50 text-red-600 scale-105"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
        >
          <Heart size={14} className={liked ? "fill-red-500" : ""} />
          {likes}
        </button>

        <button className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-sm text-slate-600 hover:bg-slate-200">
          <MessageCircle size={14} />
          {item.comments}
        </button>

      </div>

    </div>
  );
};