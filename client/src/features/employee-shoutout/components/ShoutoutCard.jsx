import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Avatar from './Avatar';
import CommentSection from './CommentSection';
import ReactionBar from './ReactionBar';

const ShoutoutCard = ({ shoutout, type, onEdit, onDelete }) => {
  const isReceived = type === 'received';
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 border border-gray-200/80 hover:border-purple-300 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <Avatar name={isReceived ? shoutout.author : shoutout.recipient} />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                {isReceived ? 'From:' : 'To:'} <span className="font-bold text-purple-700">{isReceived ? shoutout.author : shoutout.recipient}</span>
              </p>
              <p className="mt-2 text-gray-800 text-lg">{shoutout.message}</p>
            </div>
            <div className="text-xs text-gray-400 whitespace-nowrap pl-4">
              {new Date(shoutout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <ReactionBar initialReactions={shoutout.reactions} />
            <div className="flex items-center gap-2">
              {type === 'given' && (
                <>
                  <button onClick={() => onEdit(shoutout)} className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => onDelete(shoutout)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </>
              )}
              <button onClick={() => setIsCommentSectionOpen(!isCommentSectionOpen)} className="text-sm font-semibold text-purple-600 hover:underline">
                {isCommentSectionOpen ? 'Hide Comments' : 'Show Comments'}
              </button>
            </div>
          </div>
          {isCommentSectionOpen && <CommentSection initialComments={shoutout.comments} />}
        </div>
      </div>
    </div>
  );
};

export default ShoutoutCard;
