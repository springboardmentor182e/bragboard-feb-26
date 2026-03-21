import LeaderboardRow from "./LeaderboardRow";

export default function LeaderboardTable({ users, startRank = 1 }) {
  return (
    <div className="overflow-x-auto rounded-2xl">

      <table className="w-full text-left border-collapse">

        {/* ===== HEADER ===== */}
        <thead>
          <tr className="text-sm text-orange-600">
            <th className="py-3 px-3">Rank</th>
            <th className="px-3">Employee</th>
            <th className="px-3">Username</th>
            <th className="px-3">Email</th>
            <th className="px-3">Department</th>
            <th className="text-right px-3">Points</th>
          </tr>
        </thead>

        {/* ===== BODY (CONNECTED TO ROW) ===== */}
        <tbody>
          {users.map((user, index) => (
            <LeaderboardRow
              key={user.id || index}
              user={user}
              index={index}
              startRank={startRank}
            />
          ))}
        </tbody>

      </table>

    </div>
  );
}