import DashboardLayout from "../components/layout/DashboardLayout";
import useEmployees from "../hooks/useEmployees";
import useDarkMode from "../hooks/useDarkMode";

const ProfilePage = () => {
  const { selectedEmployee, setSelectedEmployee, employees } = useEmployees();
  const { dark, toggleDark } = useDarkMode();

  return (
    <DashboardLayout selectedEmployee={selectedEmployee} dark={dark} onToggleDark={toggleDark}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">👤 Profile</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your personal details</p>
      </div>

      {selectedEmployee ? (
        <div className="max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-bold">
              {selectedEmployee.name?.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {selectedEmployee.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedEmployee.department}
              </p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex justify-between">
              <span className="font-medium">Employee ID</span>
              <span>#{selectedEmployee.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Department</span>
              <span>{selectedEmployee.department}</span>
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Switch Profile
            </label>
            <select
              value={selectedEmployee.id}
              onChange={(e) => {
                const emp = employees.find((em) => em.id === Number(e.target.value));
                setSelectedEmployee(emp ?? null);
              }}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} — {emp.department}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-sm">Loading profile…</p>
      )}
    </DashboardLayout>
  );
};

export default ProfilePage;
