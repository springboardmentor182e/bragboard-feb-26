import React, { useState, useEffect } from "react";

const API = "http://127.0.0.1:8000";

export default function MyShoutouts() {
  const [shoutouts, setShoutouts] = useState([]);
  const [stats, setStats] = useState({ total_given: 0, total_received: 0, points_earned: 0 });
  const [tab, setTab] = useState("received");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    setError("");
    try {
      const [recRes, givRes, statsRes] = await Promise.all([
        fetch(`${API}/employee/shoutouts/received`),
        fetch(`${API}/employee/shoutouts/given`),
        fetch(`${API}/employee/shoutouts/stats`),
      ]);
      const recData   = await recRes.json();
      const givData   = await givRes.json();
      const statsData = await statsRes.json();
      setShoutouts({
        received: Array.isArray(recData) ? recData : (recData.data ?? []),
        given:    Array.isArray(givData) ? givData : (givData.data ?? []),
      });
      setStats(statsData);
    } catch (err) {
      setError("Could not connect to server. Make sure FastAPI is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const activeList = shoutouts[tab] ?? [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow">
          <h1 className="text-3xl font-bold mb-1">My Shout-Outs</h1>
          <p className="text-indigo-100">Celebrate great work and recognize teammates</p>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5 mb-8">
        <div className="bg-indigo-50 rounded-3xl p-6 shadow-sm border border-indigo-100 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-indigo-100 flex items-center justify-center text-2xl">🎁</div>
            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center font-bold text-sm">➤</div>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-gray-900 tracking-tight">{stats.total_given}</p>
            <p className="text-sm font-semibold text-gray-700 mt-1">Total Given</p>
            <p className="text-xs text-gray-400 mt-0.5">Recognition sent</p>
          </div>
        </div>

        <div className="bg-green-50 rounded-3xl p-6 shadow-sm border border-green-100 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-green-100 flex items-center justify-center text-2xl">🤍</div>
            <div className="w-9 h-9 rounded-full bg-green-100 text-green-500 flex items-center justify-center font-bold text-sm">✨</div>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-gray-900 tracking-tight">{stats.total_received}</p>
            <p className="text-sm font-semibold text-gray-700 mt-1">Total Received</p>
            <p className="text-xs text-gray-400 mt-0.5">Recognition earned</p>
          </div>
        </div>

        <div className="bg-amber-50 rounded-3xl p-6 shadow-sm border border-amber-100 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-amber-100 flex items-center justify-center text-2xl">⭐</div>
            <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center font-bold text-sm">📈</div>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-gray-900 tracking-tight">{stats.points_earned}</p>
            <p className="text-sm font-semibold text-gray-700 mt-1">Points Earned</p>
            <p className="text-xs text-gray-400 mt-0.5">Recognition points</p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
          <button
            onClick={() => setTab("received")}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${tab === "received" ? "bg-white shadow text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
          >
            Received{" "}
            <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs font-bold ${tab === "received" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}>
              {shoutouts.received?.length ?? 0}
            </span>
          </button>
          <button
            onClick={() => setTab("given")}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${tab === "given" ? "bg-white shadow text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
          >
            Given
          </button>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="max-w-6xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* LIST */}
      <div className="max-w-6xl mx-auto space-y-4">
        {loading ? (
          <><SkeletonCard /><SkeletonCard /></>
        ) : activeList.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center text-gray-400 border border-gray-100 shadow-sm">
            {tab === "received" ? "No shoutouts received yet 🎉" : "No shoutouts given yet 🚀"}
          </div>
        ) : (
          activeList.map((item) => <ShoutoutCard key={item.id} s={item} type={tab} />)
        )}
      </div>

    </div>
  );
}

function ShoutoutCard({ s, type }) {
  const BADGE_ICONS = {
    "Team Player": "🤝", "Innovation Star": "🏅", "Customer Champion": "🏆",
    "Data Wizard": "🔮", "Problem Solver": "🧩", "Above & Beyond": "🚀",
  };
  const displayName = type === "received" ? s.sender_name : s.receiver_name;
  const arrowLabel  = type === "received" ? "→ You" : `→ ${s.receiver_name}`;
  const initials    = displayName?.split(" ").map((n) => n.charAt(0).toUpperCase()).slice(0, 2).join("");

  function timeAgo(dateStr) {
    if (!dateStr) return "";
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60)      return `${diff} seconds ago`;
    if (diff < 3600)    return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400)   return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
    return new Date(dateStr).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-sm flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-bold text-gray-900 text-base">{displayName}</span>
            <span className="text-gray-400 text-sm">{arrowLabel}</span>
            {s.level && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold">
                ☆ Lvl {s.level}
              </span>
            )}
          </div>
          {s.sender_title && <p className="text-sm text-gray-400">{s.sender_title}</p>}
        </div>
        <span className="text-sm text-gray-400 whitespace-nowrap flex-shrink-0">{timeAgo(s.created_at)}</span>
      </div>

      {s.badge && (
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm font-semibold border border-amber-200">
            <span>{BADGE_ICONS[s.badge] || "🏅"}</span>{s.badge}
          </span>
        </div>
      )}

      {s.message && <p className="text-gray-700 text-sm leading-relaxed mb-4">{s.message}</p>}

      {s.campaign && (
        <div className="mb-5">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-indigo-600 text-sm font-medium border border-indigo-200">
            📅 {s.campaign}
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-red-50 hover:text-red-500 transition-colors text-sm text-gray-500">
          ❤️ <span className="font-medium">{s.likes ?? 0}</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-indigo-50 hover:text-indigo-500 transition-colors text-sm text-gray-500">
          💬 <span className="font-medium">{s.comments ?? 0}</span>
        </button>
        {(s.shares ?? 0) > 0 && (
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-green-50 hover:text-green-500 transition-colors text-sm text-gray-500">
            🔁 <span className="font-medium">{s.shares}</span>
          </button>
        )}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm animate-pulse">
      <div className="flex gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gray-200" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-3 bg-gray-100 rounded w-1/4" />
        </div>
      </div>
      <div className="h-3 bg-gray-100 rounded w-1/4 mb-4" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
      </div>
    </div>
  );
}