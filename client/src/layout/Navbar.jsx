import React from 'react';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  return (
<nav className="bg-white border-b border-gray-200 h-16 flex items-center px-8 w-100">      <div className="w-full flex items-center justify-between">
        {/* Left side - Search and Button */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative w-[500px]">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search shout-outs, people, badges..."
              className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Create Button */}
          <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg">
            <PlusIcon className="w-4 h-4" />
            Create Shout-Out
          </button>
        </div>
        
        {/* Right side - Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Alex Cooper</p>
            <p className="text-xs text-gray-500">Product Designer · Lv 4 · Admin</p>
          </div>
          <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">AC</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;