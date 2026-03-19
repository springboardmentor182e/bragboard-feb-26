import React from 'react';
import { ArrowTrendingUpIcon } from '@heroicons/react/20/solid';

const StatCard = ({ title, value, trend }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {trend && (
          <span className="text-sm font-medium text-green-600 flex items-center bg-green-50 px-2 py-1 rounded">
            <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;