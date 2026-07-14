// src/Pages/AdminDashboard.jsx
import React from 'react';
import { 
  Users, Gift, Leaf, Package, Download, 
  ArrowUpRight, Building2, Utensils, CheckCircle, 
  UserPlus, AlertTriangle, ArrowRight 
} from 'lucide-react';

export default function AdminDashboard() {
  
  // Recent Users Data matching the mockup
  const recentUsers = [
    { name: 'Sunita Rao', role: 'Restaurant', joined: 'Jul 7', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop' },
    { name: 'Arvind Patel', role: 'Farmer', joined: 'Jul 6', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop' },
    { name: 'Meena Joshi', role: 'NGO', joined: 'Jul 5', status: 'Active', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop' },
    { name: 'Kiran Kumar', role: 'Donor', joined: 'Jul 4', status: 'Inactive', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop' },
  ];

  // Recent Activity Feed matching the mockup
  const recentActivities = [
    {
      id: 1,
      title: 'New NGO registered',
      detail: 'Helping Hands Trust',
      time: '3 min ago',
      color: 'bg-blue-50 text-blue-600',
      icon: <Building2 size={16} />
    },
    {
      id: 2,
      title: 'Large food donation posted',
      detail: 'Taj Hotel Group',
      time: '12 min ago',
      color: 'bg-green-50 text-green-600',
      icon: <Utensils size={16} />
    },
    {
      id: 3,
      title: 'Pickup confirmed',
      detail: 'Seva NGO ← Spice Garden',
      time: '28 min ago',
      color: 'bg-[#e0f2fe] text-[#0369a1]',
      icon: <CheckCircle size={16} />
    },
    {
      id: 4,
      title: 'New user signed up',
      detail: 'Ramesh Gupta (Donor)',
      time: '45 min ago',
      color: 'bg-purple-50 text-purple-600',
      icon: <UserPlus size={16} />
    },
    {
      id: 5,
      title: 'Donation expired',
      detail: '#D2381 - Veg Biryani',
      time: '1h ago',
      color: 'bg-red-50 text-red-600',
      icon: <AlertTriangle size={16} />
    }
  ];

  // Category statistics matching the mockup values
  const categories = [
    { name: 'Food', value: '45%', color: 'bg-[#1a9f3b]' },
    { name: 'Vegetables', value: '22%', color: 'bg-[#4ade80]' },
    { name: 'Clothes', value: '18%', color: 'bg-[#f97316]' },
    { name: 'Furniture', value: '8%', color: 'bg-[#facc15]' },
    { name: 'Books', value: '5%', color: 'bg-[#3b82f6]' },
    { name: 'Electronics', value: '2%', color: 'bg-[#a855f7]' },
  ];

  // Weekly bar representation (Heights matching mockup visually)
  const barData = [
    { label: 'Mon', value: 35 },
    { label: 'Tue', value: 50 },
    { label: 'Wed', value: 30 },
    { label: 'Thu', value: 65 },
    { label: 'Fri', value: 75 },
    { label: 'Sat', value: 55 },
    { label: 'Sun', value: 40 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1400px] mx-auto pb-12">
      
      {/* --- TOP HEADER BAR --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h2>
          <p className="text-sm font-medium text-gray-400 mt-1">Last updated: July 8, 2026, 4:30 PM IST</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-[#1a9f3b] hover:bg-green-800 text-white font-bold rounded-xl shadow-sm transition-all text-sm">
          <Download size={16} />
          Export Report
        </button>
      </div>

      {/* --- STATS CARD ROW --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit mb-4">
              <Users size={22} />
            </div>
            <h4 className="text-3xl font-extrabold text-gray-900 tracking-tight">85,420</h4>
            <p className="text-sm font-semibold text-gray-400 mt-1">Total Users</p>
          </div>
          <p className="text-xs font-bold text-[#1a9f3b] mt-3">+2,340 this week</p>
        </div>

        {/* Active Donations */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-3 bg-green-50 text-[#1a9f3b] rounded-xl w-fit mb-4">
              <Gift size={22} />
            </div>
            <h4 className="text-3xl font-extrabold text-gray-900 tracking-tight">4,120</h4>
            <p className="text-sm font-semibold text-gray-400 mt-1">Active Donations</p>
          </div>
          <p className="text-xs font-bold text-[#1a9f3b] mt-3">+180 today</p>
        </div>

        {/* Food Saved */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-3 bg-green-50 text-[#1a9f3b] rounded-xl w-fit mb-4">
              <Leaf size={22} />
            </div>
            <h4 className="text-3xl font-extrabold text-gray-900 tracking-tight">48,200</h4>
            <p className="text-sm font-semibold text-gray-400 mt-1">Food Saved (kg)</p>
          </div>
          <p className="text-xs font-bold text-[#1a9f3b] mt-3">+1,200 this week</p>
        </div>

        {/* Items Donated */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl w-fit mb-4">
              <Package size={22} />
            </div>
            <h4 className="text-3xl font-extrabold text-gray-900 tracking-tight">38,290</h4>
            <p className="text-sm font-semibold text-gray-400 mt-1">Items Donated</p>
          </div>
          <p className="text-xs font-bold text-[#1a9f3b] mt-3">+420 this week</p>
        </div>
      </div>

      {/* --- MIDDLE SEGMENT: CHARTS ROW --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Activity Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Weekly Activity</h3>
            {/* Chart Legend */}
            <div className="flex gap-4 text-xs font-semibold text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-blue-500 rounded-sm inline-block"></span>
                <span>New Users</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#1a9f3b] rounded-sm inline-block"></span>
                <span>Donations</span>
              </div>
            </div>
          </div>

          {/* Chart Wrapper */}
          <div className="flex gap-4 items-end h-[240px] relative w-full pt-6">
            {/* Y Axis markings */}
            <div className="flex flex-col justify-between h-[180px] text-[11px] text-gray-400 font-bold w-8 select-none">
              <span>280</span>
              <span>210</span>
              <span>140</span>
              <span>70</span>
              <span>0</span>
            </div>

            {/* Grid Lines & Vertical Bars Container */}
            <div className="flex-1 h-[180px] relative flex justify-around items-end">
              {/* Horizontal Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="w-full border-t border-gray-100"></div>
                <div className="w-full border-t border-gray-100"></div>
                <div className="w-full border-t border-gray-100"></div>
                <div className="w-full border-t border-gray-100"></div>
                <div className="w-full border-t border-gray-100"></div>
              </div>

              {/* Rendered Bars */}
              {barData.map((bar, i) => (
                <div key={i} className="flex flex-col items-center justify-end h-full w-12 z-10 group cursor-pointer">
                  {/* Dynamic Height Green Bar with visual bounce on hover */}
                  <div 
                    style={{ height: `${bar.value}%` }} 
                    className="w-5 bg-[#1a9f3b] rounded-t-sm transition-all duration-500 group-hover:bg-green-700 relative"
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {Math.round(bar.value * 3.73)} units
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-400 mt-3">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* By Category Doughnut Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
          <h3 className="text-lg font-bold text-gray-900 mb-4">By Category</h3>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Pure SVG Doughnut */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
                {/* 45% Segment (Green) */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#1a9f3b" strokeWidth="6" strokeDasharray="45 55" strokeDashoffset="0"></circle>
                {/* 22% Segment (Light Green) */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#4ade80" strokeWidth="6" strokeDasharray="22 78" strokeDashoffset="-45"></circle>
                {/* 18% Segment (Orange) */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f97316" strokeWidth="6" strokeDasharray="18 82" strokeDashoffset="-67"></circle>
                {/* 8% Segment (Yellow) */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#facc15" strokeWidth="6" strokeDasharray="8 92" strokeDashoffset="-85"></circle>
                {/* 5% Segment (Blue) */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#3b82f6" strokeWidth="6" strokeDasharray="5 95" strokeDashoffset="-93"></circle>
                {/* 2% Segment (Purple) */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#a855f7" strokeWidth="6" strokeDasharray="2 98" strokeDashoffset="-98"></circle>
              </svg>
            </div>

            {/* Labels Legend matching exact structure */}
            <div className="flex-1 grid grid-cols-1 gap-2.5 w-full">
              {categories.map((cat, i) => (
                <div key={i} className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`}></span>
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-gray-900 font-bold">{cat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* --- BOTTOM SEGMENT: DATA GRID (USERS & ACTIVITIES) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Users Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Users</h3>
            <button className="text-xs font-bold text-[#1a9f3b] hover:text-green-800 transition-colors">Manage All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="pb-4 px-2">User</th>
                  <th className="pb-4 px-2">Role</th>
                  <th className="pb-4 px-2">Joined</th>
                  <th className="pb-4 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentUsers.map((user, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all">
                    <td className="py-4 px-2 flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-gray-100" />
                      <span className="font-bold text-gray-900">{user.name}</span>
                    </td>
                    <td className="py-4 px-2 text-gray-500 font-semibold">{user.role}</td>
                    <td className="py-4 px-2 text-gray-400 font-medium">{user.joined}</td>
                    <td className="py-4 px-2 text-center">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full inline-block ${
                        user.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
          
          <div className="space-y-5 flex-1 overflow-y-auto max-h-[340px] pr-1">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex gap-4 items-start">
                {/* Circle Icon Container */}
                <div className={`p-2.5 rounded-full shrink-0 ${act.color}`}>
                  {act.icon}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 truncate">{act.title}</h4>
                  <p className="text-xs text-gray-500 font-medium truncate mt-0.5">{act.detail}</p>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}