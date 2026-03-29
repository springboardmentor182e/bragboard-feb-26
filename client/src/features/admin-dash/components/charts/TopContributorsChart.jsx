import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { adminAPI } from '../../../../services/api';
const TopContributorsChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTopContributors();
  }, []);

  const fetchTopContributors = async () => {
    try {
      setLoading(true);
      // Call the backend API we created
      const response = await adminAPI.getTopContributors();
      setData(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching top contributors:', error);
      setError('Failed to load contributor data');
      // Set empty array on error
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Top 5 Contributors</h2>
        <p className="text-sm text-gray-600 mb-6">Most shout-outs given this month</p>
        <div className="h-[280px] flex items-center justify-center">
          <p className="text-gray-400">Loading contributors...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Top 5 Contributors</h2>
        <p className="text-sm text-gray-600 mb-6">Most shout-outs given this month</p>
        <div className="h-[280px] flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Top 5 Contributors</h2>
        <p className="text-sm text-gray-600 mb-6">Most shout-outs given this month</p>
        <div className="h-[280px] flex items-center justify-center">
          <p className="text-gray-400">No contributor data available</p>
        </div>
      </div>
    );
  }

  // Calculate max value for YAxis domain
  const maxValue = Math.max(...data.map(item => item.value));
  const yAxisMax = Math.ceil(maxValue / 10) * 10; // Round up to nearest 10

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
      <div className="mb-8 pb-6 border-b-2 border-gray-100">
        <h2 className="text-2xl font-black text-gray-950 mb-1">Top 5 Contributors</h2>
        <p className="text-sm text-gray-600 font-medium">Most shout-outs given this month</p>
      </div>
      
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }}
            axisLine={{ stroke: '#e5e7eb', strokeWidth: 2 }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            domain={[0, yAxisMax]} 
            ticks={Array.from({ length: 6 }, (_, i) => Math.round((yAxisMax / 5) * i))}
            tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }}
            axisLine={{ stroke: '#e5e7eb', strokeWidth: 2 }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', color: 'white', border: '2px solid #4f46e5', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)' }}
            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
            cursor={{ fill: 'rgba(99, 102, 241, 0.08)' }}
          />
          <Bar 
            dataKey="value" 
            radius={[10, 10, 0, 0]} 
            fill="#6366f1"
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopContributorsChart;