import { Sparkles } from "lucide-react";
import Card from "../../../../components/ui/Card";

const CampaignCard = () => {
  return (
    <Card className="p-7 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white relative overflow-hidden rounded-2xl shadow-md">

      {/* Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

      {/* Floating Icon */}
      <div className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
        <Sparkles size={18} />
      </div>

      {/* CONTENT */}
      <div className="space-y-4">

        {/* LABEL */}
        <p className="text-xs uppercase tracking-wide opacity-80 flex items-center gap-2">
          <Sparkles size={14} />
          Active Campaign
        </p>

        {/* TITLE */}
        <h2 className="text-2xl font-bold">
          Q1 Recognition Rally
        </h2>

        {/* DESC */}
        <p className="text-sm opacity-90">
          Recognize teammates who go above and beyond this quarter
        </p>

        {/* BADGES */}
        <div className="flex gap-3 pt-2">

          <span className="bg-white/20 px-3 py-1.5 rounded-lg text-sm backdrop-blur">
            📅 Ends 3/31/2026
          </span>

          <span className="bg-white/20 px-3 py-1.5 rounded-lg text-sm backdrop-blur">
            ⚡ 2x Points Reward
          </span>

        </div>

      </div>

    </Card>
  );
};

export default CampaignCard;