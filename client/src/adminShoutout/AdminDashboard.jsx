import { useEffect, useState } from "react";
import {
  getShoutouts,
  approveShoutout,
  rejectShoutout,
  deleteShoutout,
} from "../api";

function AdminDashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch shoutouts
  useEffect(() => {
    fetchShoutouts();
  }, []);

  const fetchShoutouts = async () => {
    try {
      const response = await getShoutouts();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching shoutouts:", error);
    }
  };

  // Approve
  const handleApprove = async (id) => {
    try {
      await approveShoutout(id);
      fetchShoutouts();
    } catch (error) {
      console.error("Error approving shoutout:", error);
    }
  };

  // Reject
  const handleReject = async (id) => {
    try {
      await rejectShoutout(id);
      fetchShoutouts();
    } catch (error) {
      console.error("Error rejecting shoutout:", error);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this shoutout?"
    );
    if (!confirmDelete) return;

    try {
      await deleteShoutout(id);
      fetchShoutouts();
    } catch (error) {
      console.error("Error deleting shoutout:", error);
    }
  };

  // Filtering
  const filteredData = data.filter((item) =>
    item.sender.toLowerCase().includes(search.toLowerCase()) &&
    (departmentFilter === "" || item.department === departmentFilter) &&
    (statusFilter === "" || item.status === statusFilter)
  );

  // Stats
  const totalCount = data.length;
  const approvedCount = data.filter((item) => item.status === "Approved").length;
  const pendingCount = data.filter((item) => item.status === "Pending").length;
  const rejectedCount = data.filter((item) => item.status === "Rejected").length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        Admin Shoutout Management
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total</h3>
          <p className="text-2xl font-bold">{totalCount}</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Approved</h3>
          <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
        </div>

        <div className="bg-red-100 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Rejected</h3>
          <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by sender..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          All Shoutouts
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Sender</th>
              <th className="p-3">Message</th>
              <th className="p-3">Department</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">{item.sender}</td>
                <td className="p-3">{item.message}</td>
                <td className="p-3">{item.department}</td>
                <td className="p-3">{item.date}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      item.status === "Approved"
                        ? "bg-green-500"
                        : item.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(item.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
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

export default AdminDashboard;