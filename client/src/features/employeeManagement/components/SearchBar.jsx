import { Search, Filter } from "lucide-react";

function SearchBar({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col md:flex-row md:items-center gap-4">

      {/* Search */}
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Role Filter */}
      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        className="px-4 py-2 rounded-xl bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option>All</option>
        <option>Admin</option>
        <option>Manager</option>
        <option>Employee</option>
      </select>

      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-4 py-2 rounded-xl bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option>All</option>
        <option>Active</option>
        <option>Suspended</option>
      </select>
    </div>
  );
}

export default SearchBar;