import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
// import AddAchievementModal from "./AddAchievementModal";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

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

  return (
    <Card className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Recent Achievements
          </h2>
          <p className="text-sm text-slate-500">
            Manage and track your performance
          </p>
        </div>

        <PrimaryButton
          onClick={() => {
            setEditingIndex(null);
            setIsOpen(true);
          }}
        >
          + Add Achievement
        </PrimaryButton>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
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
                className="border-b border-slate-100 hover:bg-slate-50 transition-all duration-200"
              >
                <td className="py-4 font-semibold text-slate-800">
                  {item.title}
                </td>

                <td className="text-slate-600">
                  {item.category}
                </td>

                <td className="font-semibold text-indigo-600">
                  {item.points}
                </td>

                <td>
                  <Badge
                    type={
                      item.status === "Approved"
                        ? "active"
                        : item.status === "Pending"
                        ? "manager"
                        : "suspended"
                    }
                  >
                    {item.status}
                  </Badge>
                </td>

                <td className="text-right">
                  <div className="flex justify-end gap-4">

                    <button
                      onClick={() => {
                        setEditingIndex(index);
                        setIsOpen(true);
                      }}
                      className="flex items-center gap-1 text-indigo-600 hover:opacity-80 transition"
                    >
                      <Pencil size={16} />
                      <span className="text-sm font-medium">Edit</span>
                    </button>

                    <button
                      onClick={() =>
                        setAchievements((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
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

      {/* Modal */}
      <AddAchievementModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setAchievements={setAchievements}
        editingIndex={editingIndex}
        setEditingIndex={setEditingIndex}
        achievements={achievements}
      />
    </Card>
  );
};

export default AchievementTable;