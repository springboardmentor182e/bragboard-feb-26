import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getLevelProgress, getUserStats } from "../../../services/userStatsService";
import PageContainer from "../../../components/ui/PageContainer";
import { Star, Award, Crown, Zap, Flame, Search } from "lucide-react";

const Badges = () => {
  const { user } = useAuth();
  const [levelProgress, setLevelProgress] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    const fetchBadgeData = async () => {
      try {
        const [progress, stats] = await Promise.all([
          getLevelProgress(user.id),
          getUserStats(user.id),
        ]);
        setLevelProgress(progress);
        setUserStats(stats);
      } catch (error) {
        console.error("Error fetching badge data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBadgeData();
  }, [user?.id]);

  const getIconComponent = (iconName) => {
    const icons = {
      star: Star,
      award: Award,
      crown: Crown,
      zap: Zap,
      flame: Flame,
    };
    return icons[iconName] || Star;
  };

  const getColorGradient = (iconName) => {
    const colorMap = {
      star: "from-yellow-400 to-yellow-500",
      award: "from-blue-400 to-blue-500",
      crown: "from-purple-400 to-purple-500",
      zap: "from-orange-400 to-orange-500",
      flame: "from-red-400 to-red-500",
    };
    return colorMap[iconName] || "from-indigo-400 to-indigo-500";
  };

  const earnedBadges = levelProgress?.badges?.filter((b) => b.unlocked) || [];
  const inProgressBadges = levelProgress?.badges?.filter((b) => !b.unlocked) || [];
  const completionPercentage = levelProgress?.badges
    ? Math.round(
        (earnedBadges.length / levelProgress.badges.length) * 100
      )
    : 0;

  const filteredEarned = earnedBadges.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredInProgress = inProgressBadges.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-slate-500">Loading badges...</div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">My Badges</h1>
        <p className="text-slate-600">Track your achievements and progress</p>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-8 relative">
        <Search className="absolute left-4 top-3 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search badges..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border border-indigo-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-600 text-white rounded-lg p-3">
              <Award size={24} />
            </div>
            <div className="text-3xl font-bold text-indigo-900">
              {levelProgress?.badges?.length || 0}
            </div>
          </div>
          <p className="text-indigo-700 font-semibold text-sm">Total Badges</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-600 text-white rounded-lg p-3">
              <Star size={24} />
            </div>
            <div className="text-3xl font-bold text-green-900">{earnedBadges.length}</div>
          </div>
          <p className="text-green-700 font-semibold text-sm">Earned</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-yellow-600 text-white rounded-lg p-3">
              <Zap size={24} />
            </div>
            <div className="text-3xl font-bold text-yellow-900">
              {inProgressBadges.length}
            </div>
          </div>
          <p className="text-yellow-700 font-semibold text-sm">In Progress</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-600 text-white rounded-lg p-3">
              <Crown size={24} />
            </div>
            <div className="text-3xl font-bold text-purple-900">{completionPercentage}%</div>
          </div>
          <p className="text-purple-700 font-semibold text-sm">Completion</p>
        </div>
      </div>

      {/* EARNED BADGES SECTION */}
      {filteredEarned.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Earned Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEarned.map((badge) => {
              const IconComponent = getIconComponent(badge.icon);
              const colorGradient = getColorGradient(badge.icon);

              return (
                <div
                  key={badge.id}
                  className={`bg-gradient-to-br ${colorGradient} rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center text-center`}
                >
                  <IconComponent size={48} className="mb-4" />
                  <h3 className="text-xl font-bold mb-2">{badge.name}</h3>
                  <p className="text-sm opacity-90 mb-4">{badge.description}</p>
                  <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                    <p className="text-xs font-semibold">
                      {badge.points_required.toLocaleString()} pts
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* IN PROGRESS BADGES SECTION */}
      {filteredInProgress.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">In Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInProgress.map((badge) => {
              const IconComponent = getIconComponent(badge.icon);
              const progressPercent = userStats?.total_points
                ? Math.min(
                    100,
                    (userStats.total_points / badge.points_required) * 100
                  )
                : 0;

              return (
                <div
                  key={badge.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-slate-100 rounded-lg p-4">
                      <IconComponent size={32} className="text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900">{badge.name}</h3>
                      <p className="text-xs text-slate-600 mt-1">{badge.description}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-slate-700">
                        Progress
                      </span>
                      <span className="text-sm font-bold text-indigo-600">
                        {Math.round(progressPercent)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-slate-900">
                      {userStats?.total_points?.toLocaleString() || 0} /{" "}
                      {badge.points_required.toLocaleString()} pts
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {Math.max(0, badge.points_required - (userStats?.total_points || 0)).toLocaleString()} pts to unlock
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {searchTerm && filteredEarned.length === 0 && filteredInProgress.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">
            No badges found matching "{searchTerm}"
          </p>
        </div>
      )}
    </PageContainer>
  );
};

export default Badges;