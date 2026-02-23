
import React, { useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import ConfirmModal from "../../components/ConfirmModal";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
const Users = () => {

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
    { id: 2, name: "Alice Smith", email: "alice@example.com", status: "inactive" },
    { id: 3, name: "Robert Brown", email: "robert@example.com", status: "active" },
  ]);

  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    const updated = users.map((user) =>
      user.id === id
        ? {
            ...user,
            status: user.status === "active" ? "inactive" : "active",
          }
        : user
    );
    setUsers(updated);
  };

  const confirmDelete = () => {
    setUsers(users.filter((user) => user.id !== selectedId));
    setModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Users Management</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

<DataTable
  columns={["Name", "Email", "Status"]}
  data={filteredUsers.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    status: <StatusBadge status={user.status} />,
  }))}
  renderActions={(user) => (
    <div className="flex gap-3">
      <button
        onClick={() => toggleStatus(user.id)}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs transition"
      >
        Toggle
      </button>

      <button
        onClick={() => {
          setSelectedId(user.id);
          setModalOpen(true);
        }}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs transition"
      >
        Delete
      </button>
    </div>
  )}
/>      </div>

      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this user?"
      />
    </AdminLayout>
  );
};

export default Users;