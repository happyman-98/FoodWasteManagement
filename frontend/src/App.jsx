import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 1. Import your public pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup'; 
// 2. Import your Role-Based Dashboard entry points
import DonorDashboard from './pages/Donor/DonorDashboard'; 
import AdminDashboard from './pages/Admin/AdminDashboard'; 
import DonateFood from './pages/Donor/DonateFood'; 
import DonateItems from './pages/Donor/DonateItems'; 
import MyDonations from './pages/Donor/MyDonations';
import Notifications from './pages/Donor/Notifications';
import Profile from './pages/Donor/Profile';
import Donations from './pages/Admin/Donations';
import NGOs from './pages/Admin/NGOS';
import Users from './pages/Admin/Users';
import Restaurants from './pages/Admin/Restaurants';
import Reports from './pages/Admin/Reports';
import Settings from './pages/Admin/Settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* --- DONOR ROUTES --- */}
        <Route path="/donor" element={<DonorDashboard />} />
        <Route path="/donor/donate-food" element={<DonateFood />} />
        <Route path="/donor/donate-items" element={<DonateItems />} />
        <Route path="/donor/donations" element={<MyDonations />} />
        <Route path="/donor/notifications" element={<Notifications />} />
        <Route path="/donor/profile" element={<Profile />} />
        {/*Donor Fallback Routes */}
        <Route path="/donor/*" element={<Navigate to="/donor" replace />} />

        {/* --- ADMIN ROUTES --- */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/restaurants" element={<Restaurants />} />
        <Route path="/admin/ngos" element={<NGOs />} />
        <Route path="/admin/donations" element={<Donations />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/settings" element={<Settings />} />
        {/*Admin Fallback Routes */}
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        {/*Global Fallback Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
export default App;