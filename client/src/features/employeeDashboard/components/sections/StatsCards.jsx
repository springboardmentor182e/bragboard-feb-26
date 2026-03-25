import { Heart, Users, Gift } from "lucide-react";
import Card from "@/components/ui/Card";

const statsConfig = [
  {
    title: "Received This Week",
    value: 3,
    icon: Heart,
    gradient: "from-emerald-400 to-green-500",
    bg: "from-emerald-50 to-green-50",
  },
  {
    title: "People Recognized",
    value: 5,
    icon: Users,
    gradient: "from-indigo-400 to-purple-500",
    bg: "from-indigo-50 to-purple-50",
  },
  {
    title: "Points Earned",
    value: "+250",
    icon: Gift,
    gradient: "from-amber-400 to-yellow-500",
    bg: "from-amber-50 to-yellow-50",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statsConfig.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className={`
              relative
              rounded-2xl
              p-6
              bg-gradient-to-br ${stat.bg}
              border border-white/40
              shadow-[0_10px_30px_rgba(0,0,0,0.06)]
              backdrop-blur-md
              hover:-translate-y-1 hover:shadow-xl
              transition-all duration-300
              overflow-hidden
            `}
          >
            {/* Glow background */}
            <div className="absolute inset-0 opacity-20 bg-white blur-2xl"></div>

            {/* Top icon */}
            <div
              className={`
                w-12 h-12 rounded-xl
                flex items-center justify-center
                bg-gradient-to-r ${stat.gradient}
                text-white
                shadow-md
              `}
            >
              <Icon size={22} />
            </div>

            {/* Value */}
            <p className="text-3xl font-bold text-slate-900 mt-6">
              {stat.value}
            </p>

            {/* Label */}
            <p className="text-sm text-slate-600 mt-1">
              {stat.title}
            </p>

            {/* Accent dot */}
            <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-green-400 rounded-full shadow-md shadow-green-400/50"></div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;