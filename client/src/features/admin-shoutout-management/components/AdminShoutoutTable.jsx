import { useState, useEffect } from "react";
import TableRow from "./TableRow";
import FilterBar from "./FilterBar";
import StatsSection from "./StatsSection";
import ShoutoutHeader from "./ShoutoutHeader";
import ViewShoutoutModal from "../../employee-shoutout/components/Modals/ViewShoutoutModal";
import EditShoutoutModal from "../../employee-shoutout/components/Modals/EditShoutoutModal";
import DeleteShoutoutModal from "../../employee-shoutout/components/Modals/DeleteShoutoutModal";
import CreateShoutoutModal from "../../employee-shoutout/components/Modals/CreateShoutoutModal";
import BulkDeleteConfirmModal from "./Modals/BulkDeleteConfirmModal";

const AdminShoutoutTable = () => {
  const [data, setData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/shoutouts");
        if (!response.ok) throw new Error("Failed to fetch shoutouts");
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Modal states
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

  // 🔹 Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // 🔹 Toggle single checkbox
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // 🔹 Select All
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map((item) => item.id));
    }
  };

  // 🔹 Delete Selected
  const deleteSelected = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/shoutouts/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedIds),
      });
      if (!response.ok) throw new Error("Failed to delete shoutouts");
      setData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
      setSelectedIds([]);
      setIsBulkDeleteModalOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 Toggle Pin
  const togglePin = async (id) => {
    const item = data.find((i) => i.id === id);
    if (!item) return;

    const updatedItem = {
      ...item,
      status: item.status === "Pinned" ? "Active" : "Pinned",
    };

    try {
      const response = await fetch(`http://localhost:8000/api/shoutouts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });
      if (!response.ok) throw new Error("Failed to toggle pin");
      const json = await response.json();
      setData((prev) =>
        prev.map((i) => (i.id === json.id ? json : i))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 Create Shoutout
  const handleCreate = async (newShoutout) => {
    try {
      const response = await fetch("http://localhost:8000/api/shoutouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newShoutout),
      });
      if (!response.ok) throw new Error("Failed to create shoutout");
      const json = await response.json();
      setData((prev) => [json, ...prev]);
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 Update Shoutout
  const handleUpdate = async (updatedItem) => {
    try {
      const response = await fetch(`http://localhost:8000/api/shoutouts/${updatedItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });
      if (!response.ok) throw new Error("Failed to update shoutout");
      const json = await response.json();
      setData((prev) =>
        prev.map((item) => (item.id === json.id ? json : item))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 Delete Single Shoutout
  const handleDeleteOne = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/shoutouts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete shoutout");
      setData((prev) => prev.filter((item) => item.id !== id));
      if (selectedIds.includes(id)) {
        setSelectedIds((prev) => prev.filter((sid) => sid !== id));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 Filtering Logic
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" || item.department === departmentFilter;

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // 🔹 Export CSV
  const exportToCSV = () => {
    if (!filteredData || filteredData.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = [
      "Author",
      "Recipient",
      "Badge",
      "Message",
      "Department",
      "Hearts",
      "Claps",
      "Comments",
      "Date",
      "Status",
    ];

    const rows = filteredData.map((item) => [
      item.author,
      item.recipient,
      item.badge?.label ?? "",
      item.message.replace(/,/g, " "),
      item.department,
      item.reactions?.hearts ?? 0,
      item.reactions?.claps ?? 0,
      item.reactions?.comments ?? 0,
      item.date,
      item.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "shoutouts.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {loading && (
        <div className="p-8 text-center text-purple-600 animate-pulse font-medium">
          Loading shoutouts from database...
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <ShoutoutHeader onCreateClick={() => setIsCreateModalOpen(true)} />
          <StatsSection data={data} />
          {/* 🔹 Filter Bar */}
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onExport={exportToCSV}
      />

      <div className="bg-white rounded-2xl shadow-md min-h-[400px]">
        {/* 🔹 Selection Bar */}
        {selectedIds.length > 0 && (
          <div className="bg-purple-50 px-6 py-3 flex items-center justify-between">
            <p className="text-purple-700 font-medium">
              {selectedIds.length} shoutouts selected
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setIsBulkDeleteModalOpen(true)}
                className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm"
              >
                Delete Selected
              </button>

              <button
                onClick={() => setSelectedIds([])}
                className="bg-gray-200 px-4 py-1.5 rounded-lg text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-[1200px] w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-4">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === filteredData.length &&
                      filteredData.length > 0
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-4">Author</th>
                <th className="p-4">Recipient</th>
                <th className="p-4">Badge</th>
                <th className="p-4">Message</th>
                <th className="p-4">Department</th>
                <th className="p-4">Reactions</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <TableRow
                  key={item.id}
                  item={item}
                  isSelected={selectedIds.includes(item.id)}
                  onSelect={toggleSelect}
                  onTogglePin={togglePin}
                  onView={setViewItem}
                  onEdit={setEditItem}
                  onDelete={setDeleteItem}
                />
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No shoutouts found.
          </div>
        )}
      </div>

      {/* 🔹 Modals */}
      <ViewShoutoutModal
        isOpen={!!viewItem}
        onClose={() => setViewItem(null)}
        item={viewItem}
        onEdit={(item) => {
          setViewItem(null);
          setEditItem(item);
        }}
      />

      <EditShoutoutModal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        item={editItem}
        onSave={handleUpdate}
      />

      <DeleteShoutoutModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        item={deleteItem}
        onDelete={handleDeleteOne}
      />

      <CreateShoutoutModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreate}
      />

      <BulkDeleteConfirmModal
        isOpen={isBulkDeleteModalOpen}
        onClose={() => setIsBulkDeleteModalOpen(false)}
        onConfirm={deleteSelected}
        count={selectedIds.length}
      />
        </>
      )}
    </div>
  );
};

export default AdminShoutoutTable;
