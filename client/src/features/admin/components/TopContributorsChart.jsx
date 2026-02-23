import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jessica", value: 45 },
  { name: "Michael", value: 38 },
  { name: "David", value: 32 },
  { name: "Marcus", value: 28 },
  { name: "John", value: 25 },
];

const TopContributorsChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-4">
        Top 5 Contributors
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#6366F1" radius={[8,8,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopContributorsChart;