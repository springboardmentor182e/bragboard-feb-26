import React, { useEffect, useState } from "react";
import { getShoutouts, deleteShoutout } from "../../../api";

const AdminDashboard = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  const fetchShoutouts = async () => {
    const res = await getShoutouts();
    setShoutouts(res.data);
  };

  useEffect(() => {
    fetchShoutouts(); 
  }, []);

  const handleDelete = async (id) => {
    await deleteShoutout(id);
    fetchShoutouts();
  };

  // Filter Logic
  const filtered = shoutouts.filter((s) => {
    return (
      s.sender.toLowerCase().includes(search.toLowerCase()) &&
      (department === "" || s.department === department)
    );
  });

  const total = shoutouts.length;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">
        Admin Shoutout Management
      </h1>

      {/* Total Stats Bar */}
      <div className="mb-6">

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow flex items-center justify-between">

          <div>
            <h2 className="text-lg font-medium">Total Shoutouts</h2>
            <p className="text-3xl font-bold">{total}</p>
          </div>

          <div className="text-5xl opacity-70">
            📊
          </div>

        </div>

      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search by sender..."
          className="border p-2 rounded w-1/3"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          <option>Engineering</option>
          <option>Developer</option>
          <option>HR</option>
        </select>

      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Sender</th>
              <th className="text-left">Message</th>
              <th className="text-left">Department</th>
              <th className="text-left">Date</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">

                <td className="p-3">{s.sender}</td>
                <td>{s.message}</td>
                <td>{s.department}</td>
                <td>{s.date}</td>

                <td>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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
};

export default AdminDashboard;