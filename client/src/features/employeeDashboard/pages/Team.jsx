import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { getAllUsers } from "../../../services/shoutoutService";
import { getUserStats } from "../../../services/userStatsService";
import TeamMemberProfileModal from "../components/TeamMemberProfileModal";

const Team = () => {
  const navigate = useNavigate();
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch team data on component mount
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all users
        const users = await getAllUsers();

        // Fetch stats for each user
        const usersWithStats = await Promise.all(
          users.map(async (user) => {
            try {
              const stats = await getUserStats(user.id);
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role || "Team Member",
                dept: user.department || "General",
                initials:
                  user.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase() || "?",
                shoutouts: stats?.shoutouts_received || 0,
                reactions: stats?.reactions_received || 0,
              };
            } catch (err) {
              console.error(`Error fetching stats for user ${user.id}:`, err);
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role || "Team Member",
                dept: user.department || "General",
                initials:
                  user.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase() || "?",
                shoutouts: 0,
                reactions: 0,
              };
            }
          })
        );

        setTeamData(usersWithStats);
      } catch (err) {
        console.error("Error fetching team data:", err);
        setError("Failed to load team data");
        setTeamData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const filtered = teamData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase());

    const matchesDept =
      filter === "All" || user.dept === filter;

    return matchesSearch && matchesDept;
  });

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Team</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Connect with your colleagues and celebrate their wins
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400">Loading team data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Team</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Connect with your colleagues and celebrate their wins
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Team
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Connect with your colleagues and celebrate their wins
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between transition-colors">

        {/* SEARCH */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl w-full md:w-2/3">
          <Search size={18} className="text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search team members by name or role..."
            className="bg-transparent outline-none text-sm w-full dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FILTER */}
        <select
          className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Product">Product</option>
        </select>

      </div>

      {/* COUNT */}
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Showing {filtered.length} team members
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filtered.map((user, index) => (
          <div
            key={index}
            className="
              bg-white dark:bg-slate-900 rounded-2xl p-6
              border border-slate-200 dark:border-slate-800
              shadow-sm hover:shadow-md dark:hover:shadow-slate-950/50
              transition-all duration-300
              text-center
            "
          >

            {/* AVATAR */}
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center text-lg font-bold shadow">
              {user.initials}
            </div>

            {/* NAME */}
            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
              {user.name}
            </h3>

            {/* ROLE */}
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {user.role}
            </p>

            {/* DEPT */}
            <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              {user.dept}
            </span>

            {/* DIVIDER */}
            <div className="my-4 border-t border-slate-100 dark:border-slate-800"></div>

            {/* STATS */}
            <div className="flex justify-around text-sm">

              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  🏆 {user.shoutouts}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Shout-Outs
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  ❤️ {user.reactions}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Reactions
                </p>
              </div>

            </div>

            {/* BUTTON */}
            <button
              onClick={() => {
                setSelectedUser({ id: user.id, name: user.name });
                setIsModalOpen(true);
              }}
              className="
                mt-5 w-full
                bg-gradient-to-r from-indigo-500 to-purple-600
                text-white py-2.5 rounded-xl text-sm font-medium
                hover:scale-[1.02]
                transition-all duration-300
                shadow hover:shadow-md
              "
            >
              View Profile
            </button>

          </div>
        ))}

      </div>

      {/* TEAM MEMBER PROFILE MODAL */}
      {selectedUser && (
        <TeamMemberProfileModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          userId={selectedUser.id}
          userName={selectedUser.name}
        />
      )}

    </div>
  );
};

export default Team;