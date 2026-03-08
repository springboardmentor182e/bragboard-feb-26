import ShoutoutCard from './ShoutoutCard';
import { useShoutouts } from '../../../context/ShoutoutContext';

export default function ShoutoutFeed() {
  const { shoutouts, addReaction, addComment } = useShoutouts();

  const handleReaction = (shoutoutId, reactionType) => {
    addReaction(shoutoutId, reactionType);
  };

  const handleComment = (shoutoutId, commentText) => {
    addComment(shoutoutId, commentText);
  };

  return (
    <div className="flex flex-col gap-4">
      {shoutouts.map((shoutout) => (
        <ShoutoutCard 
          key={shoutout.id} 
          shoutout={shoutout} 
          onReaction={handleReaction}
          onComment={handleComment}
        />
      ))}
    </div>
  );
}