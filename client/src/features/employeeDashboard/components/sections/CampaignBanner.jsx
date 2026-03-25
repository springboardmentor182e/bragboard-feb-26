import { Sparkles, Calendar, TrendingUp } from "lucide-react";

const CampaignBanner = () => {
  return (
    <div
      className="
        relative
        rounded-2xl
        p-8
        text-white
        overflow-hidden
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        shadow-[0_25px_70px_rgba(99,102,241,0.35)]
      "
    >
      {/* Glow overlay */}
      <div className="absolute inset-0 bg-white/10 blur-3xl opacity-20"></div>

      {/* Floating glow circle */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="flex items-center gap-2 text-sm font-medium opacity-90 mb-4">
        <Sparkles size={16} />
        ACTIVE CAMPAIGN
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">
        Q1 Recognition Rally
      </h2>

      {/* Subtitle */}
      <p className="text-sm opacity-90 mb-6 max-w-lg">
        Recognize teammates who go above and beyond this quarter
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg text-sm backdrop-blur-md">
          <Calendar size={16} />
          Ends 3/31/2026
        </div>

        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg text-sm backdrop-blur-md">
          <TrendingUp size={16} />
          2x Points Reward
        </div>
      </div>
    </div>
  );
};

export default CampaignBanner;