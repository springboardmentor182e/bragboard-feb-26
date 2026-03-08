import { createContext, useContext, useState, useEffect } from 'react';
import { shoutouts as initialShoutouts, activities as initialActivities, teamMembers } from '../data/mockData';

const ShoutoutContext = createContext();

function parseLocalStorage(key, defaultValue) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    localStorage.removeItem(key); // Clear corrupted data
    return defaultValue;
  }
}

export function ShoutoutProvider({ children }) {
  // Initialize from localStorage or use defaults with error handling
  const [shoutouts, setShoutouts] = useState(() => 
    parseLocalStorage('shoutouts', initialShoutouts)
  );
  
  const [activities, setActivities] = useState(() => 
    parseLocalStorage('activities', initialActivities)
  );

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('shoutouts', JSON.stringify(shoutouts));
  }, [shoutouts]);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  const addShoutout = (newShoutout) => {
    const currentUser = {
      name: 'Alex Thompson',
      role: 'Admin',
      avatar: 'https://i.pravatar.cc/40?u=alex-thompson-admin',
    };
    
    const recipient = teamMembers.find(m => m.name === newShoutout.recipientName) || {
      name: newShoutout.recipientName,
      role: 'Employee',
      avatar: 'https://i.pravatar.cc/40?u=default',
    };
    
    const shoutout = {
      id: Date.now(),
      sender: currentUser,
      recipient: recipient,
      badge: newShoutout.badge,
      message: newShoutout.message,
      timeAgo: 'Just now',
      reactions: { heart: 0, thumbsUp: 0, star: 0, comment: 0 },
      comments: [],
      userReactions: {},
    };
    setShoutouts([shoutout, ...shoutouts]);
    
    setActivities([
      {
        id: Date.now(),
        user: currentUser,
        action: 'shoutout',
        target: recipient,
        timeAgo: 'Just now',
      },
      ...activities,
    ]);
  };

  const addReaction = (shoutoutId, reactionType) => {
    setShoutouts(shoutouts.map(s => {
      if (s.id === shoutoutId) {
        const hasReacted = s.userReactions && s.userReactions[reactionType];
        return {
          ...s,
          reactions: {
            ...s.reactions,
            [reactionType]: hasReacted 
              ? s.reactions[reactionType] - 1 
              : s.reactions[reactionType] + 1,
          },
          userReactions: {
            ...s.userReactions,
            [reactionType]: !hasReacted,
          },
        };
      }
      return s;
    }));
  };

  const addComment = (shoutoutId, commentText) => {
    const newComment = {
      id: Date.now(),
      author: 'Alex Thompson',
      avatar: 'https://i.pravatar.cc/40?u=alex-thompson-admin',
      text: commentText,
      timeAgo: 'Just now',
    };
    
    setShoutouts(shoutouts.map(s => {
      if (s.id === shoutoutId) {
        return {
          ...s,
          reactions: {
            ...s.reactions,
            comment: s.reactions.comment + 1,
          },
          comments: [...(s.comments || []), newComment],
        };
      }
      return s;
    }));
  };

  // Calculate dynamic team member stats from actual shoutouts
  const getTeamMemberStats = () => {
    const statsMap = {};
    
    // Initialize stats for all team members
    teamMembers.forEach(member => {
      statsMap[member.name] = {
        ...member,
        shoutOuts: 0,
        claps: 0,
        stars: 0,
      };
    });
    
    // Count from shoutouts (recipient = shoutOuts)
    shoutouts.forEach(shoutout => {
      const recipientName = shoutout.recipient?.name;
      if (recipientName && statsMap[recipientName]) {
        statsMap[recipientName].shoutOuts += 1;
        statsMap[recipientName].claps += (shoutout.reactions?.heart || 0) + (shoutout.reactions?.thumbsUp || 0);
        statsMap[recipientName].stars += shoutout.reactions?.star || 0;
      }
    });
    
    return Object.values(statsMap);
  };

  return (
    <ShoutoutContext.Provider value={{ shoutouts, activities, addShoutout, addReaction, addComment, getTeamMemberStats }}>
      {children}
    </ShoutoutContext.Provider>
  );
}

export function useShoutouts() {
  const context = useContext(ShoutoutContext);
  if (!context) {
    throw new Error('useShoutouts must be used within a ShoutoutProvider');
  }
  return context;
}
