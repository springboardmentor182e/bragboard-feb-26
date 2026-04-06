import { AlertTriangle, Eye, CheckCircle, Clock } from "lucide-react";
import Card from "../../../components/ui/Card";

const ReportsStatsCards = ({ stats }) => {
  const statsData = [
    {
      title: "Pending",
      value: stats.pending,
      icon: AlertTriangle,
      color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    },
    {
      title: "Reviewing",
      value: stats.reviewing,
      icon: Eye,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      icon: CheckCircle,
      color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    },
    {
      title: "Avg Response Time",
      value: stats.avgResponseTime || "0s", // ✅ UPDATED
      icon: Clock,
      color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {statsData.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <Card
            key={index}
            className="p-6 flex items-center justify-between transition-colors duration-300"
          >
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">{stat.title}</p>

              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1 transition-colors">
                {stat.value}
              </p>
            </div>

            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${stat.color}`}
            >
              <Icon size={22} />
            </div>

          </Card>
        );
      })}

    </div>
  );
};

export default ReportsStatsCards;