import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { adminAPI } from '../../../../services/api';

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
      
      const deptData = response.data.department_engagement.map((dept) => ({
        name: dept.department,
        value: dept.percentage,
        shoutouts: dept.shoutouts,
        members: dept.members,
        engagement_rate: dept.engagement_rate,
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

  // Colors for pie chart - matching modern palette
  const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ec4899', '#f97316', '#3b82f6'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg border border-gray-700 text-sm">
          <p className="font-bold">{data.name}</p>
          <p className="text-indigo-300">Percentage: {data.value}%</p>
          <p className="text-blue-300">Shout-outs: {data.shoutouts}</p>
          <p className="text-green-300">Members: {data.members}</p>
          <p className="text-yellow-300">Active Rate: {data.engagement_rate}%</p>
        </div>
      );
    }
    return null;
  };

  // Custom label renderer for pie slices
  const renderCustomLabel = ({ name, value }) => `${name} ${value}%`;

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
      <div className="mb-8 pb-6 border-b-2 border-gray-100">
        <h2 className="text-2xl font-black text-gray-950 mb-1">Department Engagement</h2>
        <p className="text-sm text-gray-600 font-medium">Shout-outs by department</p>
      </div>
      
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={departments}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name} ${value}%`}
              outerRadius={80}
              innerRadius={50}
              fill="#8884d8"
              dataKey="value"
            >
              {departments.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry) => `${entry.payload.name}`}
              wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 w-full">
          {departments.map((dept, i) => (
            <div key={i} className="p-3 bg-slate-50 rounded-lg border border-gray-100 text-center hover:bg-slate-100 transition-colors duration-200">
              <div 
                className="w-3 h-3 rounded-full mx-auto mb-2 shadow-md" 
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              ></div>
              <p className="text-xs font-semibold text-gray-800 truncate">{dept.name}</p>
              <p className="text-sm font-bold text-indigo-600 mt-1">{dept.value}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentPiechart;