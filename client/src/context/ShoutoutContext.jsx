import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { shoutouts as mockShoutouts, activities as mockActivities } from '../data/mockData';

const API_BASE_URL = 'http://localhost:8000';
const ShoutoutContext = createContext();

export function ShoutoutProvider({ children }) {
  const [shoutouts, setShoutouts] = useState(mockShoutouts);
  const [activities, setActivities] = useState(mockActivities);
  const [loading, setLoading] = useState(false);
  const [reactingTo, setReactingTo] = useState(null); // Track which shoutout is reacting

  // Fetch shoutouts from API
  const fetchShoutouts = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/dashboard/shoutouts`);
      setShoutouts(response.data);
    } catch (error) {
      console.error('Error fetching shoutouts:', error);
      setShoutouts(mockShoutouts);
    }
  }, []);

  // Fetch activities from API
  const fetchActivities = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/dashboard/activities`);
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setActivities(mockActivities);
    }
  }, []);

  const deleteActivity = async (activityId, userId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/dashboard/activities/${activityId}?user_id=${userId}`);
      await fetchActivities();
    } catch (error) {
      console.error('Error deleting activity:', error);
      throw error;
    }
  };

  // Fetch both on mount
  useEffect(() => {
    fetchShoutouts();
    fetchActivities();
  }, [fetchShoutouts, fetchActivities]);

  const addShoutout = async (newShoutout) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/dashboard/shoutouts`, {
        recipientIds: newShoutout.recipientIds,
        badgeId: newShoutout.badgeId,
        message: newShoutout.message,
      });
      // Refresh shoutouts and activities after adding
      await fetchShoutouts();
      await fetchActivities();
      return response.data;
    } catch (error) {
      console.error('Error creating shoutout:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addReaction = async (shoutoutId, reactionType) => {
    // Prevent multiple simultaneous reactions to same shoutout
    if (reactingTo === shoutoutId) {
      return;
    }

    try {
      setReactingTo(shoutoutId);
      // Convert reaction type name to API format
      let apiReactionType = reactionType.toLowerCase();
      if (apiReactionType === 'thumbsup') {
        apiReactionType = 'thumbs_up';
      }
      
      await axios.post(`${API_BASE_URL}/api/dashboard/shoutouts/${shoutoutId}/react?reaction=${apiReactionType}`);
      // Refresh shoutouts and activities after reaction
      await fetchShoutouts();
      await fetchActivities();
    } catch (error) {
      console.error('Error adding reaction:', error);
    } finally {
      setReactingTo(null);
    }
  };

  const addComment = async (shoutoutId, commentText) => {
    try {
      await axios.post(`${API_BASE_URL}/api/dashboard/shoutouts/${shoutoutId}/comments`, {
        text: commentText
      });
      // Refresh shoutouts and activities after adding comment
      await fetchShoutouts();
      await fetchActivities();
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  const deleteShoutout = async (shoutoutId, userId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/dashboard/shoutouts/${shoutoutId}?user_id=${userId}`);
      await fetchShoutouts();
      await fetchActivities();
    } catch (error) {
      console.error('Error deleting shoutout:', error);
      throw error;
    }
  };

  const deleteComment = async (shoutoutId, commentId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/dashboard/shoutouts/${shoutoutId}/comments/${commentId}`);
      await fetchShoutouts();
      await fetchActivities();
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  };

  return (
    <ShoutoutContext.Provider 
      value={{ 
        shoutouts, 
        activities, 
        addShoutout, 
        addReaction,
        addComment,
        deleteShoutout,
        deleteComment,
        deleteActivity,
        loading,
        reactingTo,
        fetchShoutouts,
        fetchActivities 
      }}
    >
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
