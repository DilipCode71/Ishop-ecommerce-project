import React from 'react';
import { FaBars, FaSearch, FaBell, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function AdminHeader() {

  const admin=useSelector((state)=> state.admin.data)

  return (
    <header className="bg-[#1e1e2d]/95 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <FaBars className="h-6 w-6 text-gray-300" />
          </button>

          {/* Search for mobile */}
          <div className="md:hidden">
            <button 
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <FaSearch className="h-5 w-5 text-gray-300" />
            </button>
          </div>

          {/* Search for desktop */}
          <div className="hidden md:block relative group">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-gray-700/50 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-72 transition-all duration-200"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-300 transition-colors duration-200" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group">
            <FaBell className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-200" />
            <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center pulse-hover">
              3
            </span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="font-medium text-gray-200">{admin?.name || 'Loading...'}</span>
              <span className="text-sm text-gray-400">Administrator</span>
            </div>
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg pulse-hover">
              <FaUser className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-gray-700/50 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;