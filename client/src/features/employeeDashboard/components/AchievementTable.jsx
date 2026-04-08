import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import AddAchievementModal from "./AddAchievementModal"; // ✅ clean import
import useAchievements from "../hooks/useAchievements";

const statusClass = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
};

const AchievementTable = ({ selectedEmployee }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);

  const {
    achievements,
    loading,
    addAchievement,
    editAchievement,
    removeAchievement,
  } = useAchievements(selectedEmployee);

  // ✅ 🔥 MAIN FIX (VERY IMPORTANT)
  const safeAchievements = Array.isArray(achievements) ? achievements : [];

  const handleSave = async (saved) => {
    if (editingAchievement) {
      await editAchievement(editingAchievement.id, saved);
    } else {
      await addAchievement(saved);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-200 dark:border-gray-700 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Recent Achievements
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage and track your performance
          </p>
        </div>

        <button
          onClick={() => {
            setEditingAchievement(null);
            setIsOpen(true);
          }}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
        >
          + Add Achievement
        </button>
      </div>

      {/* 🔄 LOADING */}
      {loading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-12 rounded-lg bg-gray-100 dark:bg-slate-700 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* ❌ EMPTY */}
      {!loading && safeAchievements.length === 0 && (
        <p className="text-sm text-center text-gray-400 dark:text-slate-500 py-8">
          No achievements yet. Add your first one!
        </p>
      )}

      {/* ✅ TABLE */}
      {!loading && safeAchievements.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-xs uppercase tracking-wider text-slate-500">
                <th className="pb-3">Title</th>
                <th>Points</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {safeAchievements.map((item) => (
                <tr
                  key={item.id ?? Math.random()}
                  className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
                >
                  <td className="py-4 font-semibold text-slate-800 dark:text-slate-100">
                    {item.title ?? "Untitled"}
                    {item.description && (
                      <p className="text-xs font-normal text-slate-400 mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </td>

                  <td className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {item.points ?? 0} pts
                  </td>

                  <td>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        statusClass[item.status] ??
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.status ?? "Pending"}
                    </span>
                  </td>

                  <td className="text-right">
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => {
                          setEditingAchievement(item);
                          setIsOpen(true);
                        }}
                        className="flex items-center gap-1 text-indigo-600 hover:opacity-80 transition"
                      >
                        <Pencil size={16} />
                        <span className="text-sm font-medium">Edit</span>
                      </button>

                      <button
                        onClick={() => removeAchievement(item.id)}
                        className="flex items-center gap-1 text-rose-600 hover:opacity-80 transition"
                      >
                        <Trash2 size={16} />
                        <span className="text-sm font-medium">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* MODAL */}
      <AddAchievementModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedEmployee={selectedEmployee}
        editingAchievement={editingAchievement}
        setEditingAchievement={setEditingAchievement}
        onSave={handleSave}
      />
    </div>
  );
};

export default AchievementTable;