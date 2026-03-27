import React, { useState, useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { useNavigate } from "react-router-dom";

function AddEmployee() {

  const { addEmployee } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    role: "",
    department: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.role || !form.department) {
      alert("Please fill all fields");
      return;
    }

    addEmployee(form);

    navigate("/employees");
  };

  return (
    <div className="max-w-xl mx-auto">

      <h2 className="text-2xl font-semibold mb-6">
        Add New Employee
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Employee Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter employee name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Role
          </label>
          <input
            type="text"
            name="role"
            placeholder="Enter role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Department
          </label>
          <input
            type="text"
            name="department"
            placeholder="Enter department"
            value={form.department}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-600 transition"
        >
          Add Employee
        </button>

      </form>

    </div>
  );
}

export default AddEmployee;