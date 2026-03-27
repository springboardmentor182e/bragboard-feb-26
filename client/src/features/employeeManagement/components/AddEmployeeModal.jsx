import { useState } from "react";
import { motion } from "framer-motion";
import { createEmployee } from "../../../services/employeeService";

function AddEmployeeModal({ setShowModal, reloadEmployees }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "Employee",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmployee = {
      id: Date.now(), // temporary id
      name: formData.name,
      email: formData.email,
      department: formData.department,
      role: formData.role,
      status: "Active",
    };

    try {
      await createEmployee(newEmployee);

      // reload table
      reloadEmployees();

      // close modal
      setShowModal(false);
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 w-[420px] shadow-xl"
      >

        <h2 className="text-xl font-semibold mb-6">Add New Employee</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-4 py-2"
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-4 py-2"
          />

          {/* DEPARTMENT */}
          <input
            type="text"
            name="department"
            placeholder="Department"
            required
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-4 py-2"
          />

          {/* ROLE */}
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

          {/* BUTTONS */}
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
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
            >
              Add Employee
            </button>

          </div>
        </form>

      </motion.div>
    </div>
  );
}

export default AddEmployeeModal;