import {
  LayoutDashboard,
  UtensilsCrossed,
  Package,
  Heart,
  Bell,
  CircleUserRound,
  LogOut,
  ArrowUpToLine,
  BarChart3,
  Settings,
  Sprout,
  Search,
  Truck,
  Users,
  Building2,
  ShieldCheck,
  Gift,
  ClipboardList,
} from "lucide-react";

/**
 * Single source of truth for every role's sidebar, matching the
 * ShareCycle screenshots exactly (labels, order, and icons).
 *
 * `portalLabel` renders as the small uppercase eyebrow above the nav
 * list (e.g. "RESTAURANT PORTAL"). Donors don't have one in the
 * reference design, so it's null there.
 */
export const ROLE_CONFIG = {
  donor: {
    label: "Donor",
    portalLabel: null,
    items: [
      { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { key: "donate-food", label: "Donate Food", icon: UtensilsCrossed },
      { key: "donate-items", label: "Donate Used Items", icon: Package },
      { key: "my-donations", label: "My Donations", icon: Heart },
      { key: "notifications", label: "Notifications", icon: Bell },
      { key: "profile", label: "Profile", icon: CircleUserRound },
    ],
    logout: { key: "logout", label: "Log Out", icon: LogOut },
  },

  restaurant: {
    label: "Restaurant",
    portalLabel: "Restaurant Portal",
    items: [
      { key: "overview", label: "Overview", icon: LayoutDashboard },
      { key: "upload-donation", label: "Upload Donation", icon: ArrowUpToLine },
      { key: "donation-history", label: "Donation History", icon: Heart },
      { key: "analytics", label: "Analytics", icon: BarChart3 },
      { key: "settings", label: "Settings", icon: Settings },
    ],
    logout: { key: "logout", label: "Log Out", icon: LogOut },
  },

  farmer: {
    label: "Farmer",
    portalLabel: "Farmer Portal",
    items: [
      { key: "overview", label: "Overview", icon: LayoutDashboard },
      { key: "upload-harvest", label: "Upload Harvest", icon: Sprout },
      { key: "my-listings", label: "My Listings", icon: Heart },
      { key: "analytics", label: "Analytics", icon: BarChart3 },
      { key: "settings", label: "Settings", icon: Settings },
    ],
    logout: { key: "logout", label: "Log Out", icon: LogOut },
  },

  ngo: {
    label: "NGO",
    portalLabel: "NGO Portal",
    items: [
      { key: "overview", label: "Overview", icon: LayoutDashboard },
      { key: "browse-donations", label: "Browse Donations", icon: Search },
      { key: "saved", label: "Saved", icon: Heart },
      { key: "pickups", label: "Pickups", icon: Truck },
      { key: "settings", label: "Settings", icon: Settings },
    ],
    logout: { key: "logout", label: "Log Out", icon: LogOut },
  },

  admin: {
    label: "Admin",
    portalLabel: "Admin Panel",
    items: [
      { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { key: "users", label: "Users", icon: Users },
      { key: "restaurants", label: "Restaurants", icon: Building2 },
      { key: "ngos", label: "NGOs", icon: ShieldCheck },
      { key: "donations", label: "Donations", icon: Gift },
      { key: "reports", label: "Reports", icon: ClipboardList },
      { key: "settings", label: "Settings", icon: Settings },
    ],
    logout: { key: "logout", label: "Log Out", icon: LogOut },
  },
};

export const ROLES = Object.keys(ROLE_CONFIG);