import { X } from "lucide-react";

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
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search by author, recipient, or message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Department Filter */}
      <select
        value={departmentFilter}
        onChange={(e) => setDepartmentFilter(e.target.value)}
        className="border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
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
        className="border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
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
        className="bg-purple-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-purple-700 transition"
      >
        Export
      </button>
    </div>
  );
};

export default FilterBar;
