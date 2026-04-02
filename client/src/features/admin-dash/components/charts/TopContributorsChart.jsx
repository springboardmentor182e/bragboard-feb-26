import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../../../services/api';

const TopContributorsChart = () => {
  const [contributorsData, setContributorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEngagementAnalytics();
    const interval = setInterval(fetchEngagementAnalytics, 300000); // 5 minutes instead of 60 seconds
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
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100">
        <div className="mb-8 pb-6 border-b-2 border-gray-100">
          <h2 className="text-2xl font-black text-gray-950 mb-1"><span className="text-2xl">🌟</span> Top 5 Contributors</h2>
          <p className="text-sm text-gray-600 font-medium">Your engagement champions</p>
        </div>
        <div className="h-[280px] flex items-center justify-center">
          <div className="animate-pulse text-sm text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100">
        <div className="mb-8 pb-6 border-b-2 border-gray-100">
          <h2 className="text-2xl font-black text-gray-950 mb-1"><span className="text-2xl">🌟</span> Top 5 Contributors</h2>
          <p className="text-sm text-gray-600 font-medium">Your engagement champions</p>
        </div>
        <div className="h-[280px] flex items-center justify-center">
          <button 
            onClick={fetchEngagementAnalytics}
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!contributorsData.length) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border-2 border-gray-100">
        <div className="mb-8 pb-6 border-b-2 border-gray-100">
          <h2 className="text-2xl font-black text-gray-950 mb-1"><span className="text-2xl">🌟</span> Top 5 Contributors</h2>
          <p className="text-sm text-gray-600 font-medium">Your engagement champions</p>
        </div>
        <div className="h-[280px] flex items-center justify-center">
          <p className="text-sm text-gray-500">No data available</p>
        </div>
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
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Header - Title and Subheading */}
      <div className="mb-4 pb-3 border-b-2 border-gray-100">
        <h2 className="text-xl font-black text-gray-950 mb-0.5"><span className="text-xl">🌟</span> Top 5 Contributors</h2>
        <p className="text-xs text-gray-600 font-medium">Your engagement champions</p>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {/* Full-Width Hero Card - #1 Contributor */}
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-lg p-3.5 text-white shadow-lg flex-shrink-0 border border-purple-400/20">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold opacity-80 leading-none mb-0.5">Champion</p>
              <p className="text-xl font-black leading-tight mb-0.5">{topPerformer.fullName}</p>
              <p className="text-3xl font-black text-white">{topPerformer.value}</p>
            </div>
            <span className="text-4xl flex-shrink-0">🏆</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm pt-2.5 border-t border-white/30">
            <div className="text-center">
              <p className="opacity-80 text-xs leading-none mb-0.5">Sent</p>
              <p className="font-black text-sm"><span className="text-lg">📤</span></p>
              <p className="font-black text-sm">{topPerformer.sent}</p>
            </div>
            <div className="text-center">
              <p className="opacity-80 text-xs leading-none mb-0.5">Received</p>
              <p className="font-black text-sm"><span className="text-lg">📥</span></p>
              <p className="font-black text-sm">{topPerformer.received}</p>
            </div>
            <div className="text-center">
              <p className="opacity-80 text-xs leading-none mb-0.5">Reactions</p>
              <p className="font-black text-sm"><span className="text-lg">👏</span></p>
              <p className="font-black text-sm">{topPerformer.reactions}</p>
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
                className={`${colors.bg} border ${colors.border} rounded-lg p-2.5 hover:shadow-md transition-all duration-200 flex flex-col`}
              >
                {/* Rank, Name, Score - Single Row */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className={`${colors.badge} text-white rounded-full font-black w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs`}>
                    {rankNum}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold ${colors.text} truncate`}>{contributor.fullName}</p>
                  </div>
                  <p className="font-black text-gray-900 flex-shrink-0 text-base">{contributor.value}</p>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 bg-gray-300/50 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`${colors.badge} h-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Inline Stats */}
                <div className="flex justify-between text-xs font-semibold px-0.5 gap-1">
                  <span className={`${colors.text} flex-1 text-center`}>
                    <span className="text-sm font-bold">📤</span> {contributor.sent}
                  </span>
                  <span className={`${colors.text} flex-1 text-center`}>
                    <span className="text-sm font-bold">📥</span> {contributor.received}
                  </span>
                  <span className={`${colors.text} flex-1 text-center`}>
                    <span className="text-sm font-bold">👏</span> {contributor.reactions}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats Footer */}
      <div className="border-t-2 border-gray-100 mt-3 pt-3 grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className="text-xs font-bold text-blue-600 mb-0.5"><span className="text-lg">📤</span> Total Sent</p>
          <p className="text-lg font-black text-gray-900">{totalSent}</p>
          <p className="text-xs text-gray-500 leading-none mt-0.5">Shout-outs</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold text-emerald-600 mb-0.5"><span className="text-lg">📥</span> Received</p>
          <p className="text-lg font-black text-gray-900">{totalReceived}</p>
          <p className="text-xs text-gray-500 leading-none mt-0.5">Appreciations</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold text-amber-600 mb-0.5"><span className="text-lg">👏</span> Reactions</p>
          <p className="text-lg font-black text-gray-900">{totalReactions}</p>
          <p className="text-xs text-gray-500 leading-none mt-0.5">Engagements</p>
        </div>
      </div>
    </div>
  );
};

export default TopContributorsChart;