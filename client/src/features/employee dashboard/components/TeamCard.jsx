import { Heart, ThumbsUp, Star, Eye } from 'lucide-react';
import DepartmentPill from './DepartmentPill';

function StatBox({ icon: Icon, label, value, iconClass }) {
  return (
    <div className="flex-1 rounded-xl p-3" style={{ backgroundColor: '#FFFBEB' }}>
      <div className="flex items-center gap-1.5 mb-2">
        <Icon size={13} className={iconClass} />
        <span className="text-xs text-gray-500 leading-tight">{label}</span>
      </div>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export default function TeamCard({ member }) {
  const { name, role, department, avatar, shoutOuts, claps, stars } = member;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={name}
          className="w-16 h-16 rounded-full object-cover shrink-0 border-2 border-primary-light"
        />
        <div>
          <h3 className="font-bold text-gray-900 text-base leading-snug">{name}</h3>
          <p className="text-sm text-gray-500 mt-0.5 mb-2">{role}</p>
          <DepartmentPill department={department} />
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-2">
        <StatBox icon={Heart}    label="Shout-Outs" value={shoutOuts} iconClass="text-primary" />
        <StatBox icon={ThumbsUp} label="Claps"      value={claps}     iconClass="text-amber-500" />
        <StatBox icon={Star}     label="Stars"      value={stars}     iconClass="text-amber-400" />
      </div>

      {/* View Profile Button */}
      <button
        className="w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 text-sm cursor-pointer hover:opacity-90 transition-opacity"
        style={{ background: 'linear-gradient(to right, #6D28D9, #7C3AED)' }}
      >
        <Eye size={17} />
        View Profile
      </button>
    </div>
  );
}
