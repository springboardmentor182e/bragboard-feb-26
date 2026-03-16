import { useEffect, useState } from "react";
import {
  getAchievementsByEmployee,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../services/achievementService";

const useAchievements = (selectedEmployee) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedEmployee) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getAchievementsByEmployee(selectedEmployee.id);
        setAchievements(res.data);
      } catch (err) {
        console.error("Failed to load achievements", err);
        setError("Failed to load achievements.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [selectedEmployee]);

  const addAchievement = async (data) => {
    const res = await createAchievement({
      ...data,
      employee_id: selectedEmployee.id,
    });
    setAchievements((prev) => [res.data, ...prev]);
    return res.data;
  };

  const editAchievement = async (id, data) => {
    const res = await updateAchievement(id, data);
    setAchievements((prev) =>
      prev.map((a) => (a.id === id ? res.data : a))
    );
    return res.data;
  };

  const removeAchievement = async (id) => {
    await deleteAchievement(id);
    setAchievements((prev) => prev.filter((a) => a.id !== id));
  };

  return {
    achievements,
    loading,
    error,
    addAchievement,
    editAchievement,
    removeAchievement,
  };
};

export default useAchievements;