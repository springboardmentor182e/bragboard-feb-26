export default function Sidebar_admin() {
  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-gray-900 text-white p-5">
      
      <h2 className="text-2xl font-bold mb-6">BragBoard</h2>

      <ul className="space-y-4">
        <li className="hover:text-yellow-400 cursor-pointer">
          Dashboard
        </li>
        <li className="hover:text-yellow-400 cursor-pointer">
          Leaderboard
        </li>
        <li className="hover:text-yellow-400 cursor-pointer">
          Employees
        </li>
        <li className="hover:text-yellow-400 cursor-pointer">
          Settings
        </li>
      </ul>

    </div>
  );
}