import React from 'react';
import { ArrowTrendingUpIcon, ChartBarIcon, HeartIcon, UsersIcon, ExclamationTriangleIcon, UserPlusIcon } from '@heroicons/react/24/outline';

const StatCard = ({ title, value, trend, icon, color, highlight }) => {
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
      case 'user-plus':
        return <UserPlusIcon className="w-8 h-8" />;
      default:
        return <ChartBarIcon className="w-8 h-8" />;
    }
  };

  const getColors = () => {
    // Handle color prop for override
    if (color === 'amber') {
      return { 
        bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10', 
        iconColor: 'text-amber-600 dark:text-amber-400', 
        borderColor: 'border-amber-200 dark:border-amber-800', 
        accentColor: 'from-amber-400 to-orange-500',
        textColor: 'text-amber-600 dark:text-amber-400'
      };
    }
    
    switch (icon) {
      case 'chart':
        return { 
          bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10', 
          iconColor: 'text-blue-600 dark:text-blue-400', 
          borderColor: 'border-blue-200 dark:border-blue-800', 
          accentColor: 'from-blue-400 to-indigo-500',
          textColor: 'text-blue-600 dark:text-blue-400'
        };
      case 'heart':
        return { 
          bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10', 
          iconColor: 'text-amber-600 dark:text-amber-400', 
          borderColor: 'border-amber-200 dark:border-amber-800', 
          accentColor: 'from-amber-400 to-orange-500',
          textColor: 'text-amber-600 dark:text-amber-400'
        };
      case 'users':
        return { 
          bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/10', 
          iconColor: 'text-emerald-600 dark:text-emerald-400', 
          borderColor: 'border-emerald-200 dark:border-emerald-800', 
          accentColor: 'from-emerald-400 to-teal-500',
          textColor: 'text-emerald-600 dark:text-emerald-400'
        };
      case 'alerts':
        return { 
          bgGradient: 'from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/10', 
          iconColor: 'text-rose-600 dark:text-rose-400', 
          borderColor: 'border-rose-200 dark:border-rose-800', 
          accentColor: 'from-rose-400 to-red-500',
          textColor: 'text-rose-600 dark:text-rose-400'
        };
      case 'user-plus':
        return { 
          bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/10', 
          iconColor: 'text-purple-600 dark:text-purple-400', 
          borderColor: 'border-purple-200 dark:border-purple-800', 
          accentColor: 'from-purple-400 to-pink-500',
          textColor: 'text-purple-600 dark:text-purple-400'
        };
      default:
        return { 
          bgGradient: 'from-slate-50 to-slate-50 dark:from-slate-900 dark:to-slate-800', 
          iconColor: 'text-slate-600 dark:text-slate-400', 
          borderColor: 'border-slate-100 dark:border-slate-800', 
          accentColor: 'from-slate-400 to-slate-500',
          textColor: 'text-slate-600 dark:text-slate-400'
        };
    }
  };

  const colors = getColors();

  return (
    <div className={`relative group overflow-hidden bg-gradient-to-br ${colors.bgGradient} rounded-2xl p-6 border-2 ${colors.borderColor} shadow-sm hover:shadow-md transition-all duration-300 ${
      highlight ? 'ring-2 ring-offset-2 ring-yellow-400 dark:ring-offset-slate-950' : ''
    }`}>
      {/* Animated Gradient Accent */}
      <div className={`absolute inset-0 bg-gradient-to-r ${colors.accentColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl pointer-events-none`}></div>

      {/* Decorative Shape */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-white dark:from-slate-700 to-transparent opacity-15 rounded-full blur-xl group-hover:opacity-25 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${colors.accentColor} bg-opacity-10 group-hover:bg-opacity-15 transition-colors duration-300`}>
            <div className={`${colors.iconColor}`}>
              {getIcon()}
            </div>
          </div>
          {highlight && value > 0 && (
            <span className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full text-xs font-bold">
              ⚠️
            </span>
          )}
          {trend && (
            <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs font-bold">
              <ArrowTrendingUpIcon className="w-3 h-3" />
              {trend}
            </span>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-600 dark:text-slate-400 mb-2 uppercase tracking-wide transition-colors">{title}</p>
          <p className={`text-4xl font-black transition-colors ${
            highlight && value > 0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-950 dark:text-white'
          }`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;