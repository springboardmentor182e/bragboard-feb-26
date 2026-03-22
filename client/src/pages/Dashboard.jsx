export default function Dashboard() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-black text-white p-4">
        <h1 className="text-xl mb-6">BragBoard</h1>
        <ul>
          <li className="mb-3">Feed</li>
          <li className="mb-3">Leaderboard</li>
          <li className="mb-3">Team</li>
          <li className="mb-3">Admin Dashboard</li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white">
          <h2 className="text-2xl font-bold">Welcome back, Alex 👋</h2>
          <p>You’ve received 3 recognitions this week</p>
        </div>
      </div>
    </div>
  );
}