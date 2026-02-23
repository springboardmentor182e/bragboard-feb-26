import React, { useState } from "react";
import AdminLayout from "../../layout/AdminLayout";

const ShoutoutManagement = () => {
  const [shoutouts, setShoutouts] = useState([
    { id: 1, user: "John", message: "Great teamwork!", department: "HR" },
    { id: 2, user: "Alice", message: "Amazing presentation!", department: "Tech" },
  ]);

  const handleDelete = (id) => {
    setShoutouts(shoutouts.filter((item) => item.id !== id));
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Shoutout Management
        </h1>

        <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Search shoutouts..."
              className="w-full md:w-1/3 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              className="w-full md:w-48 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>All Departments</option>
              <option>HR</option>
              <option>Tech</option>
            </select>
          </div>

          {/* List */}
          {shoutouts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm">
                No shoutouts available.
              </p>
            </div>
          ) : (
            shoutouts.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.user}</p>
                  <p className="text-gray-600 text-sm">{item.message}</p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-600">
                    {item.department}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs transition"
                >
                  Delete
                </button>
              </div>
            ))
          )}

        </div>
      </div>
    </AdminLayout>
  );
};

export default ShoutoutManagement;