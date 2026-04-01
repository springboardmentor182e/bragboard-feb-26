import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { adminAPI } from '../../../../services/api';

ChartJS.register(ArcElement, Tooltip);

const DepartmentPiechart = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDepartmentData();
    const interval = setInterval(fetchDepartmentData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchDepartmentData = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getEngagementAnalytics();
      
      const deptData = response.data.department_engagement.map((dept, idx) => ({
        name: dept.department,
        value: dept.percentage,
        shoutouts: dept.shoutouts,
        members: dept.members,
        engagement_rate: dept.engagement_rate,
        color: ['#EF4444', '#ff79bc', '#00d8bf', '#ff6a00', '#bdf4fe', '#753aff'][idx % 6]
      }));
      
      setDepartments(deptData);
      setError('');
    } catch (error) {
      console.error('Error fetching department data:', error);
      setError('Failed to load department data');
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100">
        <div className="mb-8 pb-6 border-b-2 border-gray-100">
          <h2 className="text-2xl font-black text-gray-950 mb-1">Department Engagement</h2>
          <p className="text-sm text-gray-600 font-medium">Shout-outs by department</p>
        </div>
        <div className="h-[ 280px] flex items-center justify-center">
          <p className="text-gray-400">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100">
        <div className="mb-8 pb-6 border-b-2 border-gray-100">
          <h2 className="text-2xl font-black text-gray-950 mb-1">Department Engagement</h2>
          <p className="text-sm text-gray-600 font-medium">Shout-outs by department</p>
        </div>
        <div className="h-[280px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-3">{error}</p>
            <button 
              onClick={fetchDepartmentData}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!departments.length) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100">
        <div className="mb-8 pb-6 border-b-2 border-gray-100">
          <h2 className="text-2xl font-black text-gray-950 mb-1">Department Engagement</h2>
          <p className="text-sm text-gray-600 font-medium">Shout-outs by department</p>
        </div>
        <div className="h-[280px] flex items-center justify-center">
          <p className="text-gray-400">No department data available</p>
        </div>
      </div>
    );
  }

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
        <p className="text-sm text-gray-600 font-medium">Shout-outs distribution by department</p>
      </div>
      
      <div className="flex items-center justify-center gap-12">
        <div className="w-48 h-48 flex-shrink-0">
          <Pie data={chartData} options={options} />
        </div>
        <div className="flex-1 grid grid-cols-1 gap-y-3 text-sm max-h-64 overflow-y-auto">
          {departments.map((dept, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition-colors duration-200 border border-gray-100">
              <div 
                className="w-4 h-4 rounded-full flex-shrink-0 shadow-md" 
                style={{ backgroundColor: dept.color }}
              ></div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 font-semibold truncate">{dept.name}</p>
                <p className="text-xs text-gray-600">{dept.shoutouts} shout-outs • {dept.members} members</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-gray-700 font-bold">{dept.value}%</p>
                <p className="text-xs text-indigo-600 font-semibold">{dept.engagement_rate}% active</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentPiechart;