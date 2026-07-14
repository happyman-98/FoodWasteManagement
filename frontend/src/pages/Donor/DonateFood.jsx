// src/Pages/MyListings.jsx
import React from 'react';
import { Plus, UploadCloud, Upload } from 'lucide-react';

export default function MyListings() {
  return (
    <div className="animate-fadeIn max-w-4xl">
      
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Donate Food</h2>
        <p className="text-gray-600">List surplus cooked food or packaged items for nearby NGOs to collect.</p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 md:p-8">
        
        {/* Card Title */}
        <div className="flex items-center gap-3 mb-8">
          <Plus size={24} className="text-green-700" />
          <h3 className="text-xl font-bold text-gray-900">New Food Donation</h3>
        </div>

        <form className="space-y-6">
          {/* Image Dropzone */}
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer mb-8">
            <UploadCloud size={32} className="text-[#2d7a38] mb-3" />
            <p className="text-gray-600 mb-1">
              Drop food photo here or <span className="text-[#2d7a38] font-bold">browse</span>
            </p>
            <p className="text-xs font-medium text-gray-400">PNG, JPG up to 10MB</p>
          </div>

          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Food Item Name */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Food Item Name</label>
              <input 
                type="text" 
                placeholder="e.g. Dal Rice, Biryani" 
                className="w-full px-4 py-3.5 rounded-xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400 font-medium"
              />
            </div>
            
            {/* Quantity */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Quantity (portions)</label>
              <input 
                type="text" 
                placeholder="e.g. 20" 
                className="w-full px-4 py-3.5 rounded-xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400 font-medium"
              />
            </div>
            
            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Expiry Date</label>
              <input 
                type="date" 
                className="w-full px-4 py-3.5 rounded-xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500 font-medium"
              />
            </div>
            
            {/* Expiry Time */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Expiry Time</label>
              <input 
                type="time" 
                className="w-full px-4 py-3.5 rounded-xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500 font-medium"
              />
            </div>
          </div>

          {/* Pickup Address */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Pickup Address</label>
            <input 
              type="text" 
              placeholder="Full address for pickup" 
              className="w-full px-4 py-3.5 rounded-xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400 font-medium"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Notes (optional)</label>
            <textarea 
              rows="2"
              placeholder="e.g. Vegetarian, freshly cooked, contains nuts..." 
              className="w-full px-4 py-3.5 rounded-xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400 font-medium resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button 
              type="button" 
              className="w-full py-4 bg-[#2d7a38] hover:bg-green-800 text-white font-bold rounded-xl shadow-sm transition-colors flex justify-center items-center gap-2"
            >
              <Upload size={20} />
              Post Food Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}