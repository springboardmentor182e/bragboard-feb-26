import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SummaryCards = () => {
  const stats = [
    { title: "Total Points", value: 2450 },
    { title: "Achievements", value: 18 },
    { title: "Rank", value: 4 },
    { title: "Pending Reviews", value: 2 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl
                     rounded-2xl shadow-lg dark:shadow-black/30
                     border border-gray-200 dark:border-gray-700
                     p-6 transition-all duration-300"
        >
          <h3 className="text-sm text-gray-500 dark:text-gray-400">
            {item.title}
          </h3>

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
    <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-100">
      {typeof value === "number"
        ? value === 4
          ? `#${count}`
          : count
        : value}
    </p>
  );
};

export default SummaryCards;