import { AlertTriangle, Eye, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard({ stats }) {
  const icons = [
    <AlertTriangle size={28} />,
    <Eye size={28} />,
    <CheckCircle size={28} />,
    <Clock size={28} />,
  ];

  const gradients = [
    "from-red-400 to-red-600",
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-yellow-400 to-yellow-600",
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          className={`p-6 rounded-2xl text-white shadow-lg bg-gradient-to-r ${gradients[i]} relative overflow-hidden`}
        >
          {/* Glow effect */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-20 rounded-full blur-2xl"></div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">{s.title}</p>
              <h2 className="text-3xl font-bold">{s.value}</h2>
            </div>

            <div className="bg-white/20 p-3 rounded-xl backdrop-blur">
              {icons[i]}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}