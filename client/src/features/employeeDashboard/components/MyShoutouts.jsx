import React, { useEffect, useState } from "react";
import { 
  Heart, 
  Send, 
  Trophy, 
  Star, 
  MessageSquare, 
  ChevronDown, 
  Filter, 
  Calendar,
  Sparkles,
  Loader2
} from "lucide-react";
import axios from "axios";

const MyShoutouts = () => {
  const [activeTab, setActiveTab] = useState("received"); // "received" or "given"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [receivedShoutouts, setReceivedShoutouts] = useState([]);
  const [givenShoutouts, setGivenShoutouts] = useState([]);

  // For dummy purposes, we'll assume current user ID is 8 (Alex Cooper)
  const currentUserId = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const [receivedRes, givenRes] = await Promise.all([
          axios.get(`${apiUrl}/shoutouts/received/${currentUserId}`),
          axios.get(`${apiUrl}/shoutouts/given/${currentUserId}`)
        ]);
        setReceivedShoutouts(Array.isArray(receivedRes.data) ? receivedRes.data : []);
        setGivenShoutouts(Array.isArray(givenRes.data) ? givenRes.data : []);
      } catch (error) {
        console.error("Error fetching shoutouts:", error);
        setError("Could not load your shout-outs. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const shoutouts = activeTab === "received" ? receivedShoutouts : givenShoutouts;

  const totalPoints = receivedShoutouts.reduce((sum, s) => sum + s.points, 0);

  const stats = [
    {
      id: "given",
      label: "Total Given",
      value: givenShoutouts.length.toString(),
      sublabel: "Recognition sent",
      icon: <Send size={20} className="text-indigo-500" />,
      bg: "bg-[#F0F4FF]",
      iconBg: "bg-white"
    },
    {
      id: "received",
      label: "Total Received",
      value: receivedShoutouts.length.toString(),
      sublabel: "Recognition earned",
      icon: <Heart size={20} className="text-green-500" />,
      bg: "bg-[#E6F9F0]",
      iconBg: "bg-white"
    },
    {
      id: "points",
      label: "Points Earned",
      value: totalPoints.toString(),
      sublabel: `Progress to Level ${Math.floor(totalPoints / 100) + 1}`,
      progress: totalPoints % 100,
      icon: <Star size={20} className="text-orange-400" />,
      bg: "bg-[#FFF9EB]",
      iconBg: "bg-white"
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-[#5B59FF] mb-4" size={40} />
        <p className="text-slate-500 font-medium italic">Loading your journey...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-red-100 shadow-sm">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <Heart className="text-red-300" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops!</h2>
        <p className="text-slate-500 max-w-md text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A855F7] to-[#EC4899] flex items-center justify-center text-white text-xl font-black shadow-lg shadow-pink-500/20">
          A
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900">My Shout-Outs</h1>
          <p className="text-slate-500 font-medium">Your personal recognition journey</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className={`${stat.bg} rounded-[32px] p-8 border border-white shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300`}>
            <div className="flex justify-between items-start mb-6">
              <div className={`${stat.iconBg} w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className="opacity-20 group-hover:opacity-30 transition-opacity">
                {stat.id === "given" && <Send size={32} />}
                {stat.id === "received" && <Sparkles size={32} />}
                {stat.id === "points" && <Trophy size={32} />}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-4xl font-black text-slate-900">{stat.value}</div>
              <div className="text-sm font-bold text-slate-700">{stat.label}</div>
              <div className="text-xs font-medium text-slate-400">{stat.sublabel}</div>
            </div>

            {stat.progress !== undefined && (
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-slate-500">Progress to Level 10</span>
                  <span className="text-orange-500">{stat.progress}%</span>
                </div>
                <div className="h-2 w-full bg-orange-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-400 rounded-full transition-all duration-1000" 
                    style={{ width: `${stat.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-[28px] border border-slate-100 p-2 flex items-center justify-between shadow-sm">
        <div className="flex p-1 gap-1">
          <button 
            onClick={() => setActiveTab("received")}
            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "received" 
                ? "bg-white shadow-sm border border-slate-100 text-slate-900" 
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Received 
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === "received" ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"}`}>
              {receivedShoutouts.length}
            </span>
          </button>
          <button 
            onClick={() => setActiveTab("given")}
            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
              activeTab === "given" 
                ? "bg-white shadow-sm border border-slate-100 text-slate-900" 
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Given
            <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] ${activeTab === "given" ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400"}`}>
              {givenShoutouts.length}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-4 px-4">
          <button className="text-slate-400 hover:text-slate-600 p-2">
            <Filter size={18} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-100 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
            All Campaigns
            <ChevronDown size={16} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Shout-outs Feed */}
      <div className="space-y-6">
        {shoutouts.map((shoutout) => (
          <div key={shoutout.id} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/10`}>
                  {(activeTab === "received" ? shoutout.sender.name : shoutout.receiver.name).charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">
                      {activeTab === "received" ? shoutout.sender.name : shoutout.receiver.name}
                    </h3>
                    <span className="text-slate-300 font-medium">
                      {activeTab === "received" ? "→ You" : "← You"}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                      <Star size={10} className="fill-white" />
                      Lvl {Math.floor(shoutout.points / 50) + 1}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-400">
                    {activeTab === "received" ? shoutout.sender.role : shoutout.receiver.role}
                  </p>
                </div>
              </div>
              <span className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <Calendar size={14} />
                {new Date(shoutout.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-black mb-6">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              {shoutout.category}
            </div>

            <p className="text-slate-700 font-medium leading-relaxed mb-8">
              {shoutout.message}
            </p>

            <div className="pt-8 border-t border-slate-50 flex items-center gap-6">
              <button className="flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-rose-50 transition-colors">
                  <Heart size={18} className="group-hover:fill-rose-500 group-hover:text-rose-500" />
                </div>
                <span className="font-bold">{Math.floor(shoutout.points / 10)}</span>
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-500 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                  <MessageSquare size={18} />
                </div>
                <span className="font-bold">0</span>
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-center pt-4">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-green-50 text-green-600 text-xs font-bold border border-green-100 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            Showing {shoutouts.length} shout-outs
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyShoutouts;