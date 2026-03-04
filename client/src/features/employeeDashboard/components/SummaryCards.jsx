import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.12, duration: 0.4 }}
          whileHover={{ scale: 1.03 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200 p-6 transition-all duration-300"
        >
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
        </motion.div>
      ))}
    </div>
  );
};

/* 🔥 Animated Counter Component */
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

  return (
    <p className="text-3xl font-bold mt-2 text-slate-800">
      {typeof value === "number"
        ? value === 4
          ? `#${count}`
          : count
        : value}
    </p>
  );
};

export default SummaryCards;