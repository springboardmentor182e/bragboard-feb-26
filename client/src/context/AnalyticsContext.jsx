import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const AnalyticsContext = createContext();

export function AnalyticsProvider({ children }) {
  const [badges, setBadges] = useState([]);
  const [users, setUsers] = useState([]);
  const [shoutouts, setShoutouts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBadges = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/dashboard/badges`);
      setBadges(response.data);
    } catch (err) {
      console.error('Error fetching badges:', err);
      setError(err.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/dashboard/users`);
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchShoutouts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/dashboard/shoutouts`);
      setShoutouts(response.data);
    } catch (err) {
      console.error('Error fetching shoutouts:', err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/dashboard/notifications`);
      setNotifications(response.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/dashboard/activities`);
      setActivities(response.data);
    } catch (err) {
      console.error('Error fetching activities:', err);
    }
  };

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        fetchBadges(),
        fetchUsers(),
        fetchShoutouts(),
        fetchNotifications(),
        fetchActivities()
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <AnalyticsContext.Provider value={{
      badges,
      users,
      shoutouts,
      notifications,
      activities,
      loading,
      error,
      fetchBadges,
      fetchUsers,
      fetchShoutouts,
      fetchNotifications,
      fetchActivities,
      fetchAll
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

