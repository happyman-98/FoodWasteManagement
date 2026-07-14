// src/Pages/Notifications.jsx
import React from 'react';
import { CheckCircle2, Bell, Heart, AlertCircle, User } from 'lucide-react';

export default function Notifications() {
  const notificationData = [
    {
      id: 1,
      icon: <CheckCircle2 size={20} />,
      iconBg: 'bg-green-50 text-green-600',
      text: "Your food donation 'Biryani & Curry' was picked up by Seva NGO.",
      time: "2 hours ago",
      isUnread: true,
    },
    {
      id: 2,
      icon: <Bell size={20} />,
      iconBg: 'bg-blue-50 text-blue-500',
      text: "New pickup request from Helping Hands Trust for your vegetable listing.",
      time: "5 hours ago",
      isUnread: true,
    },
    {
      id: 3,
      icon: <Heart size={20} />,
      iconBg: 'bg-orange-50 text-orange-500',
      text: "You helped 12 families this week. Your donations made a real difference!",
      time: "1 day ago",
      isUnread: true,
    },
    {
      id: 4,
      icon: <AlertCircle size={20} />,
      iconBg: 'bg-yellow-50 text-yellow-500',
      text: "Donation #D2371 (Engineering Books) expires in 24 hours. Consider extending or closing it.",
      time: "2 days ago",
      isUnread: false,
    },
    {
      id: 5,
      icon: <CheckCircle2 size={20} />,
      iconBg: 'bg-green-50 text-green-600',
      text: "Your item donation 'Winter Jackets' was successfully delivered to Bal Bhavan NGO.",
      time: "3 days ago",
      isUnread: false,
    },
    {
      id: 6,
      icon: <User size={20} />,
      iconBg: 'bg-purple-50 text-purple-500',
      text: "Kavitha Reddy (NGO) saved your listing 'Organic Spinach 15kg'.",
      time: "4 days ago",
      isUnread: false,
    },
  ];

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto">
      
      {/* Header Section */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Notifications</h2>
          <p className="text-sm text-gray-500 font-medium">
            Stay updated on your donations and community activity.
          </p>
        </div>
        <button className="text-sm font-semibold text-[#1a9f3b] hover:text-green-800 transition-colors">
          Mark all read
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
        {notificationData.map((notification) => (
          <div 
            key={notification.id} 
            className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors gap-4"
          >
            {/* Left side: Icon & Text content */}
            <div className="flex items-start gap-4 flex-1">
              <div className={`p-2.5 rounded-full shrink-0 ${notification.iconBg}`}>
                {notification.icon}
              </div>
              <div className="pt-0.5">
                <p className="text-[15px] font-medium text-gray-800 leading-snug">
                  {notification.text}
                </p>
                <p className="text-xs font-medium text-gray-400 mt-1">
                  {notification.time}
                </p>
              </div>
            </div>

            {/* Right side: Unread Dot Indicator */}
            {notification.isUnread && (
              <div className="w-2 h-2 rounded-full bg-[#1a9f3b] shrink-0 mx-2" />
            )}
          </div>
        ))}
      </div>

    </div>
  );
}