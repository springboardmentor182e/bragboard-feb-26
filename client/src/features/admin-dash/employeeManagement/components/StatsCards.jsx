import { motion } from "framer-motion";
import { Users, UserCheck, UserX, Shield } from "lucide-react";

function StatsCards({ employees }) {

  const total = employees.length;
  const active = employees.filter((e) => e.status === "Active").length;
  const suspended = employees.filter((e) => e.status === "Suspended").length;
  const admins = employees.filter((e) => e.role === "Admin").length;

  const cards = [
    {
      label: "Total Users",
      value: total,
      icon: <Users size={22} />,
      iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      label: "Active",
      value: active,
      icon: <UserCheck size={22} />,
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Suspended",
      value: suspended,
      icon: <UserX size={22} />,
      iconBg: "bg-rose-100 dark:bg-rose-900/30",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
    {
      label: "Admins",
      value: admins,
      icon: <Shield size={22} />,
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">

      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -4 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[28px] p-8 shadow-sm hover:shadow-md dark:hover:shadow-slate-950/50 transition-all duration-300"
        >

          {/* Icon */}
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${card.iconBg} ${card.iconColor}`}>
            {card.icon}
          </div>

          {/* Label */}
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-6 font-medium transition-colors">
            {card.label}
          </p>

          {/* Value */}
          <h2 className="text-4xl font-bold mt-2 text-slate-900 dark:text-white tracking-tight transition-colors">
            {card.value}
          </h2>

        </motion.div>
      ))}

    </div>
  );
}

export default StatsCards;