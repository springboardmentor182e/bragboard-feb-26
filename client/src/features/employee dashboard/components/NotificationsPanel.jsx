import { Bell } from 'lucide-react';
import { useAnalytics } from '../../../context/AnalyticsContext';

export default function NotificationsPanel() {
  const { notifications } = useAnalytics();

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Bell size={20} className="text-gray-800" strokeWidth={1.8} />
        <h3 className="font-bold text-gray-900">Recent Notifications</h3>
      </div>
      <div className="flex flex-col gap-2">
        {notifications?.map((n) => (
          <div key={n.id} className="bg-slate-100 rounded-lg px-4 py-3 text-sm text-gray-700 leading-snug">
            {n.text}
          </div>
        ))}
      </div>
    </div>
  );
}
