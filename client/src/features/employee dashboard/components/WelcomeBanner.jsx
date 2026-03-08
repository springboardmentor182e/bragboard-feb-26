import { Activity } from 'lucide-react';

export default function WelcomeBanner() {
  return (
    <div
      className="rounded-2xl p-8 text-white flex items-center gap-6"
      style={{ background: 'linear-gradient(120deg, #4C1D95 0%, #7C3AED 100%)' }}
    >
      <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
        <Activity size={30} className="text-white" strokeWidth={2} />
      </div>
      <div>
        <h1 className="text-3xl font-bold leading-tight">Welcome back, Alex 👋</h1>
        <p className="text-white/80 mt-1.5 text-base">
          You've received 3 new recognitions this week. Keep inspiring the team!
        </p>
      </div>
    </div>
  );
}
