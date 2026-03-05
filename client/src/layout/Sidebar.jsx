import React from 'react';

import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  MegaphoneIcon,
  FlagIcon,
  DocumentTextIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
const Sidebar = () => {
  return (
    <div className="w-64 bg-[#1a1f36] h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-white text-xl font-bold tracking-wide">BRAGBOARD</h1>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-600 rounded-lg">
            <HomeIcon className="w-5 h-5 mr-3 text-gray-400" />
            Feed
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-blue-600 rounded-lg transition">
            <ChartBarIcon className="w-5 h-5 mr-3 text-gray-500" />
            Leaderboard
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-blue-600 rounded-lg transition">
            <UserGroupIcon className="w-5 h-5 mr-3 text-gray-500" />
            Team
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-blue-600 rounded-lg transition">
            <MegaphoneIcon className="w-5 h-5 mr-3 text-gray-500" />
            Badges
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-blue-600 rounded-lg transition">
            <ChartBarIcon className="w-5 h-5 mr-3 text-gray-500" />
            Analytics
          </a>
        </div>

        {/* Reports Section */}
        <div className="mt-8">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Reports</h3>
          <div className="space-y-1">
            <a href="#" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-blue-600 rounded-lg transition">
              Admin Dashboard
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-blue-600 rounded-lg transition">
              Shout-Outs
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-blue-600 rounded-lg transition">
              Reports
            </a>
          </div>
        </div>
      </nav>

      {/* User Profile - Exactly like screenshot */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-300">AC</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Alex Cooper</p>
            <p className="text-xs text-gray-400">Product Designer · Lv 4</p>
          </div>
          <span className="ml-auto text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;