import { Routes, Route } from "react-router-dom";
import ShoutoutManagementPage from "./features/admin-shoutout-management/pages/ShoutoutManagementPage";
import MyShoutoutsPage from "./features/employee-shoutout/pages/MyShoutoutsPage";
import ShoutoutFeedPage from "./features/employee-shoutout/pages/ShoutoutFeedPage";

function App() {
  const [users, setUsers] = useState([]);
  const [top, setTop] = useState([]);
  const [stats, setStats] = useState({});

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!BASE_URL) {
      console.error("BASE_URL missing! Check .env file");
      return;
    }

    const fetchJSON = async (url, setter) => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setter(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchJSON(`${BASE_URL}/leaderboard/full`, setUsers);
    fetchJSON(`${BASE_URL}/leaderboard/top`, setTop);
    fetchJSON(`${BASE_URL}/leaderboard/stats`, setStats);
  }, [BASE_URL]);

  const deptColor = (dept) => {
    if (dept === "Engineering") return "bg-blue-100 text-blue-600";
    if (dept === "Marketing") return "bg-yellow-100 text-yellow-700";
    if (dept === "HR") return "bg-pink-100 text-pink-600";
    if (dept === "Design") return "bg-purple-100 text-purple-600";
    if (dept === "Sales") return "bg-green-100 text-green-600";
    return "bg-gray-100 text-gray-600";
  };

  const medalBg = [
    "bg-yellow-100 border border-yellow-400",
    "bg-gray-200",
    "bg-orange-100"
  ];
  const medalEmoji = ["🥇", "🥈", "🥉"];

  return (
    <Routes>
      {/* Main Page */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-purple-950 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-purple-400">
              Dashboard Home 🚀
            </h1>
          </div>
        }
      />

      {/* Shoutout Page */}
      <Route
        path="/admin/shoutouts"
        element={<ShoutoutManagementPage />}
      />

      {/* Employee My Shoutouts Page */}
      <Route path="/my-shoutouts" element={<MyShoutoutsPage />} />

      {/* Main Shoutout Feed */}
      <Route path="/shoutouts" element={<ShoutoutFeedPage />} />
    </Routes>
  );
}

export default App;