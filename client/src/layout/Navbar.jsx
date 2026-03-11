import { Search, Bell, Plus, Menu, X, Users, Home, Trophy, Award, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CreateShoutoutModal from '../features/employee dashboard/components/CreateShoutoutModal';
import { useAnalytics } from '../context/AnalyticsContext';

const currentUser = {
  name: 'Alex Thompson',
  role: 'Admin',
  avatar: 'https://i.pravatar.cc/40?u=alex-thompson-admin',
};

const menuItems = [
  { path: '/', label: 'Feed', icon: Home },
  { path: '/team', label: 'Teams', icon: Users },
  { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/badges', label: 'Badges', icon: Award },
];

export default function Navbar() {
  const { users: teamMembers, badges: badgesList, shoutouts, notifications, markNotificationRead, markAllNotificationsRead } = useAnalytics();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [shoutoutModalOpen, setShoutoutModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ people: [], badges: [], shoutouts: [] });
  const location = useLocation();

  // Count unread notifications
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults({ people: [], badges: [], shoutouts: [] });
      return;
    }

    const lowerQuery = query.toLowerCase();

    const people = teamMembers.filter(m => 
      m.name.toLowerCase().includes(lowerQuery) || 
      m.role.toLowerCase().includes(lowerQuery)
    ).slice(0, 3);

    const badges = badgesList.filter(b => 
      b.name.toLowerCase().includes(lowerQuery)
    ).slice(0, 3);

    const matchedShoutouts = shoutouts.filter(s => 
      s.message.toLowerCase().includes(lowerQuery) ||
      s.recipient.name.toLowerCase().includes(lowerQuery)
    ).slice(0, 3);

    setSearchResults({ people, badges, shoutouts: matchedShoutouts });
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
            </button>

            {menuOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-[60]">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                        isActive ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700 hover:bg-gray-100'
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
          <div className="flex-1 relative max-w-[520px]">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search shoutouts, people, badges..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
            />
            
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 max-h-80 overflow-y-auto z-[60]">
                {searchResults.people.length > 0 && (
                  <div className="px-3 py-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">People</p>
                    {searchResults.people.map(person => (
                      <Link 
                        key={person.id} 
                        to="/team"
                        onClick={() => setSearchQuery('')}
                        className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                      >
                        <img src={person.avatar} alt={person.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{person.name}</p>
                          <p className="text-xs text-gray-500">{person.role}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                
                {searchResults.badges.length > 0 && (
                  <div className="px-3 py-2 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Badges</p>
                    {searchResults.badges.map(badge => (
                      <Link 
                        key={badge.id} 
                        to="/badges"
                        onClick={() => setSearchQuery('')}
                        className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                      >
                        <span className="text-xl">{badge.emoji}</span>
                        <span className="text-sm font-medium text-gray-900">{badge.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
                
                {searchResults.people.length === 0 && searchResults.badges.length === 0 && (
                  <p className="px-4 py-3 text-sm text-gray-500 text-center">No results found</p>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button 
              onClick={() => setShoutoutModalOpen(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors cursor-pointer"
            >
              <Plus size={17} strokeWidth={2.5} />
              <span className="hidden sm:inline">Create Shout-Out</span>
            </button>

            {/* Notifications Button */}
            <div className="relative">
              <button 
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileOpen(false);
                }}
                className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
              >
                <Bell size={22} className="text-gray-700" strokeWidth={1.8} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-[60]">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => markAllNotificationsRead()}
                        className="text-xs font-medium text-primary hover:text-primary-dark cursor-pointer transition-colors"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications && notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                            !notif.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => {
                            if (!notif.read) {
                              markNotificationRead(notif.id);
                            }
                          }}
                        >
                          <div className="flex items-start gap-3">
                            {!notif.read && (
                              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                            )}
                            <p className="text-sm text-gray-700">{notif.text}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-gray-500 text-sm">
                        No notifications yet
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <div
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-2.5 cursor-pointer ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <div className="relative shrink-0">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary-light"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-white text-[8px] font-bold border-2 border-white">
                    A
                  </span>
                </div>
                <div className="leading-tight hidden md:block">
                  <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                  <p className="text-xs font-medium text-primary">{currentUser.role}</p>
                </div>
              </div>

              {/* Profile Menu Dropdown */}
              {profileOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-[60]">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-900">{currentUser.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{currentUser.role}</p>
                  </div>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                    <Settings size={16} />
                    Settings & Privacy
                  </button>
                  <button 
                    onClick={() => alert('Logout functionality coming soon!')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div> {/* Closes main centered container */}
      </nav>

      <CreateShoutoutModal 
        isOpen={shoutoutModalOpen} 
        onClose={() => setShoutoutModalOpen(false)} 
      />
    </>
  );
}