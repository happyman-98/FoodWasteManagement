// src/Pages/MyDonations.jsx
import React from 'react';
import { Search, Eye, Trash2 } from 'lucide-react';

export default function MyDonations() {
  const donations = [
    { id: '#D2401', name: 'Cooked Biryani - 40 portions', date: 'Jul 6, 2026', type: 'Food', status: 'Delivered', statusColor: 'bg-green-50 text-green-700' },
    { id: '#D2398', name: 'Winter Jackets - 12 pcs', date: 'Jul 4, 2026', type: 'Clothes', status: 'Picked Up', statusColor: 'bg-blue-50 text-blue-700' },
    { id: '#D2389', name: 'Organic Spinach - 15 kg', date: 'Jun 30, 2026', type: 'Vegetables', status: 'Delivered', statusColor: 'bg-green-50 text-green-700' },
    { id: '#D2371', name: 'Engineering Books - 8 pcs', date: 'Jun 25, 2026', type: 'Books', status: 'Pending', statusColor: 'bg-yellow-50 text-yellow-700' },
    { id: '#D2360', name: 'Office Chair - 1 unit', date: 'Jun 20, 2026', type: 'Furniture', status: 'Cancelled', statusColor: 'bg-red-50 text-red-600' },
  ];

  return (
    <div className="animate-fadeIn max-w-6xl">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Donations</h2>
          <p className="text-gray-600">Track the status of all your past and active donations.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-[#2d7a38] hover:bg-green-800 text-white text-sm font-bold rounded-full shadow-sm transition-colors">
            + Donate Food
          </button>
          <button className="px-5 py-2.5 bg-[#ea580c] hover:bg-orange-700 text-white text-sm font-bold rounded-full shadow-sm transition-colors">
            + Donate Item
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <h4 className="text-3xl font-bold text-gray-900 mb-1">82</h4>
          <p className="text-sm font-medium text-gray-500">All Time</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <h4 className="text-3xl font-bold text-green-700 mb-1">18</h4>
          <p className="text-sm font-medium text-gray-500">This Month</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <h4 className="text-3xl font-bold text-orange-500 mb-1">3</h4>
          <p className="text-sm font-medium text-gray-500">Pending</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <h4 className="text-3xl font-bold text-green-700 mb-1">67</h4>
          <p className="text-sm font-medium text-gray-500">Delivered</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 md:p-8">
        
        {/* Table Header & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h3 className="text-lg font-bold text-gray-900">All Donations</h3>
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400 font-medium"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="pb-4 px-4">ID</th>
                <th className="pb-4 px-4">DONATION</th>
                <th className="pb-4 px-4">DATE</th>
                <th className="pb-4 px-4">TYPE</th>
                <th className="pb-4 px-4">STATUS</th>
                <th className="pb-4 px-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {donations.map((item, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-4 text-gray-500 font-medium">{item.id}</td>
                  <td className="py-5 px-4 font-bold text-gray-900">{item.name}</td>
                  <td className="py-5 px-4 text-gray-500">{item.date}</td>
                  <td className="py-5 px-4">
                    <span className="text-green-700 font-semibold">{item.type}</span>
                  </td>
                  <td className="py-5 px-4">
                    <span className={`px-3 py-1 font-bold text-xs rounded-full ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex justify-center items-center gap-3">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="text-red-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}