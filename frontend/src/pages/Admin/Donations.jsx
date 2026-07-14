// src/Pages/Donations.jsx
import React from 'react';

export default function Donations() {
  // Donations Table Data matching the mockup exactly
  const donationsData = [
    {
      id: 1,
      donation: 'Cooked Biryani 40 portions',
      donor: 'Spice Garden',
      category: 'Food',
      posted: 'Jul 8',
      status: 'Active',
      statusColor: 'bg-[#e8f5e9] text-[#1a9f3b]',
    },
    {
      id: 2,
      donation: 'Organic Tomatoes 120 kg',
      donor: 'Green Acres',
      category: 'Vegetables',
      posted: 'Jul 7',
      status: 'Picked Up',
      statusColor: 'bg-blue-50 text-blue-600',
    },
    {
      id: 3,
      donation: "Children's Clothing 45 pcs",
      donor: 'Meena Joshi',
      category: 'Clothes',
      posted: 'Jul 6',
      status: 'Delivered',
      statusColor: 'bg-[#e8f5e9] text-[#1a9f3b]',
    },
    {
      id: 4,
      donation: 'Python Books Set',
      donor: 'Techno College',
      category: 'Books',
      posted: 'Jul 5',
      status: 'Pending',
      statusColor: 'bg-amber-50 text-amber-600',
    },
    {
      id: 5,
      donation: 'Office Chair 1 unit',
      donor: 'Kiran Kumar',
      category: 'Furniture',
      posted: 'Jul 4',
      status: 'Cancelled',
      statusColor: 'bg-red-50 text-red-500',
    },
  ];

  return (
    <div className="animate-fadeIn max-w-[1400px] mx-auto space-y-8">
      
      {/* Header section */}
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900">All Donations</h2>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Monitor all active and completed donations across the platform.
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Donations */}
        <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm py-8 px-6 flex flex-col items-center justify-center text-center">
          <h4 className="text-[32px] leading-none font-extrabold text-[#1a9f3b] mb-2">4,120</h4>
          <p className="text-sm font-semibold text-gray-500">Active</p>
        </div>

        {/* Pending Pickup */}
        <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm py-8 px-6 flex flex-col items-center justify-center text-center">
          <h4 className="text-[32px] leading-none font-extrabold text-[#f59e0b] mb-2">892</h4>
          <p className="text-sm font-semibold text-gray-500">Pending Pickup</p>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm py-8 px-6 flex flex-col items-center justify-center text-center">
          <h4 className="text-[32px] leading-none font-extrabold text-[#3b82f6] mb-2">38,210</h4>
          <p className="text-sm font-semibold text-gray-500">Completed</p>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-white">
                <th className="py-5 px-6">Donation</th>
                <th className="py-5 px-6">Donor</th>
                <th className="py-5 px-6">Category</th>
                <th className="py-5 px-6">Posted</th>
                <th className="py-5 px-6">Status</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-50 text-sm">
              {donationsData.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Donation Detail */}
                  <td className="py-4.5 px-6 font-bold text-gray-900">
                    {item.donation}
                  </td>

                  {/* Donor Name */}
                  <td className="py-4.5 px-6 text-gray-500 font-semibold">
                    {item.donor}
                  </td>

                  {/* Category Badge */}
                  <td className="py-4.5 px-6">
                    <span className="px-3 py-1 text-xs font-bold rounded-full inline-block bg-[#e8f5e9] text-[#1a9f3b]">
                      {item.category}
                    </span>
                  </td>

                  {/* Posted Date */}
                  <td className="py-4.5 px-6 text-gray-400 font-medium">
                    {item.posted}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4.5 px-6">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full inline-block ${item.statusColor}`}>
                      {item.status}
                    </span>
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