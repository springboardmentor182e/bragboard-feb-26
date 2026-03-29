import { AlertTriangle, Eye, CheckCircle, Clock } from "lucide-react";
import Card from "../../../components/ui/Card";

const ReportsStatsCards = ({ stats }) => {
  const statsData = [
    {
      title: "Pending",
      value: stats.pending,
      icon: AlertTriangle,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Reviewing",
      value: stats.reviewing,
      icon: Eye,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Avg Response Time",
      value: stats.avgResponseTime || "0s", // ✅ UPDATED
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {statsData.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <Card
            key={index}
            className="p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-slate-500">{stat.title}</p>

              <p className="text-3xl font-bold text-slate-900 mt-1">
                {stat.value}
              </p>
            </div>

            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}
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