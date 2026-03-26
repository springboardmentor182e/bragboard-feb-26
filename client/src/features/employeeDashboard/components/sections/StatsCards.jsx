import { Heart, Users, Gift } from "lucide-react";

const statsConfig = [
  {
    title: "Received",
    value: 3,
    icon: Heart,
    gradient: "from-emerald-400 to-green-500",
  },
  {
    title: "Recognized",
    value: 5,
    icon: Users,
    gradient: "from-indigo-400 to-purple-500",
  },
  {
    title: "Points",
    value: "+250",
    icon: Gift,
    gradient: "from-amber-400 to-orange-500",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

      {statsConfig.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className="
              group relative overflow-hidden
              rounded-2xl p-5
              bg-gradient-to-br from-white to-slate-50
              border border-slate-200/70
              shadow-sm
              hover:shadow-xl hover:-translate-y-1
              transition-all duration-300
            "
          >

            {/* Glow Background */}
            <div
              className={`absolute -top-8 -right-8 w-28 h-28 bg-gradient-to-r ${stat.gradient} opacity-20 blur-3xl group-hover:opacity-30 transition`}
            />

            {/* Subtle Border Glow on Hover */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-indigo-200 transition" />

            <div className="flex items-center justify-between relative z-10">

              {/* TEXT */}
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                  {stat.title}
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                  {stat.value}
                </p>
              </div>

              {/* ICON */}
              <div
                className={`
                  w-12 h-12 rounded-xl
                  bg-gradient-to-r ${stat.gradient}
                  text-white flex items-center justify-center
                  shadow-lg
                  group-hover:scale-110 transition
                `}
              >
                <Icon size={20} />
              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default StatsCards;