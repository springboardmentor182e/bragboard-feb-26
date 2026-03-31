import { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Filter,
  ArrowRight,
  Star,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import {
  getUserGivenShoutouts,
  getUserReceivedShoutouts,
  getUserStats,
} from "../../../services/shoutoutService";
import FeedCard from "../components/cards/FeedCard";

const MyShoutouts = () => {
  const [activeTab, setActiveTab] = useState("received");
  const [stats, setStats] = useState({
    shoutouts_sent: 0,
    shoutouts_received: 0,
    total_points: 0,
  });
  const [shoutouts, setShoutouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const userId = user?.id;

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (userId) {
          const statsData = await getUserStats(userId);
          setStats(statsData);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    if (userId) {
      fetchStats();
    }
  }, [userId]);

  // Fetch shoutouts based on active tab
  useEffect(() => {
    const fetchShoutouts = async () => {
      try {
        setLoading(true);
        setError(null);
        let data;
        if (activeTab === "received") {
          data = await getUserReceivedShoutouts(20, 0);
        } else {
          data = await getUserGivenShoutouts(20, 0);
        }
        setShoutouts(data);
      } catch (err) {
        setError(err.message || "Failed to fetch shoutouts");
        console.error("Error fetching shoutouts:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchShoutouts();
    }
  }, [activeTab, userId]);

  return (
    <div className="space-y-8">

      {/* 🔥 HEADER */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
          {user?.name?.charAt(0) || "A"}
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
        <StatCard
          title="Given"
          value={stats.shoutouts_sent || 0}
          color="indigo"
        />
        <StatCard
          title="Received"
          value={stats.shoutouts_received || 0}
          color="green"
        />
        <StatCard
          title="Points"
          value={stats.total_points || 0}
          color="amber"
        />
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

      {/* ERROR STATE */}
      {error && (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-40 bg-slate-200 rounded-lg animate-pulse" />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && shoutouts.length === 0 && !error && (
        <div className="text-center py-10">
          <p className="text-slate-500">
            {activeTab === "received"
              ? "No shoutouts received yet. Keep up the great work!"
              : "No shoutouts given yet. Recognize someone's contributions!"}
          </p>
        </div>
      )}

      {/* 📄 SHOUTOUT LIST */}
      {!loading && shoutouts.length > 0 && (
        <div className="space-y-6">
          {shoutouts.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))}
        </div>
      )}

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