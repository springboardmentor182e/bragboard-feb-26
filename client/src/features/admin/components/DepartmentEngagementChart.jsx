import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Engineering", value: 33 },
  { name: "Customer", value: 22 },
  { name: "Design", value: 17 },
  { name: "Product", value: 15 },
  { name: "Marketing", value: 13 },
];

const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EC4899", "#A855F7"];

const DepartmentEngagementChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-4">
        Department Engagement
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentEngagementChart;