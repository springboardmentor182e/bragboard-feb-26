import { Search, SlidersHorizontal, ChevronUp } from "lucide-react";
import { useState } from "react";

const ReportsSearchBar = ({
  onSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="space-y-4">

      {/* SEARCH + FILTER BUTTON */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 flex-1 shadow-sm">

          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search by report ID, user, or reason..."
            value={query}
            onChange={handleChange}
            className="w-full outline-none text-sm text-slate-700 placeholder:text-slate-400"
          />

        </div>

        {/* FILTER BUTTON */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm text-slate-600 hover:bg-slate-50 shadow-sm"
        >
          <SlidersHorizontal size={18} />
          Filters
          <ChevronUp
            size={16}
            className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
          />
        </button>

      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* STATUS */}
            <div className="flex flex-col gap-2">

              <label className="text-sm font-medium text-slate-600">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="REVIEWING">Reviewing</option>
                <option value="RESOLVED">Resolved</option>
              </select>

            </div>

            {/* PRIORITY */}
            <div className="flex flex-col gap-2">

              <label className="text-sm font-medium text-slate-600">
                Priority
              </label>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ALL">All Priorities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="LOW">Low</option>
              </select>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default ReportsSearchBar;