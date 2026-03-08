import { useState } from 'react';
import BadgePill from './BadgePill';
import ReactionBar from './ReactionBar';

export default function ShoutoutCard({ shoutout, onReaction, onComment }) {
  const [showComments, setShowComments] = useState(false);
  const { id, sender, recipient, badge, message, timeAgo, reactions, comments } = shoutout;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4 transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={sender.avatar}
            alt={sender.name}
            className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-50"
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
      <p className="text-gray-700 mt-4 text-sm leading-relaxed whitespace-pre-wrap">
        {message}
      </p>
      {showComments && comments && comments.length > 0 && (
        <div className="mt-5 pt-5 border-t border-gray-100 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 items-start">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
              <div className="bg-slate-50 rounded-2xl px-4 py-2 flex-1">
                <p className="text-xs font-bold text-gray-900">{comment.author}</p>
                <p className="text-sm text-gray-600 mt-0.5">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6">
        <ReactionBar 
          reactions={reactions} 
          shoutoutId={id} 
          onReaction={onReaction}
          onComment={onComment}
          showComments={showComments}
          onToggleComments={() => setShowComments(!showComments)}
        />
      </div>
    </div> 
  );
}