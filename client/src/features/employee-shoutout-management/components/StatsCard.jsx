const StatsCard = ({ title, value, subtitle, bg }) => {
  return (
    <div
      className={`p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ${bg}`}
    >
      <p className="text-sm text-gray-500">{title}</p>

      <h2 className="text-3xl font-bold mt-2 text-gray-800">
        {value}
      </h2>

      <p className="text-sm text-green-600 mt-2 font-medium">
        {subtitle}
      </p>
    </div>
  );
};

export default StatsCard;