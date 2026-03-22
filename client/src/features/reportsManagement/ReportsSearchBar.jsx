import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

const ReportsSearchBar = ({
  onSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) => {

  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  /*
  DEBOUNCED SEARCH (smooth typing)
  */
  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(delay);
  }, [query, onSearch]);

  /*
  CLEAR FILTERS
  */
  const clearFilters = () => {
    setStatusFilter("ALL");
    setPriorityFilter("ALL");
  };

  const isFilterActive =
    statusFilter !== "ALL" || priorityFilter !== "ALL";

  return (
    <div className="space-y-4">

      {/* SEARCH + FILTER BUTTON */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 flex-1 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">

          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search by report ID, user, or reason..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full outline-none text-sm text-slate-700 placeholder:text-slate-400"
          />

        </div>

        {/* FILTER BUTTON */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm shadow-sm border transition
            ${
              isFilterActive
                ? "bg-indigo-50 border-indigo-300 text-indigo-600"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }
          `}
        >
          <SlidersHorizontal size={18} />
          Filters
          <ChevronDown
            size={16}
            className={`transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>

      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* STATUS */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-600">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ALL">All Priorities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="LOW">Low</option>
              </select>
            </div>

          </div>

          {/* ACTION ROW */}
          <div className="flex justify-between items-center">

            {/* ACTIVE FILTER BADGE */}
            {isFilterActive ? (
              <span className="text-sm text-indigo-600 font-medium">
                Filters applied
              </span>
            ) : (
              <span className="text-sm text-slate-400">
                No filters applied
              </span>
            )}

            {/* CLEAR BUTTON */}
            {isFilterActive && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600"
              >
                <X size={16} />
                Clear Filters
              </button>
            )}

          </div>

        </div>
      )}
    </div>
  );
};

export default ReportsSearchBar;