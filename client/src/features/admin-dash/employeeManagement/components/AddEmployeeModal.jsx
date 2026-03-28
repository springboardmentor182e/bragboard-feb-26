import { useState } from "react";
import { motion } from "framer-motion";

/* ✅ USE ALIAS */
import { createEmployee } from "@/services/employeeService";

function AddEmployeeModal({ setShowModal, reloadEmployees }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "Employee",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      /* ❗ REMOVE fake ID (backend will handle it) */
      await createEmployee({
        name: formData.name,
        email: formData.email,
        department: formData.department,
        role: formData.role,
      });

      reloadEmployees();
      setShowModal(false);
    } catch (error) {
      console.error("Error creating employee:", error);
      setError("Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 w-[420px] shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-6">
          Add New Employee
        </h2>

        {/* ERROR */}
        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-4 py-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-4 py-2"
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            required
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-4 py-2"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-4 py-2"
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded-lg border border-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Employee"}
            </button>

          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default AddEmployeeModal;