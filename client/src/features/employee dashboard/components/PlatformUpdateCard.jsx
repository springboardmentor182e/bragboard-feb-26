export default function PlatformUpdateCard() {
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: '#FFFBEB' }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">📢</span>
        <h3 className="font-bold text-gray-900">Platform Update</h3>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">
        New badge system has been introduced to better recognize collaboration and innovation. Explore
        the updated Leaderboard today!
      </p>
    </div>
  );
}
