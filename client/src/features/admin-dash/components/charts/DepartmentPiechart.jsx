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
      borderWidth: 2,
      borderColor: '#ffffff',
    }],
  };

const options = {
  plugins: { 
    tooltip: { 
      enabled: true,
      backgroundColor: '#1f2937',
      padding: 12,
      titleFont: { size: 13, weight: 'bold' },
      bodyFont: { size: 12 },
      borderRadius: 8,
      usePointStyle: true,
      callbacks: {
        label: (context) => `${context.label}: ${context.raw}%`
      }
    },
    legend: { display: false } 
  },
  maintainAspectRatio: false,
};

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
      <div className="mb-8 pb-6 border-b-2 border-gray-100">
        <h2 className="text-2xl font-black text-gray-950 mb-1">Department Engagement</h2>
        <p className="text-sm text-gray-600 font-medium">Shout-outs by department</p>
      </div>
      
      <div className="flex items-center justify-center gap-12">
        <div className="w-48 h-48 flex-shrink-0">
          <Pie data={chartData} options={options} />
        </div>
        <div className="flex-1 grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
          {departments.map((dept, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition-colors duration-200">
              <div 
                className="w-4 h-4 rounded-full flex-shrink-0 shadow-md" 
                style={{ backgroundColor: dept.color }}
              ></div>
              <div className="flex-1">
                <p className="text-gray-800 font-semibold">{dept.name}</p>
              </div>
              <p className="text-gray-700 font-bold">{dept.value}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentPiechart;