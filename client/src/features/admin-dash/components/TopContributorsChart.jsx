import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jessica', value: 60, fill: '#3B82F6' },
  { name: 'Michael', value: 45, fill: '#EF4444' },
  { name: 'Marcus', value: 30, fill: '#10B981' },
];

const TopContributorsChart = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Top 5 Contributors</h2>
      <p className="text-sm text-gray-500 mb-6">Most shout-outs given this month</p>
      
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 60]} ticks={[0, 15, 30, 45, 60]} tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', color: 'white', border: 'none', borderRadius: '6px' }}
            itemStyle={{ color: 'white' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="flex justify-center gap-6 text-xs mt-4">
        {data.map((item, i) => (
          <div key={i} className="flex items-center">
            <div className="w-2.5 h-2.5 rounded-full mr-1.5" style={{ backgroundColor: item.fill }}></div>
            <span className="text-gray-600">{item.name} Park</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributorsChart;