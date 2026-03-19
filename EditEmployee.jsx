import React, { useContext, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { useParams, useNavigate } from "react-router-dom";

function EditEmployee() {

  const { employees, updateEmployee } = useContext(EmployeeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const employee = employees.find(emp => emp.id === Number(id));

  const [form, setForm] = useState({
    name: employee?.name || "",
    role: employee?.role || "",
    department: employee?.department || ""
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

    updateEmployee({
      id: Number(id),
      ...form
    });

    navigate("/employees");
  };

  if (!employee) {
    return <p className="text-red-500">Employee not found</p>;
  }

  return (
    <div className="max-w-xl mx-auto">

      <h2 className="text-2xl font-semibold mb-6">
        Edit Employee
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
            value={form.department}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Update Employee
        </button>

      </form>

    </div>
  );
}

export default EditEmployee;