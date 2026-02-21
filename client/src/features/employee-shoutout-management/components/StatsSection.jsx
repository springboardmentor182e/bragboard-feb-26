import StatsCard from "./StatsCard";

const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatsCard
        title="Total Shoutouts"
        value="5"
        subtitle="+12% vs last month"
        bg="bg-white"
      />
      <StatsCard
        title="Total Reactions"
        value="254"
        subtitle="+18% engagement"
        bg="bg-purple-50"
      />
      <StatsCard
        title="Pinned Posts"
        value="1"
        subtitle="Featured on feed"
        bg="bg-green-50"
      />
      <StatsCard
        title="Active Posts"
        value="3"
        subtitle="Currently visible"
        bg="bg-yellow-50"
      />
    </div>
  );
};

export default StatsSection;