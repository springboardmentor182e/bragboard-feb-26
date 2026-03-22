import { useState } from 'react';
import Avatar from './Avatar';

const CommentSection = ({ initialComments = [] }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: `c${Date.now()}`,
      author: 'Me', // Placeholder for the current user
      message: newComment,
      date: new Date().toISOString(),
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  return (
    <div className="pt-4 mt-4 border-t-2 border-gray-100">
      <form onSubmit={handleSubmit} className="mt-4 flex gap-3 items-center">
        <Avatar name="Me" />
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 p-3 bg-gray-100 border border-transparent rounded-full focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
        />
        <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          Post
        </button>
      </form>

      <div className="space-y-4 mt-6">
        {comments.map(comment => (
          <div key={comment.id} className="flex items-start gap-3">
            <Avatar name={comment.author} />
            <div className="flex-1 bg-gray-50 rounded-xl p-3">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-sm text-purple-800">{comment.author}</p>
                <p className="text-xs text-gray-400">{new Date(comment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
              <p className="text-gray-700 mt-1">{comment.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
