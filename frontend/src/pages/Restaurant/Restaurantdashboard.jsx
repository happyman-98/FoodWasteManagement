import React from "react";
import { UtensilsCrossed, Activity, Building2, Leaf } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";

/**
 * ---------------------------------------------------------------------------
 * BACKEND / API CONTRACT — Restaurant Overview (GET /api/restaurant/overview)
 * ---------------------------------------------------------------------------
 * This page renders entirely from props. Nothing below is hardcoded data —
 * MOCK_STATS / MOCK_CHART_DATA / MOCK_LISTINGS only exist so the page looks
 * right in isolation and double as a sample of the exact shape expected
 * from the API.
 *
 * Suggested response shape for GET /api/restaurant/:id/overview :
 * {
 *   "restaurantName": "Spice Garden Restaurant",
 *   "location": "Koramangala, Bangalore",
 *   "isVerified": true,
 *   "isActiveDonor": true,
 *   "stats": {
 *     "mealsDonated": 3420,          // -> STATS[0].value
 *     "mealsDonatedChangePct": 18,   // -> STATS[0].meta ("↑ 18%")
 *     "activeListings": 7,           // -> STATS[1].value
 *     "listingsExpiringSoon": 2,     // -> STATS[1].meta
 *     "ngosServedThisMonth": 24,     // -> STATS[2].value
 *     "co2SavedKgLifetime": 820      // -> STATS[3].value
 *   },
 *   "monthlyDonations": [            // -> chartData, one point per month
 *     { "month": "Feb", "meals": 480 },
 *     { "month": "Mar", "meals": 640 }
 *   ],
 *   "recentListings": [              // -> listings, most recent first, capped server-side (e.g. top 4)
 *     { "id": "lst_101", "name": "Dal & Rice", "quantityLabel": "40 pcs", "status": "Active" }
 *   ]
 * }
 *
 * `status` must be one of: "Active" | "Picked Up" | "Delivered" | "Cancelled"
 * (this exact casing — it's used to pick the badge color, see badgeClass()).
 * ---------------------------------------------------------------------------
 */

// Maps a stat's `key` to the icon + color variant shown in the UI.
// Backend does not need to know about this — it only sends numbers/labels.
const STAT_DISPLAY_CONFIG = {
  mealsDonated: { icon: UtensilsCrossed, variant: "green", label: "Meals Donated" },
  activeListings: { icon: Activity, variant: "orange", label: "Active Listings" },
  ngosServed: { icon: Building2, variant: "blue", label: "NGOs Served" },
  co2Saved: { icon: Leaf, variant: "green", label: "CO₂ Saved (kg)" },
};

// Sample data matching the API contract above — used only as a fallback
// default so the component renders sensibly before real data is wired in.
const MOCK_STATS = [
  { key: "mealsDonated", value: "3,420", meta: "↑ 18%", metaUp: true },
  { key: "activeListings", value: "7", meta: "2 expiring soon" },
  { key: "ngosServed", value: "24", meta: "this month" },
  { key: "co2Saved", value: "820", meta: "lifetime" },
];

const MOCK_CHART_DATA = [
  { month: "Feb", meals: 480 },
  { month: "Mar", meals: 640 },
  { month: "Apr", meals: 560 },
  { month: "May", meals: 920 },
  { month: "Jun", meals: 840 },
  { month: "Jul", meals: 1040 },
];

const MOCK_LISTINGS = [
  { id: "lst_1", name: "Dal & Rice", quantityLabel: "40 pcs", status: "Active" },
  { id: "lst_2", name: "Sambar & Idli", quantityLabel: "25 pcs", status: "Picked Up" },
  { id: "lst_3", name: "Chapati & Sabzi", quantityLabel: "30 pcs", status: "Delivered" },
  { id: "lst_4", name: "Veg Biryani", quantityLabel: "50 pcs", status: "Delivered" },
];

// status -> badge CSS class. Keep in sync with Dashboard.css badge classes.
function badgeClass(status) {
  if (status === "Delivered" || status === "Active") return "badge badge--delivered";
  if (status === "Picked Up") return "badge badge--picked-up";
  if (status === "Cancelled") return "badge badge--cancelled";
  return "badge";
}

export default function RestaurantDashboard({
  restaurantName = "Spice Garden Restaurant",
  location = "Koramangala, Bangalore",
  isVerified = true,
  isActiveDonor = true,
  stats = MOCK_STATS,
  chartData = MOCK_CHART_DATA,
  listings = MOCK_LISTINGS,
  isLoading = false,
  onNavigate = () => {},
  onLogout = () => {},
  onViewAllListings = () => {},
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar role="restaurant" activeKey="overview" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>{restaurantName}</h1>
            <p>
              {location}
              {isVerified ? " · Verified Donor ✓" : ""}
            </p>
          </div>
          {isActiveDonor && (
            <span className="page-header-badge">
              <span className="page-header-badge-dot" />
              Active Donor
            </span>
          )}
        </div>

        {isLoading ? (
          <p className="muted-text">Loading overview…</p>
        ) : (
          <>
            <div className="stat-grid">
              {stats.map((stat) => {
                const config = STAT_DISPLAY_CONFIG[stat.key] || {};
                const Icon = config.icon || UtensilsCrossed;
                return (
                  <div className="stat-card" key={stat.key}>
                    <div className="stat-card-top">
                      <span className={`stat-card-icon stat-card-icon--${config.variant || "green"}`}>
                        <Icon size={16} />
                      </span>
                    </div>
                    <div className="stat-card-value">{stat.value}</div>
                    <div className="stat-card-label">{config.label || stat.key}</div>
                    <div
                      className={stat.metaUp ? "stat-card-meta stat-card-meta--up" : "stat-card-meta"}
                      style={{ marginTop: "0.35rem" }}
                    >
                      {stat.meta}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="panel-grid">
              <div className="panel">
                <div className="panel-header">
                  <h3>Monthly Food Donations</h3>
                </div>
                <div style={{ width: "100%", height: 260 }}>
                  <ResponsiveContainer>
                    <LineChart data={chartData} margin={{ left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                      <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="meals" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="panel">
                <div className="panel-header">
                  <h3>Recent Listings</h3>
                  <button className="panel-link" onClick={onViewAllListings}>View All</button>
                </div>
                {listings.map((item) => (
                  <div className="list-item" key={item.id} style={{ justifyContent: "space-between" }}>
                    <p className="list-item-title" style={{ margin: 0 }}>{item.name}</p>
                    <div className="list-item-trailing">
                      <span className="list-item-qty">{item.quantityLabel}</span>
                      <span className={badgeClass(item.status)}>{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}