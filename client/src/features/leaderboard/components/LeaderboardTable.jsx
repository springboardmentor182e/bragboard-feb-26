import LeaderboardRow from "./LeaderboardRow";

export default function LeaderboardTable({ users = [] }) {

  console.log("TABLE USERS:", users); // debug

  return (
    <div className="overflow-x-auto bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow">
      
      <table className="w-full border-separate border-spacing-y-2">

        {/* HEADER */}
        <thead>
          <tr className="text-left text-orange-500 text-sm font-semibold">
            <th className="px-3 py-3">Rank</th>
            <th className="px-3 py-3">Employee</th>
            <th className="px-3 py-3">Username</th>
            <th className="px-3 py-3">Email</th>
            <th className="px-3 py-3">Department</th>
            <th className="px-3 py-3 text-right">Points</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <LeaderboardRow
                key={user.id || index}
                user={user}
                index={index}
                startRank={1}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-400">
                No data
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}