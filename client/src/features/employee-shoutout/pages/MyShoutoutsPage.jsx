import MyShoutouts from "../components/MyShoutouts";
import StatsCard from "../../admin-shoutout-management/components/StatsCard";
import { User, Send, Award } from "lucide-react";

const MyShoutoutsPage = () => {
  // Mock user stats - will be connected to backend later
  const stats = {
    received: 8,
    given: 5,
    badges: 3
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Personalized Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-purple-100 shadow-sm">
          <div>
            <h1 className="text-4xl font-extrabold text-purple-900 tracking-tight">
              My Shoutouts
            </h1>
            <p className="text-purple-700/70 mt-2 text-lg">
              Track your impact and the appreciation you've received.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-purple-50 flex items-center gap-4 min-w-[140px]">
              <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                <Award size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Received</p>
                <p className="text-2xl font-bold text-purple-900">{stats.received}</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-purple-50 flex items-center gap-4 min-w-[140px]">
              <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
                <Send size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Given</p>
                <p className="text-2xl font-bold text-purple-900">{stats.given}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs and List Section */}
        <section>
          <MyShoutouts />
        </section>
      </div>
    </div>
  );
};

export default MyShoutoutsPage;
