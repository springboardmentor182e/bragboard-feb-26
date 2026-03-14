import { useState } from 'react';
import { Heart, ThumbsUp, Star } from 'lucide-react';

const reactions = [
  { name: 'hearts', icon: Heart, color: 'text-red-500', hover: 'hover:text-red-700' },
  { name: 'claps', icon: ThumbsUp, color: 'text-blue-500', hover: 'hover:text-blue-700' },
  { name: 'stars', icon: Star, color: 'text-yellow-400', hover: 'hover:text-yellow-600' },
];

const ReactionBar = ({ initialReactions }) => {
  const [reactionCounts, setReactionCounts] = useState(initialReactions || {});
  const [activeReaction, setActiveReaction] = useState(null);

  const handleReact = (reactionName) => {
    const newCounts = { ...reactionCounts };

    if (activeReaction === reactionName) {
      // User is de-selecting a reaction
      newCounts[reactionName] = (newCounts[reactionName] || 1) - 1;
      setActiveReaction(null);
    } else {
      // A new reaction is selected
      if (activeReaction) {
        // Decrement the previously active reaction if there was one
        newCounts[activeReaction] = (newCounts[activeReaction] || 1) - 1;
      }
      newCounts[reactionName] = (newCounts[reactionName] || 0) + 1;
      setActiveReaction(reactionName);
    }

    setReactionCounts(newCounts);
  };

  return (
    <div className="flex items-center gap-4 bg-gray-100/60 p-2 rounded-full border border-gray-200/80">
      {reactions.map(({ name, icon: Icon, color, hover }) => (
        <button 
          key={name}
          onClick={() => handleReact(name)}
          className={`flex items-center gap-1.5 p-1 rounded-full transition-all duration-200 ${activeReaction === name ? color : 'text-gray-500'} ${hover}`}
        >
          <Icon size={20} />
          <span className="font-semibold text-sm">{reactionCounts[name] || 0}</span>
        </button>
      ))}
    </div>
  );
};

export default ReactionBar;
