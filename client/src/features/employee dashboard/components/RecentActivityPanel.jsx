import { Activity, Trash2 } from 'lucide-react';
import { useShoutouts } from '../../../context/ShoutoutContext';

export default function RecentActivityPanel() {
  const { activities, deleteActivity } = useShoutouts();
  const currentUserId = 6; // match current user identity (e.g., Alex Thompson)

  const handleDeleteActivity = (activityId) => {
    if (!window.confirm('Delete this activity?')) return;
    deleteActivity(activityId, currentUserId);
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={20} className="text-primary" strokeWidth={2} />
        <h3 className="font-bold text-gray-900">Recent Activity</h3>
      </div>

      <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
        {(!activities || activities.length === 0) ? (
          <p className="text-sm text-gray-500">No recent activity yet.</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm text-gray-800 leading-snug">{activity.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time_ago}</p>
                </div>
              </div>
              {activity.user_id === currentUserId && (
                <button
                  onClick={() => handleDeleteActivity(activity.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                  aria-label="Delete activity"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}