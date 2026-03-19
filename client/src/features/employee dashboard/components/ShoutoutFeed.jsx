import ShoutoutCard from './ShoutoutCard';
import { useShoutouts } from '../../../context/ShoutoutContext';

export default function ShoutoutFeed() {
  const currentUserId = 1; // Current logged-in user (Jessica Park) - should be replaced with actual auth
  const { shoutouts, addReaction, addComment, deleteShoutout, deleteComment, reactingTo } = useShoutouts();

  const handleReaction = (shoutoutId, reactionType) => {
    addReaction(shoutoutId, reactionType);
  };

  const handleComment = (shoutoutId, commentText) => {
    addComment(shoutoutId, commentText);
  };

  const handleDeleteShoutout = (shoutoutId) => {
    if (window.confirm('Delete this shoutout?')) {
      deleteShoutout(shoutoutId, currentUserId);
    }
  };

  const handleDeleteComment = (shoutoutId, commentId) => {
    if (window.confirm('Delete this comment?')) {
      deleteComment(shoutoutId, commentId);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {shoutouts.map((shoutout) => (
        <ShoutoutCard 
          key={shoutout.id} 
          shoutout={shoutout} 
          onReaction={handleReaction}
          onComment={handleComment}
          onDeleteShoutout={handleDeleteShoutout}
          onDeleteComment={handleDeleteComment}
          reactingTo={reactingTo}
        />
      ))}
    </div>
  );
}