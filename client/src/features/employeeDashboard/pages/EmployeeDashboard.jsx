import { useEffect, useState } from "react";
import {
  getAchievements,
  addAchievement,
  deleteAchievement,
} from "../../services/achievementService";

import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../../../components/ui/Card";
import PrimaryButton from "../../../components/ui/PrimaryButton";

const EmployeeDashboardPage = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: "",
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const res = await getAchievements();
      setAchievements(res.data);
    } catch (err) {
      setError("Failed to load achievements.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAchievement({
        ...formData,
        points: Number(formData.points),
      });

      setFormData({ title: "", description: "", points: "" });
      setIsModalOpen(false);
      fetchAchievements();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAchievement(id);
      fetchAchievements();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Manage Achievements
          </h2>
          <p className="text-slate-500 mt-2">
            Add and manage employee achievements in real-time
          </p>
        </div>

        <PrimaryButton onClick={() => setIsModalOpen(true)}>
          + Add Achievement
        </PrimaryButton>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-indigo-600 font-medium">
          Loading achievements...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-rose-600 font-medium">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && achievements.length === 0 && (
        <Card className="p-10 text-center">
          <p className="text-slate-500 text-lg">
            No achievements added yet.
          </p>
        </Card>
      )}

      {/* Table */}
      {!loading && achievements.length > 0 && (
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="pb-3">Title</th>
                  <th>Description</th>
                  <th>Points</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {achievements.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="py-4 font-semibold text-slate-800">
                      {item.title}
                    </td>
                    <td className="text-slate-600">
                      {item.description}
                    </td>
                    <td className="font-semibold text-indigo-600">
                      {item.points}
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-4 py-2 text-sm rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-slate-200">
            <h3 className="text-2xl font-bold mb-6 text-slate-900">
              Add Achievement
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <input
                type="number"
                name="points"
                placeholder="Points"
                value={formData.points}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>

                <PrimaryButton type="submit">
                  Add
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
};

export default EmployeeDashboardPage;