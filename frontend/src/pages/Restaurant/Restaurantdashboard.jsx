import React from "react";
import { UtensilsCrossed, Activity, Building2, Leaf } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "../../components/SideBar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useRestaurantOverview } from "../../hooks/useRestaurantOverview";
import "../../styles/Dashboard.css";

function badgeClass(status) {
  if (status === "Delivered" || status === "Active") return "badge badge--delivered";
  if (status === "Picked Up") return "badge badge--picked-up";
  if (status === "Cancelled") return "badge badge--cancelled";
  return "badge";
}

export default function RestaurantDashboard({
  onNavigate = () => {},
  onLogout = () => {},
}) {
  const { user } = useAuth();
  const { overview, loading, error } = useRestaurantOverview(user?._id);

  const s = overview?.stats || {};

  const stats = [
    {
      icon: UtensilsCrossed,
      variant: "green",
      value: s.mealsDonated ?? 0,
      label: "Meals Donated",
      meta: `↑ ${s.mealsDonatedChangePct ?? 0}%`,
      metaUp: (s.mealsDonatedChangePct ?? 0) >= 0,
    },
    {
      icon: Activity,
      variant: "orange",
      value: s.activeListings ?? 0,
      label: "Active Listings",
      meta: s.listingsExpiringSoon ? `${s.listingsExpiringSoon} expiring soon` : "none expiring",
    },
    {
      icon: Building2,
      variant: "blue",
      value: s.ngosServedThisMonth ?? 0,
      label: "NGOs Served",
      meta: "this month",
    },
    {
      icon: Leaf,
      variant: "green",
      value: s.co2SavedKgLifetime ?? 0,
      label: "CO₂ Saved (kg)",
      meta: "lifetime",
    },
  ];

  const chartData = overview?.monthlyDonations || [];
  const listings = overview?.recentListings || [];

  return (
    <div className="dashboard-layout">
      <Sidebar role="restaurant" activeKey="overview" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>{overview?.restaurantName || user?.name}</h1>
            <p>
              {overview?.location}
              {overview?.isVerified ? " · Verified Donor ✓" : ""}
            </p>
          </div>
          {overview?.isActiveDonor && (
            <span className="page-header-badge">
              <span className="page-header-badge-dot" />
              Active Donor
            </span>
          )}
        </div>

        {error && <p className="empty-text">{error}</p>}

        {loading ? (
          <p className="muted-text">Loading overview…</p>
        ) : (
          <>
            <div className="stat-grid">
              {stats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <div className="stat-card-top">
                    <span className={`stat-card-icon stat-card-icon--${stat.variant}`}>
                      <stat.icon size={16} />
                    </span>
                  </div>
                  <div className="stat-card-value">{stat.value}</div>
                  <div className="stat-card-label">{stat.label}</div>
                  <div
                    className={stat.metaUp ? "stat-card-meta stat-card-meta--up" : "stat-card-meta"}
                    style={{ marginTop: "0.35rem" }}
                  >
                    {stat.meta}
                  </div>
                </div>
              ))}
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
                  <button className="panel-link" onClick={() => onNavigate("donation-history")}>
                    View All
                  </button>
                </div>
                {listings.length === 0 ? (
                  <p className="empty-text">No listings yet.</p>
                ) : (
                  listings.map((item) => (
                    <div className="list-item" key={item.id} style={{ justifyContent: "space-between" }}>
                      <p className="list-item-title" style={{ margin: 0 }}>{item.name}</p>
                      <div className="list-item-trailing">
                        <span className="list-item-qty">{item.quantityLabel}</span>
                        <span className={badgeClass(item.status)}>{item.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}