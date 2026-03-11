import { useState } from 'react';
import { Heart, ThumbsUp, Star, MessageCircle, Send } from 'lucide-react';

export default function ReactionBar({ reactions, shoutoutId, onReaction, onComment, onToggleComments, showComments, reactingTo }) {
  const [commentText, setCommentText] = useState('');
  const isReacting = reactingTo === shoutoutId;
  
  // Map reaction types to their display values
  const reactionMap = [
    { key: 'heart', icon: Heart, label: 'Heart' },
    { key: 'thumbs_up', icon: ThumbsUp, label: 'ThumbsUp' },
    { key: 'star', icon: Star, label: 'Star' }
  ];
  
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentText.trim() && onComment) {
      onComment(shoutoutId, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="flex items-center gap-4">
      {reactionMap.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          onClick={() => onReaction && onReaction(shoutoutId, label)}
          disabled={isReacting}
          className={`flex items-center gap-1.5 transition-colors text-sm ${
            isReacting 
              ? 'text-gray-300 cursor-not-allowed opacity-50' 
              : 'text-gray-400 hover:text-red-500 cursor-pointer'
          }`}
        >
          <Icon size={18} strokeWidth={1.5} />
          <span>{reactions[key] || 0}</span>
        </button>
      ))}
      
      <button
        onClick={onToggleComments}
        disabled={isReacting}
        className={`flex items-center gap-1.5 transition-colors text-sm ${
          isReacting 
            ? 'text-gray-300 cursor-not-allowed opacity-50'
            : showComments ? 'text-blue-500 cursor-pointer' : 'text-gray-400 cursor-pointer'
        }`}
      >
        <MessageCircle size={18} strokeWidth={1.5} />
        <span>{reactions.comment || 0}</span>
      </button>
      
      {showComments && (
        <form onSubmit={handleSubmitComment} className="flex-1 flex gap-2 ml-4">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isReacting}
            placeholder="Write a comment..."
            className={`flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary ${
              isReacting ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          />
          <button 
            type="submit"
            disabled={isReacting}
            className={`p-1.5 rounded-lg transition-colors ${
              isReacting 
                ? 'bg-gray-300 cursor-not-allowed text-gray-400' 
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
          >
            <Send size={14} />
          </button>
        </form>
      )}
    </div>
  );
}