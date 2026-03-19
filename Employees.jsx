import React, { useContext, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { useNavigate } from "react-router-dom";

function Employees() {

  const {
    employees,
    deleteEmployee,
    giveRecognition
  } = useContext(EmployeeContext);

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Employees
          </h1>
          <p className="text-sm text-gray-500">
            Manage your team members
          </p>
        </div>

        <button
          onClick={() => navigate("/add-employee")}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
        >
          + Add Employee
        </button>

      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search employee..."
          className="border border-gray-300 px-4 py-2 rounded-lg w-72 focus:ring-2 focus:ring-purple-500 outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Employee Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-purple-600 text-white text-sm">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="text-left">Role</th>
              <th className="text-left">Department</th>
              <th className="text-left">Recognition</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((emp) => (

              <tr
                key={emp.id}
                className="border-b hover:bg-gray-50 transition"
              >

                {/* Employee Info */}
                <td className="p-4">

                  <div className="flex items-center gap-3">

                    <img
                      src={`https://i.pravatar.cc/40?img=${emp.id}`}
                      alt="emp"
                      className="w-9 h-9 rounded-full"
                    />

                    <div>
                      <p className="font-medium text-gray-800">
                        {emp.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {emp.id}
                      </p>
                    </div>

                  </div>

                </td>

                <td className="text-gray-600">
                  {emp.role}
                </td>

                <td className="text-gray-600">
                  {emp.department}
                </td>

                {/* Recognition */}
                <td>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                    ⭐ {emp.recognition}
                  </span>
                </td>

                {/* Actions */}
                <td className="flex gap-3 py-3">

                  <button
                    onClick={() => giveRecognition(emp.id)}
                    className="bg-green-100 text-green-600 px-3 py-1 rounded hover:bg-green-200 text-xs"
                  >
                    Reward
                  </button>

                  <button
                    onClick={() => navigate(`/edit/${emp.id}`)}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 text-xs"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteEmployee(emp.id)}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 text-xs"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Employees;