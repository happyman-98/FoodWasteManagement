import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";

import DonorDashboard from "./pages/Doner/Donerdashboard";
import DonateFood     from "./pages/Doner/DonateFood";
import DonateItems    from "./pages/Doner/DonateItems";
import MyDonations    from "./pages/Doner/MyDonations";
import Profile        from "./pages/Doner/Profile";
import Notifications  from "./pages/Doner/Notifications";
import DonationDetail    from "./pages/Doner/DonationDetail";

import FarmerPortal from "./pages/Farmer/FarmerPortal";
import RestaurantPortal from "./pages/Restaurant/Restaurantportal";

import RestaurantDashboard from "./pages/Restaurant/Restaurantdashboard";
import FarmerDashboard     from "./pages/Farmer/Farmerdashboard";

import NgoOverview     from "./pages/Ngo/NgoOverview";
import NgoDashboard    from "./pages/Ngo/Ngodashboard";
import SavedDonations  from "./pages/Ngo/SavedDonations";
import PickupRequests  from "./pages/Ngo/PickupRequests";
import NgoSettings     from "./pages/Ngo/NgoSettings";

import AdminDashboard from "./pages/Admin/Admindashboard";
import Users          from "./pages/Admin/Users";
import Restaurants    from "./pages/Admin/Restaurants";
import Ngos           from "./pages/Admin/Ngos";
import Donations      from "./pages/Admin/Donations";
import Reports        from "./pages/Admin/Reports";
import Settings       from "./pages/Admin/Settings";


const ROLE_ROUTES = {
  donor: "/doner/dashboard",
  restaurant: "/restaurant/overview",
  farmer: "/farmer/overview",
  ngo: "/ngo/overview",
  admin: "/admin/dashboard",
};

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) {
    const userRole = user?.role?.toLowerCase();
    const targetRoute = ROLE_ROUTES[userRole] || "/";
    return <Navigate to={targetRoute} replace />;
  }
  return children;
};

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"      element={<Home />} />
      <Route path="/home"  element={<Home />} />
      <Route path="/login"  element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />

      <Route path="/doner/dashboard"     element={<PrivateRoute><DonorDashboard /></PrivateRoute>} />
      <Route path="/doner/donate-food"   element={<PrivateRoute><DonateFood /></PrivateRoute>} />
      <Route path="/doner/donate-items"  element={<PrivateRoute><DonateItems /></PrivateRoute>} />
      <Route path="/doner/my-donations"  element={<PrivateRoute><MyDonations /></PrivateRoute>} />
      <Route path="/doner/donations/:id" element={<PrivateRoute><DonationDetail /></PrivateRoute>} />
      <Route path="/doner/profile"       element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/doner/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />

<Route path="/restaurant/overview" element={<PrivateRoute><RestaurantPortal /></PrivateRoute>} />
      <Route path="/farmer/overview"     element={<PrivateRoute><FarmerPortal /></PrivateRoute>} />

      <Route path="/ngo/overview"         element={<PrivateRoute><NgoOverview /></PrivateRoute>} />
      <Route path="/ngo/browse-donations" element={<PrivateRoute><NgoDashboard /></PrivateRoute>} />
      <Route path="/ngo/saved"            element={<PrivateRoute><SavedDonations /></PrivateRoute>} />
      <Route path="/ngo/pickups"          element={<PrivateRoute><PickupRequests /></PrivateRoute>} />
      <Route path="/ngo/settings"         element={<PrivateRoute><NgoSettings /></PrivateRoute>} />

      <Route path="/admin/dashboard"   element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      <Route path="/admin/users"       element={<PrivateRoute><Users /></PrivateRoute>} />
      <Route path="/admin/restaurants" element={<PrivateRoute><Restaurants /></PrivateRoute>} />
      <Route path="/admin/ngos"        element={<PrivateRoute><Ngos /></PrivateRoute>} />
      <Route path="/admin/donations"   element={<PrivateRoute><Donations /></PrivateRoute>} />
      <Route path="/admin/reports"     element={<PrivateRoute><Reports /></PrivateRoute>} />
      <Route path="/admin/settings"     element={<PrivateRoute><Settings /></PrivateRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;