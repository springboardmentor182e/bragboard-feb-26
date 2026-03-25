import { useState } from "react";
import Leaderboard from "../components/Leaderboard";

const EmployeeDashboard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <div className="space-y-6">

      {/* 🔷 Header */}
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Employee Dashboard
      </h1>

      {/* 🔷 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Points</p>
          <h2 className="text-xl font-bold">0</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Achievements</p>
          <h2 className="text-xl font-bold">0</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Rank</p>
          <h2 className="text-xl font-bold">-</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Shoutouts</p>
          <h2 className="text-xl font-bold">0</h2>
        </div>

      </div>

      {/* 🔷 Recent Achievements */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Recent Achievements
          </h2>

          <button className="bg-indigo-500 text-white px-3 py-1 rounded text-sm">
            + Add Achievement
          </button>
        </div>

        <p className="text-gray-400 text-sm">
          No achievements yet. Add your first one!
        </p>
      </div>

      {/* 🔷 Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">

          {/* Shoutout */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
              Send a Shoutout 🎉
            </h2>

            <select className="w-full mb-3 p-2 border rounded">
              <option>Select Employee</option>
            </select>

            <textarea
              placeholder="Write your appreciation message..."
              className="w-full mb-3 p-2 border rounded"
            />

            <button className="bg-indigo-500 text-white px-4 py-2 rounded text-sm">
              Post Shoutout
            </button>
          </div>

          {/* Feed */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Shoutout Feed
            </h2>

            <p className="text-gray-400 text-sm mt-2">
              No shoutouts yet.
            </p>
          </div>

        </div>

        {/* RIGHT → Leaderboard */}
        <div>
          <Leaderboard selectedEmployee={selectedEmployee} />
        </div>

      </div>

    </div>
  );
};

export default EmployeeDashboard;