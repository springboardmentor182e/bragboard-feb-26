const badges = [
  { id: 1, title: "Team Player", icon: "🤝" },
  { id: 2, title: "Top Performer", icon: "🏆" },
  { id: 3, title: "Bug Slayer", icon: "🐞" }
];

const Badges = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-darkText mb-8">
        My Badges
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {badges.map(badge => (
          <div
            key={badge.id}
            className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition"
          >
            <div className="text-4xl mb-3">
              {badge.icon}
            </div>
            <h4 className="font-semibold text-darkText">
              {badge.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;