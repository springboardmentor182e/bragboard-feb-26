import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { topContributors } from '../../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-md rounded-xl px-4 py-2 text-sm">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-primary font-bold">{payload[0].value} shoutouts</p>
      </div>
    );
  }
  return null;
};

export default function TopContributorsChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-base font-bold text-gray-900 mb-5">Top Contributors</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={topContributors} barSize={46} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 13 }}
          />
          <YAxis
            domain={[0, 60]}
            ticks={[0, 15, 30, 45, 60]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 13 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F5F3FF' }} />
          <Bar dataKey="value" fill="#7C3AED" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
