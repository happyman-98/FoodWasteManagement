// src/Pages/Dashboard.jsx
import React from 'react';
import { 
  Utensils, Package, Search, Truck, 
  Gift, Heart, Leaf, CheckCircle2, Bell 
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 1. Welcome Banner */}
      <div className="bg-[#1a9f3b] rounded-2xl p-6 md:p-8 flex justify-between items-center text-white shadow-sm">
        <div>
          <p className="text-green-100 mb-1">Welcome back,</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
            Ananya Krishnan <span className="text-2xl">👋</span>
          </h2>
          <p className="text-green-50 font-medium">You've donated 18 times this month — amazing work!</p>
        </div>
        <div className="hidden sm:block">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya&style=circle&backgroundColor=c0aede" 
            alt="Profile" 
            className="w-20 h-20 rounded-full border-4 border-white/20 bg-purple-200"
          />
        </div>
      </div>

      {/* 2. Quick Actions */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors border border-green-100 text-green-700 font-semibold gap-3">
            <Utensils size={28} />
            Donate Food
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-colors border border-orange-100 text-orange-600 font-semibold gap-3">
            <Package size={28} />
            Donate Items
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors border border-blue-100 text-blue-600 font-semibold gap-3">
            <Search size={28} />
            Find Donations
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-colors border border-purple-100 text-purple-600 font-semibold gap-3">
            <Truck size={28} />
            Track Orders
          </button>
        </div>
      </div>

      {/* 3. Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <Gift size={20} className="text-green-600" />
            <span className="text-xs font-medium text-gray-400">+12 this month</span>
          </div>
          <h4 className="text-3xl font-bold text-gray-900 mb-1">82</h4>
          <p className="text-sm text-gray-500 font-medium">Total Donations</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <Package size={20} className="text-green-600" />
            <span className="text-xs font-medium text-gray-400">+5 this month</span>
          </div>
          <h4 className="text-3xl font-bold text-gray-900 mb-1">34</h4>
          <p className="text-sm text-gray-500 font-medium">Items Shared</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <Heart size={20} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-400">estimated impact</span>
          </div>
          <h4 className="text-3xl font-bold text-gray-900 mb-1">210</h4>
          <p className="text-sm text-gray-500 font-medium">Families Helped</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <Leaf size={20} className="text-green-600" />
            <span className="text-xs font-medium text-gray-400">lifetime</span>
          </div>
          <h4 className="text-3xl font-bold text-gray-900 mb-1">128</h4>
          <p className="text-sm text-gray-500 font-medium">CO₂ Saved (kg)</p>
        </div>
      </div>

      {/* 4. Bottom Section: Recent Donations & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Donations Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Donations</h3>
            <button className="text-sm font-semibold text-green-700 hover:text-green-800">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 tracking-wider">
                  <th className="pb-3 px-2">ID</th>
                  <th className="pb-3 px-2">DONATION</th>
                  <th className="pb-3 px-2">DATE</th>
                  <th className="pb-3 px-2">STATUS</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-2 text-gray-500 font-medium">#D2401</td>
                  <td className="py-4 px-2 font-semibold text-gray-900">Cooked Biryani - 40 portions</td>
                  <td className="py-4 px-2 text-gray-500">Jul 6, 2026</td>
                  <td className="py-4 px-2">
                    <span className="px-2.5 py-1 bg-green-50 text-green-700 font-semibold text-xs rounded-full">Delivered</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-2 text-gray-500 font-medium">#D2398</td>
                  <td className="py-4 px-2 font-semibold text-gray-900">Winter Jackets - 12 pcs</td>
                  <td className="py-4 px-2 text-gray-500">Jul 4, 2026</td>
                  <td className="py-4 px-2">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-semibold text-xs rounded-full">Picked Up</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-4 px-2 text-gray-500 font-medium">#D2389</td>
                  <td className="py-4 px-2 font-semibold text-gray-900">Organic Spinach - 15 kg</td>
                  <td className="py-4 px-2 text-gray-500">Jun 30, 2026</td>
                  <td className="py-4 px-2">
                    <span className="px-2.5 py-1 bg-green-50 text-green-700 font-semibold text-xs rounded-full">Delivered</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
            <span className="px-2.5 py-1 bg-[#1a9f3b] text-white text-xs font-bold rounded-full">3 new</span>
          </div>
          
          <div className="space-y-5">
            <div className="flex gap-4 items-start pb-5 border-b border-gray-50">
              <div className="mt-0.5">
                <CheckCircle2 size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 leading-snug mb-1">Your food donation was picked up by Seva NGO.</p>
                <p className="text-xs text-gray-400">2h ago</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start pb-5 border-b border-gray-50">
              <div className="mt-0.5">
                <Bell size={20} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 leading-snug mb-1">New donation request for your vegetable listing.</p>
                <p className="text-xs text-gray-400">5h ago</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="mt-0.5">
                <Heart size={20} className="text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 leading-snug mb-1">You helped 12 families this week!</p>
                <p className="text-xs text-gray-400">1d ago</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}