// src/data/donorData.js

export const donorProfileRecord = {
  accountInfo: {
    name: 'Ananya Krishnan',
    role: 'Donor',
    location: 'Bangalore, India',
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop'
  },
  formDetails: {
    firstName: 'Ananya',
    lastName: 'Krishnan',
    email: 'ananya.krishnan@email.com',
    phone: '+91 98765 43210',
    cityArea: 'Koramangala, Bangalore',
    bio: 'Passionate about reducing food waste and giving reusable items a second life.'
  }
};

export const donorNotificationsFeed = [
  {
    id: 1,
    type: 'success',
    text: "Your food donation 'Biryani & Curry' was picked up by Seva NGO.",
    time: "2 hours ago",
    isUnread: true,
  },
  {
    id: 2,
    type: 'alert',
    text: "New pickup request from Helping Hands Trust for your vegetable listing.",
    time: "5 hours ago",
    isUnread: true,
  },
  {
    id: 3,
    type: 'heart',
    text: "You helped 12 families this week. Your donations made a real difference!",
    time: "1 day ago",
    isUnread: true,
  },
  {
    id: 4,
    type: 'warning',
    text: "Donation #D2371 (Engineering Books) expires in 24 hours. Consider extending or closing it.",
    time: "2 days ago",
    isUnread: false,
  },
  {
    id: 5,
    type: 'success',
    text: "Your item donation 'Winter Jackets' was successfully delivered to Bal Bhavan NGO.",
    time: "3 days ago",
    isUnread: false,
  },
  {
    id: 6,
    type: 'user',
    text: "Kavitha Reddy (NGO) saved your listing 'Organic Spinach 15kg'.",
    time: "4 days ago",
    isUnread: false,
  }
];