import BadgePill from './BadgePill';
import ReactionBar from './ReactionBar';

export default function ShoutoutCard({ shoutout }) {
  const { sender, recipient, badge, message, timeAgo, reactions } = shoutout;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={sender.avatar}
            alt={sender.name}
            className="w-12 h-12 rounded-full object-cover shrink-0"
          />
          <div>
            <p className="font-bold text-gray-900 leading-snug">
              {sender.name}
              <span className="text-gray-400 font-normal mx-2">→</span>
              {recipient.name}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              {sender.role} · {timeAgo}
            </p>
          </div>
        </div>
        <BadgePill badge={badge} />
      </div>

      <p className="text-gray-700 mt-4 text-sm leading-relaxed">{message}</p>

      <ReactionBar reactions={reactions} />
    </div>
  );
}
