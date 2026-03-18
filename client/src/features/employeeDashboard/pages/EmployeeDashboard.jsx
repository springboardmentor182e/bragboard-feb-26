import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import SummaryCards from "../components/SummaryCards";
import AchievementTable from "../components/AchievementTable";
import Leaderboard from "../components/Leaderboard";
import ShoutoutForm from "../components/ShoutoutForm";
import ShoutoutFeed from "../components/ShoutoutFeed";

import useEmployees from "../hooks/useEmployees";
import useShoutouts from "../hooks/useShoutouts";
import useNotification from "../hooks/useNotification";
import useDarkMode from "../hooks/useDarkMode";

const EmployeeDashboard = () => {
  const { employees, selectedEmployee, setSelectedEmployee } = useEmployees();
  const { shoutouts, addShoutout, handleReaction, handleComment } = useShoutouts(selectedEmployee);
  const { notification, showNotification } = useNotification();
  const { dark, toggleDark } = useDarkMode();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleShoutoutCreated = (newShoutout) => {
    addShoutout(newShoutout);
    setRefreshKey((prev) => prev + 1);
    const recipient = employees.find((e) => e.id === newShoutout.recipient_id);
    showNotification(`🎉 ${recipient?.name ?? "Someone"} received a shoutout!`);
  };

  return (
    <DashboardLayout
      selectedEmployee={selectedEmployee}
      dark={dark}
      onToggleDark={toggleDark}
    >
      {/* Employee Selector */}
      <div className="mb-6 flex items-center gap-4">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Viewing as:
        </label>
        <select
          value={selectedEmployee?.id ?? ""}
          onChange={(e) => {
            const emp = employees.find((em) => em.id === Number(e.target.value));
            setSelectedEmployee(emp ?? null);
          }}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} — {emp.department}
            </option>
          ))}
        </select>
      </div>

      <SummaryCards selectedEmployee={selectedEmployee} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <AchievementTable selectedEmployee={selectedEmployee} />
          <ShoutoutForm
            selectedEmployee={selectedEmployee}
            onShoutoutCreated={handleShoutoutCreated}
          />
          <ShoutoutFeed
            shoutouts={shoutouts}
            employees={employees}
            onReact={handleReaction}
            onComment={handleComment}
          />
        </div>
        <div>
          <Leaderboard
            selectedEmployee={selectedEmployee}
            refreshKey={refreshKey}
          />
        </div>
      </div>

      {notification && (
        <div className="fixed top-5 right-5 bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm z-50">
          {notification}
        </div>
      )}
    </DashboardLayout>
  );
};

export default EmployeeDashboard;