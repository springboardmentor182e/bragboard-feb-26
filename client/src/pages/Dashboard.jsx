export default function Dashboard() {
  return (
    <div className="flex">
      
      {/* Sidebar */}
      <div className="w-64 h-screen bg-black text-white p-4">
        <h1 className="text-xl font-bold">BragBoard</h1>
        <ul className="mt-6 space-y-3">
          <li>Feed</li>
          <li>Leaderboard</li>
          <li>Team</li>
          <li>Badges</li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white">
          <h2 className="text-2xl font-bold">Welcome back 👋</h2>
          <p>You’ve received 3 recognitions this week</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded shadow">245 Shoutouts</div>
          <div className="bg-white p-4 rounded shadow">56 Participants</div>
          <div className="bg-white p-4 rounded shadow">+12% Growth</div>
        </div>
      </div>
    </div>
  );
}