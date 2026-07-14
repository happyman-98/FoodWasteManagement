// src/Pages/Users.jsx
import React, { useState } from 'react';
import { Search, Eye, Pencil, Trash2 } from 'lucide-react';

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('');

  const usersData = [
    {
      id: 1,
      name: 'Sunita Rao',
      role: 'Restaurant',
      joined: 'Jul 7',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'Arvind Patel',
      role: 'Farmer',
      joined: 'Jul 6',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'Meena Joshi',
      role: 'NGO',
      joined: 'Jul 5',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    },
    {
      id: 4,
      name: 'Kiran Kumar',
      role: 'Donor',
      joined: 'Jul 4',
      status: 'Inactive',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    },
    {
      id: 5,
      name: 'Priya Sharma',
      role: 'Donor',
      joined: 'Jul 3',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    },
    {
      id: 6,
      name: 'Suresh Nair',
      role: 'Restaurant',
      joined: 'Jul 2',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=150&auto=format&fit=crop',
    },
  ];

  // Filters user list based on search query
  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fadeIn max-w-[1400px] mx-auto space-y-6">
      
      {/* Header section with search bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">Users</h2>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Manage all registered platform users.
          </p>
        </div>

        {/* Search input matched to Figma's exact style */}
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-5 py-2.5 rounded-full border border-gray-100 bg-[#f4f7f4] text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#1a9f3b]/30 focus:border-[#1a9f3b] transition-all placeholder-gray-400"
          />
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-white">
                <th className="py-4.5 px-6">User</th>
                <th className="py-4.5 px-6">Role</th>
                <th className="py-4.5 px-6">Joined</th>
                <th className="py-4.5 px-6">Status</th>
                <th className="py-4.5 px-6 text-right pr-12">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-50 text-sm">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    {/* User Profile */}
                    <td className="py-4 px-6 flex items-center gap-3.5">
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-9 h-9 rounded-full object-cover border border-gray-100" 
                      />
                      <span className="font-bold text-gray-900">{user.name}</span>
                    </td>

                    {/* User Role */}
                    <td className="py-4 px-6 text-gray-500 font-semibold">
                      {user.role}
                    </td>

                    {/* Joined Date */}
                    <td className="py-4 px-6 text-gray-400 font-medium">
                      {user.joined}
                    </td>

                    {/* Status badge matching the design's specific colors */}
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full inline-block ${
                        user.status === 'Active' 
                          ? 'bg-[#e8f5e9] text-[#1a9f3b]' 
                          : 'bg-[#f1f1f5] text-gray-500'
                      }`}>
                        {user.status}
                      </span>
                    </td>

                    {/* Actions buttons */}
                    <td className="py-4 px-6 text-right pr-12">
                      <div className="flex items-center justify-end gap-3.5">
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-blue-600 transition-colors">
                          <Pencil size={18} />
                        </button>
                        <button className="text-red-300 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-400 font-medium">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}