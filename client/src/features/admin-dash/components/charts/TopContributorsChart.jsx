import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { adminAPI } from '../../../../services/api';

const TopContributorsChart = () => {
  const [contributorsData, setContributorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEngagementAnalytics();
    // Refresh every minute
    const interval = setInterval(fetchEngagementAnalytics, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchEngagementAnalytics = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getEngagementAnalytics();
      
      // Transform top contributors to chart format with engagement score
      const chartData = response.data.top_contributors.map((contributor, idx) => ({
        name: contributor.name.substring(0, 12), // Shorten for display
        value: Math.round(contributor.engagement_score),
        sent: contributor.sent,
        received: contributor.received,
        reactions: contributor.reactions,
        dept: contributor.department,
        fill: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'][idx % 5]
      }));
      
      setContributorsData(chartData);
      setError('');
    } catch (error) {
      console.error('Error fetching engagement analytics:', error);
      setError('Failed to load contributor data');
      setContributorsData([]);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100">
        <div className="mb-8 pb-6 border-b-2 border-gray-100">
          <h2 className="text-2xl font-black text-gray-950 mb-1">Top 5 Contributors</h2>
          <p className="text-sm text-gray-600 font-medium">Engagement score (sent + received + reactions)</p>
        </div>
        <div className="h-[320px] flex items-center justify-center">
          <p className="text-gray-400">Loading contributors...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100">
        <div className="mb-8 pb-6 border-b-2 border-gray-100">
          <h2 className="text-2xl font-black text-gray-950 mb-1">Top 5 Contributors</h2>
          <p className="text-sm text-gray-600 font-medium">Engagement score</p>
        </div>
        <div className="h-[320px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 font-medium">{error}</p>
            <button 
              onClick={fetchEngagementAnalytics}
              className="mt-3 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!contributorsData.length) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100">
        <div className="mb-8 pb-6 border-b-2 border-gray-100">
          <h2 className="text-2xl font-black text-gray-950 mb-1">Top 5 Contributors</h2>
          <p className="text-sm text-gray-600 font-medium">Engagement score</p>
        </div>
        <div className="h-[320px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 mb-3">No contributor data available yet</p>
            <p className="text-xs text-gray-500">Contributors will appear as shout-outs are sent</p>
          </div>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...contributorsData.map(item => item.value));
  const yAxisMax = Math.ceil(maxValue / 10) * 10 || 10;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg border border-gray-700 text-sm">
          <p className="font-bold">{data.name}</p>
          <p className="text-blue-300">📤 Sent: {data.sent}</p>
          <p className="text-green-300">📥 Received: {data.received}</p>
          <p className="text-yellow-300">👏 Reactions: {data.reactions}</p>
          <p className="text-purple-300 font-bold mt-2">Score: {data.value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
     <div className="mb-8 pb-6 border-b-2 border-gray-100">
        <h2 className="text-2xl font-black text-gray-950 mb-1">Top 5 Contributors</h2>
        <p className="text-sm text-gray-600 font-medium">Most impactful employees (engagement score)</p>
      </div>
      
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={contributorsData} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 500 }}
            axisLine={{ stroke: '#e5e7eb', strokeWidth: 2 }}
            tickLine={{ stroke: '#e5e7eb' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            domain={[0, yAxisMax]} 
            tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 500 }}
            axisLine={{ stroke: '#e5e7eb', strokeWidth: 2 }}
            tickLine={{ stroke: '#e5e7eb' }}
            label={{ value: 'Engagement Score', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
        <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-blue-600 font-semibold">📤 Sent</p>
          <p className="text-blue-700">{contributorsData.reduce((sum, d) => sum + d.sent, 0)} total</p>
        </div>
        <div className="p-2 bg-green-50 rounded-lg border border-green-100">
          <p className="text-green-600 font-semibold">📥 Received</p>
          <p className="text-green-700">{contributorsData.reduce((sum, d) => sum + d.received, 0)} total</p>
        </div>
      </div>
    </div>
  );
};

export default TopContributorsChart;