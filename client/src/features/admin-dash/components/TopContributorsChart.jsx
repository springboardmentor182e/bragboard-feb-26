import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { adminAPI } from '../../../services/api'; // Adjust this import path based on your project structure

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
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Top 5 Contributors</h2>
        <p className="text-sm text-gray-500 mb-6">Most shout-outs given this month</p>
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-gray-400">Loading contributors...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Top 5 Contributors</h2>
        <p className="text-sm text-gray-500 mb-6">Most shout-outs given this month</p>
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!data.length) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Top 5 Contributors</h2>
        <p className="text-sm text-gray-500 mb-6">Most shout-outs given this month</p>
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-gray-400">No contributor data available</p>
        </div>
      </div>
    );
  }

  // Calculate max value for YAxis domain
  const maxValue = Math.max(...data.map(item => item.value));
  const yAxisMax = Math.ceil(maxValue / 10) * 10; // Round up to nearest 10

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Top 5 Contributors</h2>
      <p className="text-sm text-gray-500 mb-6">Most shout-outs given this month</p>
      
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis 
            domain={[0, yAxisMax]} 
            ticks={Array.from({ length: 6 }, (_, i) => Math.round((yAxisMax / 5) * i))}
            tick={{ fontSize: 12 }} 
          />
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
            <span className="text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributorsChart;