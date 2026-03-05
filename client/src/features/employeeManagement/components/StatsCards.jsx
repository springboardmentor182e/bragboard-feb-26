import { motion } from "framer-motion";
function StatsCards({ employees }) {
  const total = employees.length;
  const active = employees.filter((e) => e.status === "Active").length;
  const suspended = employees.filter((e) => e.status === "Suspended").length;
  const admins = employees.filter((e) => e.role === "Admin").length;

  const cards = [
    { label: "Total", value: total },
    { label: "Active", value: active },
    { label: "Suspended", value: suspended },
    { label: "Admins", value: admins },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
        >
          <p className="text-sm text-slate-500">{card.label}</p>
          <h2 className="text-3xl font-bold mt-2 text-slate-800">
            {card.value}
          </h2>
        </motion.div>
      ))}
    </div>
  );
}

export default StatsCards;
