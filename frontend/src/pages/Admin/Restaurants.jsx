// src/Pages/Restaurants.jsx
import React from 'react';

export default function Restaurants() {
  return (
    <div className="animate-fadeIn max-w-[1400px] mx-auto space-y-6">
      
      {/* Header section */}
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900">Restaurants</h2>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Manage all registered restaurants on the platform.
        </p>
      </div>

      {/* Main Empty State / Action Card */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm flex flex-col items-center justify-center py-24 px-6">
        
        {/* Custom Building Icon to match exact Figma design */}
        <div className="mb-6">
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#9bbd9c" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* Center Building */}
            <rect x="8" y="2" width="8" height="20" rx="2" />
            {/* Left Building */}
            <rect x="3" y="10" width="5" height="12" rx="1" />
            {/* Right Building */}
            <rect x="16" y="10" width="5" height="12" rx="1" />
            {/* Center Windows */}
            <line x1="10" y1="6" x2="14" y2="6" />
            <line x1="10" y1="10" x2="14" y2="10" />
            <line x1="10" y1="14" x2="14" y2="14" />
            <line x1="10" y1="18" x2="14" y2="18" />
          </svg>
        </div>

        {/* Text */}
        <p className="text-[#4b5563] font-medium mb-6 text-base">
          Showing all verified restaurants — 142 total
        </p>

        {/* Action Button */}
        <button className="bg-[#1a9f3b] hover:bg-green-800 text-white font-bold py-3.5 px-8 rounded-full shadow-sm transition-colors duration-200">
          Load Restaurants List
        </button>

      </div>
    </div>
  );
}