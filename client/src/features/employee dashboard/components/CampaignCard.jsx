const stats = [
  { value: '245', label: 'Shoutouts' },
  { value: '56', label: 'Participants' },
  { value: '+12%', label: 'Growth' },
];

export default function CampaignCard() {
  return (
    <div
      className="rounded-2xl p-8 text-white"
      style={{ background: 'linear-gradient(135deg, #6D28D9 0%, #EC4899 100%)' }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">🎯</span>
        <h2 className="text-2xl font-bold">Q1 Excellence Recognition Drive</h2>
      </div>

      <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-xl">
        Let's celebrate outstanding contributions across teams. Recognize colleagues who demonstrate
        innovation, collaboration, and leadership.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl px-5 py-4" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-white/75 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <button className="px-8 py-3 bg-white text-primary font-semibold rounded-xl text-sm hover:bg-white/90 transition-colors cursor-pointer">
        Give a Shoutout
      </button>
    </div>
  );
}
