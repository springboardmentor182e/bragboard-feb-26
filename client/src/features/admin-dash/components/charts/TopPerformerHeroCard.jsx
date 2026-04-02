import React from 'react';

const TopPerformerHeroCard = ({ contributor, index }) => {
  return (
    <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl mb-8 transform transition-transform duration-300 hover:scale-102 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mt-20 -mr-20"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Trophy and Title Section */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 animate-bounce">🏆</div>
          <p className="text-sm font-semibold text-white/80 mb-3">TOP CONTRIBUTOR</p>
          <h3 className="text-5xl font-black mb-4 leading-tight">{contributor.fullName}</h3>
          <div className="flex items-baseline justify-center gap-2">
            <p className="text-6xl font-black">{contributor.value}</p>
            <p className="text-xl text-white/80 font-semibold">contributions</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/20">
          {/* Sent */}
          <div className="text-center transform transition-transform hover:scale-105">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:border-white/40 transition">
              <div className="text-3xl mb-2">📤</div>
              <p className="text-white/70 text-xs font-semibold mb-2">SENT</p>
              <p className="text-3xl font-black">{contributor.sent}</p>
            </div>
          </div>

          {/* Received */}
          <div className="text-center transform transition-transform hover:scale-105">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:border-white/40 transition">
              <div className="text-3xl mb-2">📥</div>
              <p className="text-white/70 text-xs font-semibold mb-2">RECEIVED</p>
              <p className="text-3xl font-black">{contributor.received}</p>
            </div>
          </div>

          {/* Reactions */}
          <div className="text-center transform transition-transform hover:scale-105">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:border-white/40 transition">
              <div className="text-3xl mb-2">👏</div>
              <p className="text-white/70 text-xs font-semibold mb-2">REACTIONS</p>
              <p className="text-3xl font-black">{contributor.reactions}</p>
            </div>
          </div>
        </div>

        {/* Department Badge */}
        {contributor.dept && (
          <div className="mt-6 text-center">
            <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 text-sm font-semibold">
              📍 {contributor.dept}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopPerformerHeroCard;
