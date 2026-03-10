import { useEffect, useState } from "react";
import {
  getAchievements,
  addAchievement,
  deleteAchievement,
} from "../../services/achievementService";

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

  // Fetch achievements on page load
  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const res = await getAchievements();
      setAchievements(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
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
      console.error("Add error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAchievement(id);
      fetchAchievements();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Employee Dashboard
          </h1>
          <p className="text-slate-400 mt-2">
            Manage employee achievements in real-time
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-xl shadow-lg"
        >
          + Add Achievement
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-indigo-400 text-lg">Loading achievements...</div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-400 text-lg">{error}</div>
      )}

      {/* Empty State */}
      {!loading && achievements.length === 0 && (
        <div className="text-slate-400">
          No achievements added yet.
        </div>
      )}

      {/* Table */}
      {!loading && achievements.length > 0 && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-slate-300 uppercase text-sm">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Description</th>
                <th className="p-4">Points</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {achievements.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-4 font-medium">{item.title}</td>
                  <td className="p-4 text-slate-300">
                    {item.description}
                  </td>
                  <td className="p-4 text-indigo-400 font-semibold">
                    {item.points}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-6">
              Add Achievement
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="number"
                name="points"
                placeholder="Points"
                value={formData.points}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboardPage;