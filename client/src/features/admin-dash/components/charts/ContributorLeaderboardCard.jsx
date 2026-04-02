import React from 'react';

const ContributorLeaderboardCard = ({ contributor, rank, maxValue }) => {
  // Rank-specific configuration
  const rankConfig = {
    2: {
      medal: '🥈',
      bgGradient: 'from-blue-50 to-cyan-50',
      badgeBg: 'bg-blue-600',
      progressColor: 'bg-blue-400',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
    },
    3: {
      medal: '🥉',
      bgGradient: 'from-emerald-50 to-teal-50',
      badgeBg: 'bg-emerald-600',
      progressColor: 'bg-emerald-400',
      textColor: 'text-emerald-700',
      borderColor: 'border-emerald-200',
    },
    4: {
      medal: '⭐',
      bgGradient: 'from-amber-50 to-orange-50',
      badgeBg: 'bg-amber-600',
      progressColor: 'bg-amber-400',
      textColor: 'text-amber-700',
      borderColor: 'border-amber-200',
    },
    5: {
      medal: '✨',
      bgGradient: 'from-violet-50 to-purple-50',
      badgeBg: 'bg-violet-600',
      progressColor: 'bg-violet-400',
      textColor: 'text-violet-700',
      borderColor: 'border-violet-200',
    },
  };

  const config = rankConfig[rank] || rankConfig[5];
  const progressPercentage = (contributor.value / maxValue) * 100;

  return (
    <div
      className={`bg-gradient-to-br ${config.bgGradient} rounded-2xl p-6 border ${config.borderColor} shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
    >
      {/* Main Content Grid */}
      <div className="flex items-center gap-4 mb-4">
        {/* Rank Badge */}
        <div className={`${config.badgeBg} text-white rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0 font-black text-lg shadow-lg`}>
          #{rank}
        </div>

        {/* Name and Department */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{config.medal}</span>
            <h4 className={`text-lg font-black ${config.textColor} truncate`}>{contributor.fullName}</h4>
          </div>
          {contributor.dept && (
            <p className={`text-sm ${config.textColor} opacity-70 truncate`}>📍 {contributor.dept}</p>
          )}
        </div>

        {/* Contribution Count */}
        <div className="text-right flex-shrink-0">
          <p className={`text-4xl font-black ${config.textColor}`}>{contributor.value}</p>
          <p className={`text-xs font-semibold ${config.textColor} opacity-70`}>contributions</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 bg-white/40 rounded-full overflow-hidden">
          <div
            className={`${config.progressColor} h-full rounded-full transition-all duration-500`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className={`text-xs font-semibold ${config.textColor} mt-2 opacity-70`}>
          {Math.round(progressPercentage)}% of top performer
        </p>
      </div>

      {/* Stats Grid */}
      <div className={`grid grid-cols-3 gap-3 pt-4 border-t ${config.borderColor}`}>
        {/* Sent */}
        <div className="text-center">
          <p className={`text-sm font-bold ${config.textColor} mb-1`}>📤</p>
          <p className={`text-2xl font-black ${config.textColor}`}>{contributor.sent}</p>
          <p className={`text-xs ${config.textColor} opacity-60`}>Sent</p>
        </div>

        {/* Received */}
        <div className="text-center">
          <p className={`text-sm font-bold ${config.textColor} mb-1`}>📥</p>
          <p className={`text-2xl font-black ${config.textColor}`}>{contributor.received}</p>
          <p className={`text-xs ${config.textColor} opacity-60`}>Received</p>
        </div>

        {/* Reactions */}
        <div className="text-center">
          <p className={`text-sm font-bold ${config.textColor} mb-1`}>👏</p>
          <p className={`text-2xl font-black ${config.textColor}`}>{contributor.reactions}</p>
          <p className={`text-xs ${config.textColor} opacity-60`}>Reactions</p>
        </div>
      </div>
    </div>
  );
};

export default ContributorLeaderboardCard;
