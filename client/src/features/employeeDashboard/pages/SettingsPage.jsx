import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import useEmployees from "../hooks/useEmployees";
import useDarkMode from "../hooks/useDarkMode";

const SettingsPage = () => {
  const { employees, selectedEmployee, setSelectedEmployee } = useEmployees();
  const { dark, toggleDark } = useDarkMode();

  const [notifications, setNotifications] = useState({
    shoutouts:    true,
    achievements: true,
    leaderboard:  false,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <DashboardLayout
      selectedEmployee={selectedEmployee}
      dark={dark}
      onToggleDark={toggleDark}
    >
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          ⚙️ Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your preferences
        </p>
      </div>

      <div className="space-y-6 max-w-2xl">

        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1">
            Appearance
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Customize how BragBoard looks for you.
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Dark Mode
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Switch between light and dark theme
              </p>
            </div>
            <button
              onClick={toggleDark}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                dark ? "bg-indigo-500" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
                  dark ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1">
            Notifications
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Control when and how you get notified.
          </p>
          <div className="space-y-4">
            {[
              { key: "shoutouts",    label: "Shoutout received",  desc: "Notify when someone shouts you out" },
              { key: "achievements", label: "Achievement added",   desc: "Notify when a new achievement is logged" },
              { key: "leaderboard",  label: "Leaderboard changes", desc: "Notify when your rank changes" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {desc}
                  </p>
                </div>
                <button
                  onClick={() => toggleNotification(key)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    notifications[key]
                      ? "bg-indigo-500"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
                      notifications[key] ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Account */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1">
            Account
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Manage your employee profile.
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Current Profile
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {selectedEmployee
                  ? `${selectedEmployee.name} · ${selectedEmployee.department}`
                  : "No employee selected"}
              </p>
            </div>
            <select
              value={selectedEmployee?.id ?? ""}
              onChange={(e) => {
                const emp = employees.find(
                  (em) => em.id === Number(e.target.value)
                );
                setSelectedEmployee(emp ?? null);
              }}
              className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
