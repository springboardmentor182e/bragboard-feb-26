import DashboardLayout from "../components/layout/DashboardLayout";
import AchievementTable from "../components/AchievementTable";
import useEmployees from "../hooks/useEmployees";
import useDarkMode from "../hooks/useDarkMode";

const AchievementsPage = () => {
  const { selectedEmployee } = useEmployees();
  const { dark, toggleDark } = useDarkMode();

  return (
    <DashboardLayout selectedEmployee={selectedEmployee} dark={dark} onToggleDark={toggleDark}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">🏅 Achievements</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">All your logged achievements</p>
      </div>
      <AchievementTable selectedEmployee={selectedEmployee} />
    </DashboardLayout>
  );
};

export default AchievementsPage;
