import { Activity } from 'lucide-react';
import { activities } from '../../../data/mockData';

export default function RecentActivityPanel() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={20} className="text-primary" strokeWidth={2} />
        <h3 className="font-bold text-gray-900">Recent Activity</h3>
      </div>
      <div className="flex flex-col gap-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
            <div>
              <p className="text-sm text-gray-800 leading-snug">{activity.text}</p>
              <p className="text-xs text-gray-400 mt-0.5">{activity.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
