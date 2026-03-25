import React, { useEffect, useState } from "react";
import { getShoutouts, deleteShoutout } from "../../services/adminShoutoutService";

const AdminShoutout = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  const fetchShoutouts = async () => {
    try {
      const res = await getShoutouts();
      console.log("API response:", res.data);

      setShoutouts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching shoutouts:", error);
      setShoutouts([]);
    }
  };

  useEffect(() => {
    fetchShoutouts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteShoutout(id);
      fetchShoutouts();
    } catch (error) {
      console.error("Error deleting shoutout:", error);
    }
  };

  const filtered = Array.isArray(shoutouts)
    ? shoutouts.filter((s) => {
        const matchesSearch = (s.sender || "")
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesDepartment =
          department === "" || s.department === department;

        return matchesSearch && matchesDepartment;
      })
    : [];

  const total = filtered.length;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Shoutout Management</h1>

      <div className="mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Total Shoutouts</h2>
            <p className="text-3xl font-bold">{total}</p>
          </div>
          <div className="text-5xl opacity-70">📊</div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by sender..."
          className="border p-2 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Developer">Developer</option>
          <option value="HR">HR</option>
          <option value="N/A">N/A</option>
        </select>
      </div>

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
            {filtered.length > 0 ? (
              filtered.map((s) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No shoutouts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminShoutout;