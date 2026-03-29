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
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      label: "Active",
      value: active,
      icon: <UserCheck size={22} />,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      label: "Suspended",
      value: suspended,
      icon: <UserX size={22} />,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
    },
    {
      label: "Admins",
      value: admins,
      icon: <Shield size={22} />,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
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
          className="bg-white border border-slate-200 rounded-[28px] p-8 shadow-sm hover:shadow-md transition-all duration-300"
        >

          {/* Icon */}
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.iconBg} ${card.iconColor}`}>
            {card.icon}
          </div>

          {/* Label */}
          <p className="text-sm text-slate-500 mt-6 font-medium">
            {card.label}
          </p>

          {/* Value */}
          <h2 className="text-4xl font-bold mt-2 text-slate-900 tracking-tight">
            {card.value}
          </h2>

        </motion.div>
      ))}

    </div>
  );
}

export default StatsCards;