import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../../services/userService";

const Team = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /*
  LOAD USERS FROM BACKEND
  */
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const res = await fetchUsers();

      const formatted = res.map((user) => ({
        id: user.id,
        name: user.name,
        role: user.role,
        dept: user.department,
        initials: user.name
          ?.split(" ")
          ?.map((n) => n[0])
          ?.join("")
          ?.toUpperCase(),
        shoutouts: user.shoutouts_count || 0,
        reactions: user.reactions_count || 0,
      }));

      setTeamData(formatted);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  /*
  FILTER LOGIC
  */
  const filtered = teamData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase());

    const matchesDept =
      filter === "All" || user.dept === filter;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Team
        </h1>
        <p className="text-slate-500">
          Connect with your colleagues and celebrate their wins
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">

        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl w-full md:w-2/3">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search team members by name or role..."
            className="bg-transparent outline-none text-sm w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
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
      <p className="text-sm text-slate-500">
        Showing {filtered.length} team members
      </p>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-10 text-slate-500">
          Loading team members...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          No team members found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filtered.map((user) => (
            <div
              key={user.id}
              className="
                bg-white rounded-2xl p-6
                border border-slate-200
                shadow-sm hover:shadow-lg
                transition-all duration-300
                text-center hover:-translate-y-1
              "
            >

              {/* AVATAR */}
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center text-lg font-bold shadow">
                {user.initials}
              </div>

              {/* NAME */}
              <h3 className="mt-4 font-semibold text-slate-900">
                {user.name}
              </h3>

              {/* ROLE */}
              <p className="text-sm text-slate-500">
                {user.role}
              </p>

              {/* DEPT */}
              <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-600">
                {user.dept}
              </span>

              <div className="my-4 border-t border-slate-100"></div>

              {/* STATS */}
              <div className="flex justify-around text-sm">

                <div>
                  <p className="font-semibold text-slate-900">
                    🏆 {user.shoutouts}
                  </p>
                  <p className="text-xs text-slate-500">
                    Shout-Outs
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    ❤️ {user.reactions}
                  </p>
                  <p className="text-xs text-slate-500">
                    Reactions
                  </p>
                </div>

              </div>

              {/* BUTTON */}
              <button
                onClick={() => navigate(`/profile/${user.id}`)} // ✅ REAL ID
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
      )}

    </div>
  );
};

export default Team;