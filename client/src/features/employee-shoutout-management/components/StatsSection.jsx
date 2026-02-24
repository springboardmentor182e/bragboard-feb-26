import StatsCard from "./StatsCard";

const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatsCard
        title="Total Shoutouts"
        value="124"
        subtitle="+12% vs last month"
        bg="bg-white border border-purple-100"
      />
      <StatsCard
        title="Total Reactions"
        value="842"
        subtitle="+18% engagement"
        bg="bg-purple-50 border border-purple-200"
      />
      <StatsCard
        title="Pinned Posts"
        value="12"
        subtitle="Featured on feed"
        bg="bg-white border border-purple-100"
      />
      <StatsCard
        title="Active Posts"
        value="102"
        subtitle="Currently visible"
        bg="bg-white border border-purple-100"
      />
    </div>
  );
};

export default StatsSection;