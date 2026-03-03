import StatsCard from "./StatsCard";

const StatsSection = ({ data = [] }) => {
  const totalShoutouts = data.length;
  const totalReactions = data.reduce((acc, item) => {
    const r = item.reactions || {};
    return acc + (r.hearts || 0) + (r.claps || 0) + (r.stars || 0) + (r.comments || 0);
  }, 0);
  const pinnedCount = data.filter(item => item.status === "Pinned").length;
  const activeCount = data.filter(item => item.status === "Active").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatsCard
        title="Total Shoutouts"
        value={totalShoutouts.toString()}
        subtitle="Across all departments"
        bg="bg-white border border-purple-100"
      />
      <StatsCard
        title="Total Reactions"
        value={totalReactions.toString()}
        subtitle="Hearts, Claps, Stars"
        bg="bg-purple-50 border border-purple-200"
      />
      <StatsCard
        title="Pinned Posts"
        value={pinnedCount.toString()}
        subtitle="Featured on feed"
        bg="bg-white border border-purple-100"
      />
      <StatsCard
        title="Active Posts"
        value={activeCount.toString()}
        subtitle="Currently visible"
        bg="bg-white border border-purple-100"
      />
    </div>
  );
};

export default StatsSection;