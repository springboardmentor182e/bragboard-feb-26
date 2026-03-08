import { useShoutouts } from '../../../context/ShoutoutContext';

export default function CampaignCard() {
  const { shoutouts } = useShoutouts();
  
  // Dynamic stats calculation based on context data
  const stats = [
    { value: shoutouts.length.toString(), label: 'Shoutouts' },
    { value: new Set(shoutouts.map(s => s.recipient?.name)).size.toString(), label: 'Participants' },
    { value: '+' + shoutouts.length, label: 'New Today' },
  ];

  return (
    <div
      className="rounded-3xl p-8 text-white shadow-xl shadow-purple-200/50 mb-6"
      style={{ background: 'linear-gradient(135deg, #6D28D9 0%, #EC4899 100%)' }}
    >
      {/* Header section */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl" role="img" aria-label="target">🎯</span>
        <h2 className="text-2xl font-bold tracking-tight">Q1 Excellence Recognition Drive</h2>
      </div>

      {/* Description */}
      <p className="text-white/80 text-sm leading-relaxed mb-8 max-w-xl">
        Let's celebrate outstanding contributions across teams. Recognize colleagues who demonstrate
        innovation, collaboration, and leadership.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            className="rounded-2xl px-5 py-4 backdrop-blur-md border border-white/10" 
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
          >
            <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/70 mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div> 
  );
}