// src/pages/Dashboard.jsx
import React from 'react';
import { MOCK_COMMUNITY_ITEMS } from '../Data/mockdata';

export default function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Community Feed</h2>
          <p className="text-gray-600">See what others around you are sharing today.</p>
        </div>
      </div>

      {/* Community Feed Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_COMMUNITY_ITEMS.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  item.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {item.status}
                </span>
                <span className="text-sm text-gray-500">{item.distance}</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-1">{item.item}</h4>
              <p className="text-sm text-gray-600 mb-4">Shared by: {item.user}</p>
            </div>
            
            <button 
              disabled={item.status === 'Claimed'}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                item.status === 'Available' 
                  ? 'bg-[#174624] text-white hover:bg-green-800' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {item.status === 'Available' ? 'Request Item' : 'Unavailable'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}