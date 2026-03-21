import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Trophy, BarChart2, Clock } from "lucide-react";
import api from "../services/api";

const CARD_CONFIG = [
  { title: "Total Points",  icon: <Star size={20} />,      key: "achievement_points", prefix: "",  suffix: " pts" },
  { title: "Achievements",  icon: <Trophy size={20} />,    key: "achievement_count",  prefix: "",  suffix: "" },
  { title: "Rank",          icon: <BarChart2 size={20} />, key: "rank",               prefix: "#", suffix: "" },
  { title: "Shoutouts",     icon: <Clock size={20} />,     key: "shoutout_count",     prefix: "",  suffix: "" },
];

const SummaryCards = ({ selectedEmployee }) => {
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedEmployee) return;
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [achievementsRes, leaderboardRes] = await Promise.all([
          api.get(`/achievements/employee/${selectedEmployee.id}`),
          api.get("/employees/leaderboard"),
        ]);
        const achievements = achievementsRes.data;
        const leaderboard  = leaderboardRes.data;
        const rankIndex = leaderboard.findIndex((e) => e.employee_id === selectedEmployee.id);
        const rank  = rankIndex === -1 ? "-" : rankIndex + 1;
        const entry = leaderboard.find((e) => e.employee_id === selectedEmployee.id);
        setStats({
          achievement_points: entry?.achievement_points ?? 0,
          achievement_count:  achievements.length,
          rank,
          shoutout_count:     entry?.shoutout_count ?? 0,
        });
      } catch (err) {
        console.error("Failed to fetch summary stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [selectedEmployee]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {CARD_CONFIG.map((card, index) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.12, duration: 0.4 }}
          whileHover={{ scale: 1.03 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200 p-6 transition-all duration-300"
        >
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <span className="text-indigo-500">{card.icon}</span>
            <h3 className="text-sm">{card.title}</h3>
          </div>
          {loading || !stats ? (
            <div className="mt-2 h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-100">
              {card.prefix}
              {typeof stats[card.key] === "number" ? (
                <AnimatedNumber value={stats[card.key]} />
              ) : (
                stats[card.key]
              )}
              {card.suffix}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = value / (1000 / 16);
    const counter = setInterval(() => {
      start += increment;
      if (start >= value) { setCount(value); clearInterval(counter); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(counter);
  }, [value]);
  return <span>{count}</span>;
};

export default SummaryCards;
