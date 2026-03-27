import { useState, useEffect } from "react";
import { X } from "lucide-react";

const AddAchievementModal = ({
  isOpen,
  setIsOpen,
  setAchievements,
  editingIndex,
  setEditingIndex,
  achievements,
}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [points, setPoints] = useState("");

  useEffect(() => {
    if (editingIndex !== null) {
      const item = achievements[editingIndex];
      setTitle(item.title);
      setCategory(item.category);
      setPoints(item.points);
    }
  }, [editingIndex, achievements]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedAchievement = {
      title,
      category,
      points: Number(points),
      status: "Pending",
    };

    if (editingIndex !== null) {
      setAchievements((prev) =>
        prev.map((item, index) =>
          index === editingIndex ? updatedAchievement : item
        )
      );
      setEditingIndex(null);
    } else {
      setAchievements((prev) => [updatedAchievement, ...prev]);
    }

    setIsOpen(false);
    setTitle("");
    setCategory("");
    setPoints("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-black/40 w-full max-w-md p-6 relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsOpen(false);
            setEditingIndex(null);
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {editingIndex !== null ? "Edit Achievement" : "Add Achievement"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Fill in the details below
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Points */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Points
            </label>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setEditingIndex(null);
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm"
            >
              {editingIndex !== null ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAchievementModal;