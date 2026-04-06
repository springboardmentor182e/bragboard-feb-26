import { useState } from "react";
import { motion } from "framer-motion";

/* ✅ USE ALIAS */
import { createEmployee } from "@/services/employeeService";

function AddEmployeeModal({ setShowModal, reloadEmployees }) {
  // Common departments in the company
  const departments = [
    "Engineering",
    "Design",
    "Product",
    "Analytics",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Operations",
    "Support",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "Employee",
    status: "Active",
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
      /* ✅ Include all required fields and default password */
      await createEmployee({
        name: formData.name,
        email: formData.email,
        department: formData.department,
        role: formData.role,
        status: formData.status,
        password: "123456", // Default password
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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 rounded-2xl p-8 w-[420px] shadow-xl border border-slate-200 dark:border-slate-800 transition-colors duration-300"
      >
        <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white transition-colors">
          Add New Employee
        </h2>

        {/* ERROR */}
        {error && (
          <div className="mb-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg transition-colors">
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
            className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          />

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md active:scale-95"
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