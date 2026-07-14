// src/Pages/DonateItems.jsx
import React from 'react';
import { Plus, UploadCloud, Upload } from 'lucide-react';

export default function DonateItems() {
  return (
    <div className="animate-fadeIn max-w-4xl">
      
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Donate Used Items</h2>
        <p className="text-gray-600">Give clothes, furniture, books, or electronics a second life.</p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 md:p-8">
        
        {/* Card Title */}
        <div className="flex items-center gap-3 mb-8">
          <Plus size={24} className="text-[#ea580c]" />
          <h3 className="text-xl font-bold text-gray-900">New Item Donation</h3>
        </div>

        <form className="space-y-6">
          {/* Image Dropzone */}
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer mb-8">
            <UploadCloud size={32} className="text-gray-400 mb-3" />
            <p className="text-gray-600 mb-1">
              Upload item photos or <span className="text-[#ea580c] font-bold">browse</span>
            </p>
          </div>

          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Item Name */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Item Name</label>
              <input 
                type="text" 
                placeholder="e.g. Winter Jacket, Study Table" 
                className="w-full px-4 py-3.5 rounded-xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ea580c] text-gray-900 placeholder-gray-400 font-medium"
              />
            </div>
            
            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Category</label>
              <select className="w-full px-4 py-3.5 rounded-xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ea580c] text-gray-900 font-medium">
                <option>Clothes</option>
                <option>Furniture</option>
                <option>Electronics</option>
                <option>Books</option>
                <option>Toys</option>
              </select>
            </div>
            
            {/* Quantity */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Quantity</label>
              <input 
                type="number" 
                placeholder="1" 
                className="w-full px-4 py-3.5 rounded-xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ea580c] text-gray-900 placeholder-gray-400 font-medium"
              />
            </div>
            
            {/* Condition */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Condition</label>
              <select className="w-full px-4 py-3.5 rounded-xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ea580c] text-gray-900 font-medium">
                <option>Like New</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Needs Repair</option>
              </select>
            </div>
          </div>

          {/* Pickup Address */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Pickup Address</label>
            <input 
              type="text" 
              placeholder="Full address for pickup" 
              className="w-full px-4 py-3.5 rounded-xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ea580c] text-gray-900 placeholder-gray-400 font-medium"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Description</label>
            <textarea 
              rows="2"
              placeholder="Describe the item — size, colour, brand..." 
              className="w-full px-4 py-3.5 rounded-xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ea580c] text-gray-900 placeholder-gray-400 font-medium resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button 
              type="button" 
              className="w-full py-4 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold rounded-xl shadow-sm transition-colors flex justify-center items-center gap-2"
            >
              <Upload size={20} />
              Post Item Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}