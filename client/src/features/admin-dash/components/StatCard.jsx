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
        return { bgGradient: 'from-blue-50 to-indigo-50', iconColor: 'text-blue-600', borderColor: 'border-blue-200', accentColor: 'from-blue-400 to-indigo-500' };
      case 'heart':
        return { bgGradient: 'from-amber-50 to-orange-50', iconColor: 'text-amber-600', borderColor: 'border-amber-200', accentColor: 'from-amber-400 to-orange-500' };
      case 'users':
        return { bgGradient: 'from-emerald-50 to-teal-50', iconColor: 'text-emerald-600', borderColor: 'border-emerald-200', accentColor: 'from-emerald-400 to-teal-500' };
      case 'alerts':
        return { bgGradient: 'from-rose-50 to-red-50', iconColor: 'text-rose-600', borderColor: 'border-rose-200', accentColor: 'from-rose-400 to-red-500' };
      default:
        return { bgGradient: 'from-slate-50 to-slate-50', iconColor: 'text-slate-600', borderColor: 'border-slate-100', accentColor: 'from-slate-400 to-slate-500' };
    }
  };

  const colors = getColors();

  return (
    <div className={`relative group overflow-hidden bg-gradient-to-br ${colors.bgGradient} rounded-2xl p-7 border-2 ${colors.borderColor} shadow-sm hover:shadow-xl hover:border-opacity-50 transition-all duration-300`}>
      {/* Animated Gradient Accent */}
      <div className={`absolute inset-0 bg-gradient-to-r ${colors.accentColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl pointer-events-none`}></div>

      {/* Decorative Shape */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-white to-transparent opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colors.accentColor} bg-opacity-10 group-hover:bg-opacity-20 transition-colors duration-300`}>
            <div className={`${colors.iconColor}`}>
              {getIcon()}
            </div>
          </div>
          {trend && (
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
              <ArrowTrendingUpIcon className="w-3 h-3" />
              {trend}
            </span>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-gray-950">{typeof value === 'number' ? value.toLocaleString() : value}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;