export default function LeaderboardRow({ user }) {
  return (
    <tr className="border-b hover:bg-gray-100 transition">
      <td className="py-3">#{user.rank}</td>

      <td className="py-3 flex items-center gap-3">
        <img
          src={`http://127.0.0.1:8000${user.photo_url}`}
          alt={user.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        {user.name}
      </td>

      <td className="py-3">{user.department}</td>

      <td className="py-3 text-right font-semibold">
        {user.points}
      </td>
    </tr>
  );
}