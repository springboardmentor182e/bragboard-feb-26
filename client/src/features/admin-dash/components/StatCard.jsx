import React from 'react';
import { ArrowTrendingUpIcon, ChartBarIcon, HeartIcon, UsersIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const StatCard = ({ title, value, trend, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case 'chart':
        return <ChartBarIcon className="w-8 h-8" />;
      case 'heart':
        return <HeartIcon className="w-8 h-8" />;
      case 'users':
        return <UsersIcon className="w-8 h-8" />;
      case 'alerts':
        return <ExclamationTriangleIcon className="w-8 h-8" />;
      default:
        return <ChartBarIcon className="w-8 h-8" />;
    }
  };

  const getColors = () => {
    switch (icon) {
      case 'chart':
        return { bgGradient: 'from-blue-50 to-indigo-50', iconColor: 'text-blue-600', borderColor: 'border-blue-100' };
      case 'heart':
        return { bgGradient: 'from-amber-50 to-orange-50', iconColor: 'text-amber-600', borderColor: 'border-amber-100' };
      case 'users':
        return { bgGradient: 'from-emerald-50 to-teal-50', iconColor: 'text-emerald-600', borderColor: 'border-emerald-100' };
      case 'alerts':
        return { bgGradient: 'from-rose-50 to-red-50', iconColor: 'text-rose-600', borderColor: 'border-rose-100' };
      default:
        return { bgGradient: 'from-slate-50 to-slate-50', iconColor: 'text-slate-600', borderColor: 'border-slate-100' };
    }
  };

  const colors = getColors();

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${colors.bgGradient} rounded-2xl p-6 border ${colors.borderColor} shadow-sm hover:shadow-md transition-all duration-300`}>
      {/* Icon Background */}
      <div className="absolute top-4 right-4 opacity-5">
        <ChartBarIcon className="w-24 h-24" />
      </div>

      {/* Content */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`${colors.iconColor} opacity-80`}>
            {getIcon()}
          </div>
          {trend && (
            <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
              <ArrowTrendingUpIcon className="w-3 h-3" />
              {trend}
            </span>
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">{typeof value === 'number' ? value.toLocaleString() : value}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;