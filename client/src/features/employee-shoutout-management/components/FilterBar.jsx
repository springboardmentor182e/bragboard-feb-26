const FilterBar = () => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md flex flex-col md:flex-row items-center gap-4">
      <input
        type="text"
        placeholder="Search by author, recipient, or message..."
        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <select className="border rounded-lg px-4 py-2">
        <option>All Departments</option>
        <option>Engineering</option>
        <option>Design</option>
        <option>Marketing</option>
        <option>Sales</option>
        <option>HR</option>
      </select>

      <select className="border rounded-lg px-4 py-2">
        <option>All Status</option>
        <option>Active</option>
        <option>Pinned</option>
        <option>Archived</option>
      </select>

      <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl shadow-md hover:opacity-90 transition">
        Export
    </button>
    </div>
  );
};

export default FilterBar;