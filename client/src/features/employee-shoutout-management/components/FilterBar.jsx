const FilterBar = ({
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  onExport,
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md flex flex-col md:flex-row items-center gap-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by author, recipient, or message..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none"
      />

      {/* Department Filter */}
      <select
        value={departmentFilter}
        onChange={(e) => setDepartmentFilter(e.target.value)}
        className="border rounded-lg px-4 py-2"
      >
        <option value="All">All Departments</option>
        <option value="Engineering">Engineering</option>
        <option value="Design">Design</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
        <option value="HR">HR</option>
      </select>

      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border rounded-lg px-4 py-2"
      >
        <option value="All">All Status</option>
        <option value="Active">Active</option>
        <option value="Pinned">Pinned</option>
        <option value="Archived">Archived</option>
      </select>

      {/* Export Button */}
      <button
        type="button"
        onClick={onExport}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl shadow-md hover:opacity-90 transition"
      >
        Export
      </button>
    </div>
  );
};

export default FilterBar;
