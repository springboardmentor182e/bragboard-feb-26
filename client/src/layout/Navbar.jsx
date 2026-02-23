import React from "react";
const role = localStorage.getItem("role") || "user";
const Navbar = () => {
  return (
    <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-700">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-4">
  <span className="text-gray-600 capitalize">
    {role}
  </span>
  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
</div>
    </div>
  );
};

export default Navbar;