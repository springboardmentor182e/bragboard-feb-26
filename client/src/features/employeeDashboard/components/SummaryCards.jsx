import { motion } from "framer-motion";
import { useEffect, useState } from "react";
<<<<<<< HEAD
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
=======
import { Award, Trophy, Star, Clock } from "lucide-react";

const SummaryCards = () => {
  const stats = [
    {
      title: "Total Points",
      value: 2450,
      icon: <Star className="w-6 h-6 text-indigo-600" />,
      bg: "bg-indigo-100",
    },
    {
      title: "Achievements",
      value: 18,
      icon: <Award className="w-6 h-6 text-amber-600" />,
      bg: "bg-amber-100",
    },
    {
      title: "Rank",
      value: 4,
      icon: <Trophy className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-100",
    },
    {
      title: "Pending Reviews",
      value: 2,
      icon: <Clock className="w-6 h-6 text-rose-600" />,
      bg: "bg-rose-100",
    },
  ];
>>>>>>> origin/main-group-B

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
<<<<<<< HEAD
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
=======
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${item.bg}`}
          >
            {item.icon}
          </div>

          {/* Title */}
          <h3 className="text-sm font-medium text-slate-500">
            {item.title}
          </h3>

          {/* Animated Number */}
          <AnimatedNumber value={item.value} />
>>>>>>> origin/main-group-B
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

<<<<<<< HEAD
  return <span>{count}</span>;
=======
  return (
    <p className="text-3xl font-bold mt-2 text-slate-800">
      {typeof value === "number"
        ? value === 4
          ? `#${count}`
          : count
        : value}
    </p>
  );
>>>>>>> origin/main-group-B
};

export default SummaryCards;