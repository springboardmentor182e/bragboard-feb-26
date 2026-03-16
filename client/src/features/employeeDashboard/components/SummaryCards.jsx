import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Trophy, BarChart2, Clock } from "lucide-react";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

// Card config — title, icon, key from API data, prefix/suffix formatting
const CARD_CONFIG = [
  { title: "Total Points",     icon: <Star size={20} />,      key: "achievement_points", prefix: "",  suffix: " pts" },
  { title: "Achievements",     icon: <Trophy size={20} />,    key: "achievement_count",  prefix: "",  suffix: "" },
  { title: "Rank",             icon: <BarChart2 size={20} />, key: "rank",               prefix: "#", suffix: "" },
  { title: "Shoutouts",        icon: <Clock size={20} />,     key: "shoutout_count",     prefix: "",  suffix: "" },
];

const SummaryCards = ({ selectedEmployee }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedEmployee) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const [achievementsRes, leaderboardRes] = await Promise.all([
          axios.get(`${BASE_URL}/achievements/employee/${selectedEmployee.id}`),
          axios.get(`${BASE_URL}/employees/leaderboard`),
        ]);

        const achievements = achievementsRes.data;
        const leaderboard = leaderboardRes.data;
        const rank = leaderboard.findIndex((e) => e.employee_id === selectedEmployee.id) + 1;
        const entry = leaderboard.find((e) => e.employee_id === selectedEmployee.id);

        setStats({
          achievement_points: entry?.achievement_points ?? 0,
          achievement_count: achievements.length,
          rank: rank || "-",
          shoutout_count: entry?.shoutout_count ?? 0,
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
          transition={{ delay: index * 0.15, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl
                     rounded-2xl shadow-lg dark:shadow-black/30
                     border border-gray-200 dark:border-gray-700
                     p-6 transition-all duration-300"
        >
          {/* Icon + Title */}
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <span className="text-indigo-500">{card.icon}</span>
            <h3 className="text-sm">{card.title}</h3>
          </div>

          {/* Value */}
          {loading || !stats ? (
            <div className="mt-2 h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-100">
              {card.prefix}
              <AnimatedNumber value={typeof stats[card.key] === "number" ? stats[card.key] : 0} />
              {card.suffix}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};

/* Animated Counter */
const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = value / (duration / 16);
    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(counter);
  }, [value]);

  return <span>{count}</span>;
};

export default SummaryCards;