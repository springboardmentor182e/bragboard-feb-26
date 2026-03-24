import { Search } from "lucide-react";

export default function Filters({ setSearch, setStatus, setPriority }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border mb-6 flex gap-4 items-center">

      <div className="flex items-center flex-1 bg-gray-50 border rounded-xl px-3 py-2">
        <Search className="w-4 h-4 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select onChange={(e) => setStatus(e.target.value)} className="border rounded-xl px-3 py-2">
        <option value="">Status</option>
        <option value="PENDING">Pending</option>
        <option value="REVIEWING">Reviewing</option>
        <option value="RESOLVED">Resolved</option>
      </select>

      <select onChange={(e) => setPriority(e.target.value)} className="border rounded-xl px-3 py-2">
        <option value="">Priority</option>
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </select>
    </div>
  );
}