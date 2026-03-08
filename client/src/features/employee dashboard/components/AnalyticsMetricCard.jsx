import { MessageSquare, Heart, Users, TrendingUp } from 'lucide-react';

const ICON_CONFIG = {
  shoutouts: { icon: MessageSquare, iconClass: 'text-primary',    bgClass: 'bg-primary-light' },
  reactions:  { icon: Heart,         iconClass: 'text-rose-500',   bgClass: 'bg-rose-50' },
  users:      { icon: Users,         iconClass: 'text-emerald-600', bgClass: 'bg-emerald-50' },
};

export default function AnalyticsMetricCard({ label, value, trend, iconKey }) {
  const { icon: Icon, iconClass, bgClass } = ICON_CONFIG[iconKey];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${bgClass}`}>
          <Icon size={22} className={iconClass} strokeWidth={1.8} />
        </div>
        <span className="flex items-center gap-1 text-emerald-600 font-semibold text-sm">
          <TrendingUp size={15} strokeWidth={2} />
          {trend}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-4xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
