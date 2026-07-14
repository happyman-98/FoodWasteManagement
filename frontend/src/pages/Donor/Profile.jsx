// src/pages/Profile.jsx
import React from 'react';
import { Edit2, CheckCircle2 } from 'lucide-react';

export default function Profile() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h2>
      <p className="text-gray-600 mb-8">Manage your personal details and account settings.</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl">
        <div className="h-32 bg-linear-to-r from-green-700 to-emerald-800 relative"></div>

        <div className="px-6 pb-6 relative flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-16 mb-6">
          <div className="relative">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya" 
              alt="Profile Avatar" 
              className="w-32 h-32 rounded-2xl bg-white p-1 shadow-md border-4 border-white object-cover"
            />
            <button className="absolute bottom-2 right-2 p-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition-colors">
              <Edit2 size={16} />
            </button>
          </div>

          <div className="flex-1 pt-16 sm:pt-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Ananya Krishnan</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-2">
              <span className="font-medium text-green-700">Donor</span>
              <span>•</span>
              <span>Bangalore, India</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-100">
              <CheckCircle2 size={14} /> Verified Account
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
              <input type="text" defaultValue="Ananya" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
              <input type="text" defaultValue="Krishnan" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input type="email" defaultValue="ananya.krishnan@email.com" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">City / Area</label>
            <input type="text" defaultValue="Koramangala, Bangalore" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50" />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
            <textarea rows="4" defaultValue="Passionate about reducing food waste and giving reusable items a second life." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 resize-none"></textarea>
          </div>

          <div className="flex justify-end gap-4 border-t border-gray-100 pt-6">
            <button className="px-5 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
            <button className="px-5 py-2.5 bg-[#174624] hover:bg-green-800 text-white font-semibold rounded-xl shadow-sm transition-colors">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}