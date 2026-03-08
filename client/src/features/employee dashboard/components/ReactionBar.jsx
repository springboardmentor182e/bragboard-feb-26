import { Heart, ThumbsUp, Star, MessageCircle } from 'lucide-react';

export default function ReactionBar({ reactions }) {
  const items = [
    { icon: Heart, count: reactions.heart },
    { icon: ThumbsUp, count: reactions.thumbsUp },
    { icon: Star, count: reactions.star },
    { icon: MessageCircle, count: reactions.comment },
  ];

  return (
    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
      {items.map(({ icon: Icon, count }, i) => (
        <button
          key={i}
          className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors text-sm cursor-pointer"
        >
          <Icon size={18} strokeWidth={1.5} />
          <span>{count}</span>
        </button>
      ))}
    </div>
  );
}
