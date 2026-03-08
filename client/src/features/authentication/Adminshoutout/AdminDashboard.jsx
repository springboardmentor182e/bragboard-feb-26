import React, { useEffect, useState } from "react";
import {
  getShoutouts,
  approveShoutout,
  rejectShoutout,
  deleteShoutout,
} from "../../../api";

const AdminDashboard = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  const fetchShoutouts = async () => {
    const res = await getShoutouts();
    setShoutouts(res.data);
  };

  useEffect(() => {
    fetchShoutouts();
  }, []);

  const handleApprove = async (id) => {
    await approveShoutout(id);
    fetchShoutouts();
  };

  const handleReject = async (id) => {
    await rejectShoutout(id);
    fetchShoutouts();
  };

  const handleDelete = async (id) => {
    await deleteShoutout(id);
    fetchShoutouts();
  };

  // Filters
  const filtered = shoutouts.filter((s) => {
    return (
      s.sender.toLowerCase().includes(search.toLowerCase()) &&
      (department === "" || s.department === department) &&
      (status === "" || s.status === status)
    );
  });

  const total = shoutouts.length;
  const approved = shoutouts.filter((s) => s.status === "approved").length;
  const pending = shoutouts.filter((s) => s.status === "pending").length;
  const rejected = shoutouts.filter((s) => s.status === "rejected").length;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Admin Shoutout Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-white shadow p-6 rounded text-center">
          <h2>Total</h2>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-green-100 shadow p-6 rounded text-center">
          <h2>Approved</h2>
          <p className="text-2xl font-bold text-green-700">{approved}</p>
        </div>

        <div className="bg-yellow-100 shadow p-6 rounded text-center">
          <h2>Pending</h2>
          <p className="text-2xl font-bold text-yellow-700">{pending}</p>
        </div>

        <div className="bg-red-100 shadow p-6 rounded text-center">
          <h2>Rejected</h2>
          <p className="text-2xl font-bold text-red-700">{rejected}</p>
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

        <select
          className="border p-2 rounded"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>

      </div>

      {/* Table */}
      <div className="bg-white shadow rounded">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Sender</th>
              <th>Message</th>
              <th>Department</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((s) => (
              <tr key={s.id} className="border-t text-center">

                <td className="p-3">{s.sender}</td>
                <td>{s.message}</td>
                <td>{s.department}</td>
                <td>{s.date}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      s.status === "approved"
                        ? "bg-green-500"
                        : s.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>

                <td className="space-x-2">

                  <button
                    onClick={() => handleApprove(s.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(s.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleDelete(s.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
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