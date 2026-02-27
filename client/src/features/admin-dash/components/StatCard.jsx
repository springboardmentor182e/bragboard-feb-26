const StatCard = ({ title, value, growth }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between">
        <span className="text-gray-500">{title}</span>
        <span className="text-green-500 text-sm">{growth}</span>
      </div>
      <h2 className="text-2xl font-bold mt-4">{value}</h2>
    </div>
  );
};

export default StatCard;