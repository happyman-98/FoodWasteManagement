// src/Pages/Settings.jsx
import React from 'react';

export default function Settings() {
  return (
    <div className="animate-fadeIn max-w-[1400px] mx-auto space-y-6">
      
      {/* Header section */}
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900">Platform Settings</h2>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Configure global platform settings and policies.
        </p>
      </div>

      {/* Main Settings Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
        <form className="flex flex-col gap-8">
          
          {/* Input Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Platform Name Field */}
            <div className="flex flex-col gap-2.5">
              <label className="font-bold text-gray-900 text-sm">
                Platform Name
              </label>
              <input
                type="text"
                defaultValue="ShareCycle"
                className="px-5 py-3.5 rounded-xl border border-gray-100 bg-[#f4f7f4] focus:outline-none focus:ring-2 focus:ring-[#1a9f3b]/30 focus:border-[#1a9f3b] text-gray-900 font-medium transition-all"
              />
            </div>

            {/* Support Email Field */}
            <div className="flex flex-col gap-2.5">
              <label className="font-bold text-gray-900 text-sm">
                Support Email
              </label>
              <input
                type="email"
                defaultValue="support@sharecycle.org"
                className="px-5 py-3.5 rounded-xl border border-gray-100 bg-[#f4f7f4] focus:outline-none focus:ring-2 focus:ring-[#1a9f3b]/30 focus:border-[#1a9f3b] text-gray-900 font-medium transition-all"
              />
            </div>
            
          </div>

          {/* Action Button */}
          <div>
            <button 
              type="button" 
              className="bg-[#2a7a38] hover:bg-[#1f5c29] text-white px-8 py-3 rounded-full font-bold transition-colors shadow-sm text-sm"
            >
              Save Settings
            </button>
          </div>
          
        </form>
      </div>

    </div>
  );
}