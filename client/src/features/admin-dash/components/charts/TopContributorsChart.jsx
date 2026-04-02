import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../../../services/api';

const TopContributorsChart = () => {
  const [contributorsData, setContributorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEngagementAnalytics();
    const interval = setInterval(fetchEngagementAnalytics, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchEngagementAnalytics = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getEngagementAnalytics();
      
      const chartData = response.data.top_contributors.map((contributor, idx) => ({
        id: idx,
        fullName: contributor.name,
        name: contributor.name.substring(0, 10),
        value: Math.round(contributor.engagement_score),
        sent: contributor.sent,
        received: contributor.received,
        reactions: contributor.reactions,
        dept: contributor.department,
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

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 h-full flex items-center justify-center">
        <div className="animate-pulse text-sm text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 h-full flex items-center justify-center">
        <button 
          onClick={fetchEngagementAnalytics}
          className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!contributorsData.length) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 h-full flex items-center justify-center">
        <p className="text-sm text-gray-500">No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...contributorsData.map(item => item.value));
  const totalEngagement = contributorsData.reduce((sum, d) => sum + d.value, 0);
  const topPerformer = contributorsData[0];
  const otherContributors = contributorsData.slice(1, 5);

  const totalSent = contributorsData.reduce((sum, d) => sum + d.sent, 0);
  const totalReceived = contributorsData.reduce((sum, d) => sum + d.received, 0);
  const totalReactions = contributorsData.reduce((sum, d) => sum + d.reactions, 0);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 h-full flex flex-col overflow-hidden">
      {/* Header - Title Only */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-base font-black text-gray-950"><span className="text-xl">🌟</span> Top 5 Contributors</h3>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {/* Full-Width Hero Card - #1 Contributor */}
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-lg p-4 text-white shadow-md flex-shrink-0 border border-purple-400/20">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold opacity-80 leading-none mb-1">Champion</p>
              <p className="text-2xl font-black leading-tight mb-0.5">{topPerformer.fullName}</p>
              <p className="text-4xl font-black text-white">{topPerformer.value}</p>
            </div>
            <span className="text-5xl flex-shrink-0">🏆</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm pt-4 border-t border-white/30">
            <div className="text-center">
              <p className="opacity-80 text-xs leading-none mb-1">Sent</p>
              <p className="font-black text-lg"><span className="text-xl">📤</span></p>
              <p className="font-black text-lg">{topPerformer.sent}</p>
            </div>
            <div className="text-center">
              <p className="opacity-80 text-xs leading-none mb-1">Received</p>
              <p className="font-black text-lg"><span className="text-xl">📥</span></p>
              <p className="font-black text-lg">{topPerformer.received}</p>
            </div>
            <div className="text-center">
              <p className="opacity-80 text-xs leading-none mb-1">Reactions</p>
              <p className="font-black text-lg"><span className="text-xl">👏</span></p>
              <p className="font-black text-lg">{topPerformer.reactions}</p>
            </div>
          </div>
        </div>

        {/* 2-Column Grid for #2-5 Contributors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
          {otherContributors.map((contributor, index) => {
            const percentage = (contributor.value / maxValue) * 100;
            const rankNum = index + 2;
            const rankColors = [
              { bg: 'bg-blue-50', badge: 'bg-blue-500', text: 'text-blue-900', border: 'border-blue-200' },
              { bg: 'bg-emerald-50', badge: 'bg-emerald-500', text: 'text-emerald-900', border: 'border-emerald-200' },
              { bg: 'bg-amber-50', badge: 'bg-amber-500', text: 'text-amber-900', border: 'border-amber-200' },
              { bg: 'bg-violet-50', badge: 'bg-violet-500', text: 'text-violet-900', border: 'border-violet-200' },
            ];
            const colors = rankColors[index];

            return (
              <div 
                key={contributor.id} 
                className={`${colors.bg} border ${colors.border} rounded-lg p-3.5 hover:shadow-md transition-all duration-200 flex flex-col`}
              >
                {/* Rank, Name, Score - Single Row */}
                <div className="flex items-center gap-2 mb-3">
                  <div className={`${colors.badge} text-white rounded-full font-black w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm`}>
                    {rankNum}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold ${colors.text} truncate`}>{contributor.fullName}</p>
                  </div>
                  <p className="font-black text-gray-900 flex-shrink-0 text-lg">{contributor.value}</p>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-gray-300/50 rounded-full overflow-hidden mb-3">
                  <div 
                    className={`${colors.badge} h-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Inline Stats */}
                <div className="flex justify-between text-xs font-semibold px-0.5 gap-2">
                  <span className={`${colors.text} flex-1 text-center`}>
                    <span className="text-lg font-bold">📤</span> {contributor.sent}
                  </span>
                  <span className={`${colors.text} flex-1 text-center`}>
                    <span className="text-lg font-bold">📥</span> {contributor.received}
                  </span>
                  <span className={`${colors.text} flex-1 text-center`}>
                    <span className="text-lg font-bold">👏</span> {contributor.reactions}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats Footer */}
      <div className="border-t border-gray-200 px-4 py-4 bg-white grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-lg font-bold text-blue-600 mb-1"><span className="text-2xl">📤</span> Total Sent</p>
          <p className="text-2xl font-black text-gray-900">{totalSent}</p>
          <p className="text-xs text-gray-500 leading-none mt-1">Shout-outs sent</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-emerald-600 mb-1"><span className="text-2xl">📥</span> Total Received</p>
          <p className="text-2xl font-black text-gray-900">{totalReceived}</p>
          <p className="text-xs text-gray-500 leading-none mt-1">Appreciations</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-amber-600 mb-1"><span className="text-2xl">👏</span> Total Reactions</p>
          <p className="text-2xl font-black text-gray-900">{totalReactions}</p>
          <p className="text-xs text-gray-500 leading-none mt-1">Positive reactions</p>
        </div>
      </div>
    </div>
  );
};

export default TopContributorsChart;