import { useState } from 'react';
import { Heart, ThumbsUp, Star, MessageCircle, Send } from 'lucide-react';

export default function ReactionBar({ reactions, shoutoutId, onReaction, onComment, onToggleComments, showComments }) {
  const [commentText, setCommentText] = useState('');
  
  const reactionTypes = ['heart', 'thumbsUp', 'star'];
  const icons = [Heart, ThumbsUp, Star];
  
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentText.trim() && onComment) {
      onComment(shoutoutId, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="flex items-center gap-4">
      {reactionTypes.map((reactionType, i) => {
        const Icon = icons[i];
        return (
          <button
            key={reactionType}
            onClick={() => onReaction && onReaction(shoutoutId, reactionType)}
            className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors text-sm cursor-pointer"
          >
            <Icon size={18} strokeWidth={1.5} />
            <span>{reactions[reactionType]}</span>
          </button>
        );
      })}
      
      <button
        onClick={onToggleComments}
        className={`flex items-center gap-1.5 transition-colors text-sm cursor-pointer ${
          showComments ? 'text-blue-500' : 'text-gray-400'
        }`}
      >
        <MessageCircle size={18} strokeWidth={1.5} />
        <span>{reactions.comment}</span>
      </button>
      
      {showComments && (
        <form onSubmit={handleSubmitComment} className="flex-1 flex gap-2 ml-4">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
          />
          <button 
            type="submit"
            className="p-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            <Send size={14} />
          </button>
        </form>
      )}
    </div>
  );
}