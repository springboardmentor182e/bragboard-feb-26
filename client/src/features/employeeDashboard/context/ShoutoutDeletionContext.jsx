import React, { createContext, useContext, useCallback, useState } from "react";

/**
 * ShoutoutDeletionContext - Broadcasts shoutout deletion events
 * Allows all components displaying shoutouts to listen and refetch data
 */
const ShoutoutDeletionContext = createContext();

/**
 * ShoutoutDeletionProvider - Wraps components to provide deletion broadcast
 */
export const ShoutoutDeletionProvider = ({ children }) => {
  const [deletionCounter, setDeletionCounter] = useState(0);
  const [lastDeletedId, setLastDeletedId] = useState(null);

  // Notify all listeners that a shoutout was deleted
  // Uses a counter that increments, so components can detect changes via dependency array
  const notifyShoutoutDeleted = useCallback((shoutoutId) => {
    setLastDeletedId(shoutoutId);
    setDeletionCounter((prev) => prev + 1);
  }, []);

  const value = { deletionCounter, lastDeletedId, notifyShoutoutDeleted };

  return (
    <ShoutoutDeletionContext.Provider value={value}>
      {children}
    </ShoutoutDeletionContext.Provider>
  );
};

/**
 * useShoutoutDeletion Hook - Subscribe to deletion notifications
 */
export const useShoutoutDeletion = () => {
  const context = useContext(ShoutoutDeletionContext);
  if (!context) {
    throw new Error(
      "useShoutoutDeletion must be used within ShoutoutDeletionProvider"
    );
  }
  return context;
};

export default ShoutoutDeletionContext;
