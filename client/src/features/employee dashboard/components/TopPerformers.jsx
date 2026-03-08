import { Trophy, Crown, Medal, TrendingUp } from 'lucide-react';
import DepartmentPill from './DepartmentPill';
import { topPerformers } from '../../../data/mockData';

const RANK_CONFIG = {
  1: { 
    bgGradient: 'from-amber-50 to-yellow-100', 
    borderColor: 'border-amber-300',
    icon: Crown,
    iconBg: 'bg-gradient-to-br from-amber-400 to-yellow-500',
    iconColor: 'text-white',
    rankColor: 'text-amber-600',
    rankBg: 'bg-amber-100',
    trophyColor: 'text-amber-500',
    size: 'text-5xl'
  },
  2: { 
    bgGradient: 'from-gray-50 to-slate-100', 
    borderColor: 'border-gray-300',
    icon: Medal,
    iconBg: 'bg-gradient-to-br from-gray-400 to-slate-500',
    iconColor: 'text-white',
    rankColor: 'text-gray-500',
    rankBg: 'bg-gray-200',
    trophyColor: 'text-gray-400',
    size: 'text-4xl'
  },
  3: { 
    bgGradient: 'from-orange-50 to-amber-100', 
    borderColor: 'border-orange-300',
    icon: Medal,
    iconBg: 'bg-gradient-to-br from-orange-400 to-red-400',
    iconColor: 'text-white',
    rankColor: 'text-orange-600',
    rankBg: 'bg-orange-100',
    trophyColor: 'text-orange-400',
    size: 'text-4xl'
  },
};

function PerformerCard({ performer }) {
  const { rank, name, score, department, badges } = performer;
  const config = RANK_CONFIG[rank];
  const RankIcon = config.icon;

  return (
    <div className={`relative flex flex-col items-center text-center p-6 rounded-2xl border-2 ${config.borderColor} bg-gradient-to-br ${config.bgGradient} transition-transform hover:scale-[1.02] duration-300`}>
      {/* Rank Badge */}
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2`}>
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${config.rankBg} ${config.rankColor}`}>
          <RankIcon size={16} />
          #{rank}
        </span>
      </div>

      {/* Trophy Icon */}
      <div className="relative mb-4 mt-2">
        <div className={`w-20 h-20 rounded-full ${config.iconBg} flex items-center justify-center shadow-lg`}>
          <Trophy size={32} className={`${config.iconColor}`} strokeWidth={1.8} />
        </div>
        {rank === 1 && (
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
            <Crown size={14} className="text-white" />
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-gray-900 mb-2">{name}</h3>
      
      {/* Score */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`font-bold ${config.rankColor} ${config.size}`}>
          {score.toLocaleString()}
        </span>
        <TrendingUp size={16} className="text-green-500" />
      </div>

      {/* Department */}
      <DepartmentPill department={department} />
      
      {/* Badges */}
      <p className="text-sm text-gray-500 mt-3">{badges} badges</p>
    </div>
  );
}

export default function TopPerformers() {
  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Trophy size={20} className="text-amber-600" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">Top Performers</h2>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {topPerformers.map((p) => (
          <PerformerCard key={p.rank} performer={p} />
        ))}
      </div>
    </div>
  );
}
