import React from 'react';
import useEngagementData from '../hooks/useEngagementData';
import TopContributorsBarChart from './charts/TopContributorsBarChart';
import DepartmentEngagementBarChart from './charts/DepartmentEngagementBarChart';
import CategoryBreakdownDonutChart from './charts/CategoryBreakdownDonutChart';
import ReactionTypesDonutChart from './charts/ReactionTypesDonutChart';
import WeeklyTrendLineChart from './charts/WeeklyTrendLineChart';
import MonthlyTrendLineChart from './charts/MonthlyTrendLineChart';
import EngagementScoreDistributionChart from './charts/EngagementScoreDistributionChart';

const EngagementAnalyticsPage = () => {
  const { data, loading, error, timeSinceUpdate, refetch } = useEngagementData();

  return (
    <div className="space-y-6 pb-12">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-black text-white">Engagement Analytics</h2>
                <p className="text-sm text-gray-300">Real-time insights into platform engagement and user activity</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Status Indicator */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">
                Last updated: <span className="text-white font-semibold">{timeSinceUpdate}</span>
              </span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={refetch}
              disabled={loading}
              className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
              title="Refresh analytics data"
            >
              <svg
                className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/10">
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Top Contributor</p>
            <p className="text-lg font-bold text-white mt-1">
              {data.topContributors.length > 0 ? data.topContributors[0].name : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Departments</p>
            <p className="text-lg font-bold text-white mt-1">{data.departments.length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Categories</p>
            <p className="text-lg font-bold text-white mt-1">{data.categories.length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Reaction Types</p>
            <p className="text-lg font-bold text-white mt-1">{data.reactions.length}</p>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-2xl p-4 flex items-center gap-3">
          <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm text-red-200">{error}</p>
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Row 1: Top Contributors & Category Breakdown */}
        <TopContributorsBarChart
          data={data.topContributors}
          loading={loading}
          onRefresh={refetch}
        />
        <CategoryBreakdownDonutChart
          data={data.categories}
          loading={loading}
          onRefresh={refetch}
        />

        {/* Row 2: Department Engagement & Reaction Types */}
        <DepartmentEngagementBarChart
          data={data.departments}
          loading={loading}
          onRefresh={refetch}
        />
        <ReactionTypesDonutChart
          data={data.reactions}
          loading={loading}
          onRefresh={refetch}
        />
      </div>

      {/* Full-width Charts */}
      <div className="space-y-6">
        <WeeklyTrendLineChart
          data={data.weeklyTrend}
          loading={loading}
          onRefresh={refetch}
        />
        <MonthlyTrendLineChart
          data={data.monthlyTrend}
          loading={loading}
          onRefresh={refetch}
        />
        <EngagementScoreDistributionChart
          data={data.scoreDistribution}
          loading={loading}
          onRefresh={refetch}
        />
      </div>

      {/* Footer Info */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
        <p className="text-xs text-gray-400">
          Analytics data is automatically refreshed every 60 seconds. Last update: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default EngagementAnalyticsPage;
