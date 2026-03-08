import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { departmentEngagement } from '../../../data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, payload: entry } = payload[0];
    return (
      <div className="bg-white border border-gray-100 shadow-md rounded-xl px-4 py-2 text-sm">
        <p className="font-semibold" style={{ color: entry.color }}>{name}</p>
        <p className="text-gray-700 font-bold">{value}%</p>
      </div>
    );
  }
  return null;
};

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-3">
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center gap-1.5 text-sm">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-600 font-medium">{entry.value}: {entry.payload.value}%</span>
        </div>
      ))}
    </div>
  );
};

export default function DepartmentEngagementChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-base font-bold text-gray-900 mb-2">Department Engagement</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={departmentEngagement}
            cx="50%"
            cy="45%"
            outerRadius={100}
            dataKey="value"
            strokeWidth={2}
            stroke="#fff"
          >
            {departmentEngagement.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
