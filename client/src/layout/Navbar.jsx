import { Search, Bell, Plus, Menu, X, BarChart3, Users, Home, Trophy, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const menuItems = [
  { path: '/', label: 'Feed', icon: Home },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/team', label: 'Teams', icon: Users },
  { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/badges', label: 'Badges', icon: Award },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    axios.get('/api/users/me')
      .then(res => {
        setCurrentUser({
          name: res.data.name || res.data.email || 'User',
          role: res.data.role || 'User',
          avatar: res.data.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${res.data.id}`
        });
      })
      .catch(() => {
        setCurrentUser({ 
          name: 'Guest User', 
          role: 'Guest', 
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest' 
        });
      });
  }, []);

  if (!currentUser) {
    return (
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center">
          <span className="text-gray-500">Loading...</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center gap-4">
        
        {/* Menu Button */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </button>

          {menuOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      isActive ? 'bg-purple-50 text-purple-600 font-medium' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="flex-1 relative max-w-[520px]">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search shoutouts, people, badges..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 bg-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200"
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 ml-auto">
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors cursor-pointer">
            <Plus size={17} strokeWidth={2.5} />
            Create Shout-Out
          </button>

          <button className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <Bell size={22} className="text-gray-700" strokeWidth={1.8} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="relative shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-100"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center text-white text-[8px] font-bold border-2 border-white">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
              <p className="text-xs font-medium text-purple-600">{currentUser.role}</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}