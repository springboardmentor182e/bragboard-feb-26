function StatCard({ title, value, subtitle, variant }) {
  const variants = {
    yellow: "bg-[#F7F3E7] border border-yellow-300",
    blue: "bg-[#EEF2FF] border border-indigo-300",
    green: "bg-[#EAF7EF] border border-green-300",
  };

  return (
    <div className={`p-8 rounded-2xl ${variants[variant]}`}>
      <p className="text-sm text-gray-600">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-3">
        {value?.toLocaleString()}
      </h2>

      <p className="text-sm text-gray-600 mt-2">
        {subtitle}
      </p>
    </div>
  );
}

export default StatCard;