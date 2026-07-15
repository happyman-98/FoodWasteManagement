import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";

import DonorDashboard from "./pages/Doner/Donerdashboard";
import RestaurantDashboard from "./pages/Restaurant/Restaurantdashboard";
import FarmerDashboard from "./pages/Farmer/Farmerdashboard";

// NGO
import NgoOverview from "./pages/Ngo/NgoOverview";
import NgoDashboard from "./pages/Ngo/Ngodashboard"; // Browse Donations
import SavedDonations from "./pages/Ngo/SavedDonations";
import PickupRequests from "./pages/Ngo/PickupRequests";
import NgoSettings from "./pages/Ngo/NgoSettings";

// Admin
import AdminDashboard from "./pages/Admin/Admindashboard";
import Users from "./pages/Admin/Users";
import Restaurants from "./pages/Admin/Restaurants";
import Ngos from "./pages/Admin/Ngos";
import Donations from "./pages/Admin/Donations";
import Reports from "./pages/Admin/Reports";
import Settings from "./pages/Admin/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />

        {/* Doner (individual donor) */}
        <Route path="/doner/dashboard" element={<DonorDashboard />} />

        {/* Restaurant */}
        <Route path="/restaurant/overview" element={<RestaurantDashboard />} />

        {/* Farmer */}
        <Route path="/farmer/overview" element={<FarmerDashboard />} />

        {/* NGO — keys match sidebarConfig.js -> ROLE_CONFIG.ngo */}
        <Route path="/ngo/overview" element={<NgoOverview />} />
        <Route path="/ngo/browse-donations" element={<NgoDashboard />} />
        <Route path="/ngo/saved" element={<SavedDonations />} />
        <Route path="/ngo/pickups" element={<PickupRequests />} />
        <Route path="/ngo/settings" element={<NgoSettings />} />

        {/* Admin — keys match sidebarConfig.js -> ROLE_CONFIG.admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/restaurants" element={<Restaurants />} />
        <Route path="/admin/ngos" element={<Ngos />} />
        <Route path="/admin/donations" element={<Donations />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;