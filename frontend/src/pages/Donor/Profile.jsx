// src/Pages/Profile.jsx
import React, { useState } from 'react';
import { Camera, CheckCircle } from 'lucide-react';

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: 'Ananya',
    lastName: 'Krishnan',
    email: 'ananya.krishnan@email.com',
    phone: '+91 98765 43210',
    cityArea: 'Koramangala, Bangalore',
    bio: 'Passionate about reducing food waste and giving reusable items a second life.',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const InputField = ({ label, name, value, type = 'text', placeholder, cols }) => (
    <div className={`flex flex-col gap-2 ${cols}`}>
      <label className="font-medium text-gray-800 text-sm md:text-base">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="px-5 py-3.5 md:py-4 rounded-xl border border-gray-100 bg-[#f4f7f4] focus:outline-none focus:ring-2 focus:ring-[#2f7d32] focus:border-transparent text-gray-900 font-medium placeholder-gray-400"
      />
    </div>
  );

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto space-y-12 mb-10">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-1">My Profile</h2>
        <p className="text-gray-600">Manage your personal details and account settings.</p>
      </div>

      {/* Main Profile Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-10 border border-gray-100">
        
        {/* Avatar and Name/Status */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop"
              alt="Avatar"
              className="w-24 h-24 rounded-2xl object-cover"
            />
            <button className="absolute -bottom-2 -right-2 bg-[#2f7d32] hover:bg-[#25632a] text-white p-2 rounded-full border-4 border-white transition-colors">
              <Camera size={18} />
            </button>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Ananya Krishnan</h3>
            <p className="text-gray-600 text-sm md:text-base">Donor - Bangalore, India</p>
            <div className="flex items-center gap-2 text-[#2f7d32] font-semibold bg-[#e8f5e9] px-3.5 py-1 rounded-full w-fit text-sm">
              <CheckCircle size={16} /> Verified Account
            </div>
          </div>
        </div>

        {/* Form Fields Grid */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-2">
          <InputField label="First Name" name="firstName" value={formData.firstName} />
          <InputField label="Last Name" name="lastName" value={formData.lastName} />
          <InputField label="Email Address" name="email" value={formData.email} type="email" cols="md:col-span-2" />
          <InputField label="Phone Number" name="phone" value={formData.phone} type="tel" cols="md:col-span-2" />
          <InputField label="City / Area" name="cityArea" value={formData.cityArea} cols="md:col-span-2" />
          
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="font-medium text-gray-800 text-sm md:text-base">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
              className="px-5 py-4 rounded-xl border border-gray-100 bg-[#f4f7f4] focus:outline-none focus:ring-2 focus:ring-[#2f7d32] focus:border-transparent text-gray-900 font-medium placeholder-gray-400 resize-none"
            />
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
          <button className="bg-[#2f7d32] hover:bg-[#25632a] text-white px-10 py-3.5 rounded-xl font-semibold transition-colors shadow-sm">
            Save Changes
          </button>
          <button className="bg-[#f0f2f0] hover:bg-[#e0e4e0] text-gray-800 px-10 py-3.5 rounded-xl font-semibold transition-colors">
            Cancel
          </button>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100 space-y-8">
        <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-2">
          <InputField
            label="Current Password"
            name="current"
            type="password"
            placeholder="••••••••"
            cols="md:col-span-2"
          />
          <InputField
            label="New Password"
            name="new"
            type="password"
            placeholder="••••••••"
          />
          <InputField
            label="Confirm Password"
            name="confirm"
            type="password"
            placeholder="••••••••"
          />
        </form>

        <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
          <button className="bg-[#f0f2f0] hover:bg-[#e0e4e0] text-gray-800 px-10 py-3.5 rounded-xl font-semibold transition-colors">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}