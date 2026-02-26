import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import AddAchievementModal from "./AddAchievementModal";

const AchievementTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [achievements, setAchievements] = useState([
    {
      title: "Won Hackathon 2025",
      category: "Competition",
      points: 200,
      status: "Approved",
    },
    {
      title: "Completed AWS Certification",
      category: "Certification",
      points: 150,
      status: "Pending",
    },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400";
      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow dark:shadow-gray-900/40 p-6 transition-all duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Recent Achievements
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and track your performance
          </p>
        </div>

        <button
          onClick={() => {
            setEditingIndex(null);
            setIsOpen(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200 shadow-sm"
        >
          + Add Achievement
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              <th className="pb-3">Title</th>
              <th>Category</th>
              <th>Points</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {achievements.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-all duration-200"
              >
                <td className="py-4 font-medium text-gray-800 dark:text-gray-100">
                  {item.title}
                </td>

                <td className="text-gray-600 dark:text-gray-300">
                  {item.category}
                </td>

                <td className="font-semibold text-gray-700 dark:text-gray-200">
                  {item.points}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="text-right">
                  <div className="flex justify-end gap-3">
                    
                    <button
                      onClick={() => {
                        setEditingIndex(index);
                        setIsOpen(true);
                      }}
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:opacity-80 transition"
                    >
                      <Pencil size={16} />
                      <span className="text-sm">Edit</span>
                    </button>

                    <button
                      onClick={() =>
                        setAchievements((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:opacity-80 transition"
                    >
                      <Trash2 size={16} />
                      <span className="text-sm">Delete</span>
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AddAchievementModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setAchievements={setAchievements}
        editingIndex={editingIndex}
        setEditingIndex={setEditingIndex}
        achievements={achievements}
      />
    </div>
  );
};

export default AchievementTable;