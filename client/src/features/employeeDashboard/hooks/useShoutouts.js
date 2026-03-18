import { useEffect, useState } from "react";
import { getShoutouts, reactToShoutout } from "../services/shoutoutService";
import { createComment } from "../services/commentService";

const useShoutouts = (selectedEmployee) => {
  const [shoutouts, setShoutouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedEmployee) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getShoutouts();
        setShoutouts(res.data);
      } catch (err) {
        console.error("Failed to load shoutouts", err);
        setError("Failed to load shoutouts.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [selectedEmployee]);

  const addShoutout = (newShoutout) => {
    setShoutouts((prev) => [newShoutout, ...prev]);
  };

  const handleReaction = async (shoutoutId, reaction) => {
    try {
      const res = await reactToShoutout(shoutoutId, reaction);
      setShoutouts((prev) =>
        prev.map((s) => (s.id === shoutoutId ? res.data : s))
      );
    } catch (err) {
      console.error("Reaction failed", err);
    }
  };

  const handleComment = async (shoutoutId, text) => {
    if (!selectedEmployee) return;
    try {
      const res = await createComment({
        shoutout_id: shoutoutId,
        author_id: selectedEmployee.id,
        text,
      });
      setShoutouts((prev) =>
        prev.map((s) =>
          s.id === shoutoutId
            ? { ...s, comments: [...(s.comments ?? []), res.data] }
            : s
        )
      );
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  return {
    shoutouts,
    loading,
    error,
    addShoutout,
    handleReaction,
    handleComment,
  };
};

export default useShoutouts;