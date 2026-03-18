import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createAchievement, updateAchievement } from "../services/achievementService";

const EMPTY_FORM = { title: "", description: "", points: "" };

const AddAchievementModal = ({
  isOpen,
  setIsOpen,
  selectedEmployee,
  editingAchievement,
  setEditingAchievement,
  onSave,
}) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pre-fill form when editing, reset when adding new
  useEffect(() => {
    if (!isOpen) return;
    if (editingAchievement) {
      setForm({
        title:       editingAchievement.title,
        description: editingAchievement.description ?? "",
        points:      editingAchievement.points,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setError(null);
  }, [isOpen, editingAchievement]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingAchievement(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEmployee) return;

    setLoading(true);
    setError(null);

    try {
      const payload = {
        title:       form.title,
        description: form.description,
        points:      Number(form.points),
        employee_id: selectedEmployee.id,
      };

      let saved;
      if (editingAchievement) {
        const res = await updateAchievement(editingAchievement.id, payload);
        saved = res.data;
      } else {
        const res = await createAchievement(payload);
        saved = res.data;
      }

      onSave(saved);
      handleClose();
    } catch (err) {
      console.error("Failed to save achievement", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-black/40 w-full max-w-md p-6 relative animate-fadeIn">

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {editingAchievement ? "Edit Achievement" : "Add Achievement"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {selectedEmployee
              ? `For: ${selectedEmployee.name}`
              : "No employee selected"}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-2">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition resize-none"
            />
          </div>

          {/* Points */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Points
            </label>
            <input
              name="points"
              type="number"
              min={0}
              value={form.points}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : editingAchievement ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAchievementModal;