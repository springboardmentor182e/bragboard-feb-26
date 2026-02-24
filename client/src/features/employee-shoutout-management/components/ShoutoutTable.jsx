import { useState } from "react";
import { shoutouts as mockData } from "../constants/mockData";
import TableRow from "./TableRow";
import FilterBar from "./FilterBar";

const ShoutoutTable = () => {
  const [data, setData] = useState(mockData);
  const [selectedIds, setSelectedIds] = useState([]);

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
  const deleteSelected = () => {
    const filtered = data.filter((item) => !selectedIds.includes(item.id));
    setData(filtered);
    setSelectedIds([]);
  };

  // 🔹 Toggle Pin
  const togglePin = (id) => {
    const updated = data.map((item) =>
      item.id === id
        ? {
            ...item,
            status: item.status === "Pinned" ? "Active" : "Pinned",
          }
        : item,
    );

    setData(updated);
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

      <div className="bg-white rounded-2xl shadow-md">
        {/* 🔹 Selection Bar */}
        {selectedIds.length > 0 && (
          <div className="bg-blue-50 px-6 py-3 flex items-center justify-between">
            <p className="text-blue-700 font-medium">
              {selectedIds.length} shoutouts selected
            </p>

            <div className="flex gap-3">
              <button
                onClick={deleteSelected}
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
          <table className="min-w-[900px] w-full text-left">
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
    </div>
  );
};

export default ShoutoutTable;
