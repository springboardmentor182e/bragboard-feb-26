import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import BadgePill from './BadgePill';
import ReactionBar from './ReactionBar';

export default function ShoutoutCard({ shoutout, onReaction, onComment, onDeleteShoutout, onDeleteComment, reactingTo }) {
  const currentUserId = 1; // Current logged-in user (Jessica Park) - should be replaced with actual auth
  const [showComments, setShowComments] = useState(false);
  const { id, sender_id, sender, recipient, badge, message, time_ago, reactions, comments } = shoutout;

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
              {sender.role} · {time_ago}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <BadgePill badge={badge} />
          {onDeleteShoutout && sender_id === currentUserId && (
            <button
              onClick={() => onDeleteShoutout(id)}
              className="text-red-500 hover:text-red-700 p-1 rounded-full"
              aria-label="Delete shoutout"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
      <p className="text-gray-700 mt-4 text-sm leading-relaxed whitespace-pre-wrap">
        {message}
      </p>
      {showComments && comments && comments.length > 0 && (
        <div className="mt-5 pt-5 border-t border-gray-100 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 items-start justify-between">
              <div className="flex gap-3 items-start flex-1">
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
              {onDeleteComment && (
                <button
                  onClick={() => onDeleteComment(id, comment.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full"
                  aria-label="Delete comment"
                >
                  <Trash2 size={14} />
                </button>
              )}
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
          reactingTo={reactingTo}
        />
      </div>
    </div> 
  );
}