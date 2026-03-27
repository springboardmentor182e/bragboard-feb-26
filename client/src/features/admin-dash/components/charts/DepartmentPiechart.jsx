import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

const departments = [
  // { name: 'Design', value: 17, color: '#3B82F6' },
  // { name: 'Product', value: 15, color: '#F59E0B' },
  // { name: 'Engineering', value: 33, color: '#10B981' },
  // { name: 'Academy', value: 10, color: '#8B5CF6' },
  { name: 'Leadership', value: 9, color: '#EF4444' },
  { name: 'Team', value: 8, color: '#ff79bc' },
  { name: 'Badges', value: 7, color: '#00d8bf' },
  { name: 'Analytics', value: 6, color: '#ff6a00' },
  { name: 'Feed', value: 5, color: '#bdf4fe' },
  { name: 'Leaderboard', value: 4, color: '#753aff' },
  // { name: 'Admin', value: 3, color: '#6B7280' },
  // { name: 'Attention', value: 2, color: '#ff4a4a' },
];

const DepartmentPiechart = () => {
  const chartData = {
    labels: departments.map(d => d.name),
    datasets: [{
      data: departments.map(d => d.value),
      backgroundColor: departments.map(d => d.color),
      borderWidth: 0,
    }],
  };

const options = {
  plugins: { 
    tooltip: { 
      enabled: true,
      callbacks: {
        label: (context) => `${context.label}: ${context.raw}%`
      }
    },
    legend: { display: false } 
  },
  maintainAspectRatio: false,
};

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Department Engagement</h2>
      <p className="text-sm text-gray-500 mb-4">Shout-outs by department</p>
      
      <div className="flex gap-6">
        <div className="w-32 h-32">
          <Pie data={chartData} options={options} />
        </div>
        <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          {departments.map((dept, i) => (
            <div key={i} className="flex items-center">
              <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: dept.color }}></div>
              <span className="text-gray-600">{dept.name}</span>
              <span className="ml-auto font-medium text-gray-900">{dept.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentPiechart;