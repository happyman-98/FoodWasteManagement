import React from "react";
import { Sprout, Activity, Heart, CheckCircle2 } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";



const STAT_DISPLAY_CONFIG = {
  totalProduceDonated: { icon: Sprout, variant: "green", label: "Total Produce Donated" },
  activeListings: { icon: Activity, variant: "orange", label: "Active Listings" },
  familiesFed: { icon: Heart, variant: "blue", label: "Families Fed" },
  pickupSuccessRate: { icon: CheckCircle2, variant: "purple", label: "Pickup Success Rate" },
};

const MOCK_STATS = [
  { key: "totalProduceDonated", value: "4.2 tons" },
  { key: "activeListings", value: "3" },
  { key: "familiesFed", value: "1,840" },
  { key: "pickupSuccessRate", value: "97%" },
];

const MOCK_LISTINGS = [
  { id: "lst_1", name: "Tomatoes", quantityLabel: "120 kg", availableLabel: "Available Jul 8", status: "Active", imageUrl: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=100&h=100&fit=crop" },
  { id: "lst_2", name: "Spinach", quantityLabel: "45 kg", availableLabel: "Available Jul 7", status: "Picked Up", imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop" },
  { id: "lst_3", name: "Brinjal", quantityLabel: "80 kg", availableLabel: "Available Jul 5", status: "Delivered", imageUrl: "https://images.unsplash.com/photo-1659261200833-ec8761558af7?w=100&h=100&fit=crop" },
];

function badgeClass(status) {
  if (status === "Delivered" || status === "Active") return "badge badge--delivered";
  if (status === "Picked Up") return "badge badge--picked-up";
  if (status === "Cancelled") return "badge badge--cancelled";
  return "badge";
}

export default function FarmerDashboard({
  farmName = "Green Acres Farm",
  location = "Whitefield, Bangalore",
  isVerified = true,
  stats = MOCK_STATS,
  listings = MOCK_LISTINGS,
  isLoading = false,
  onNavigate = () => {},
  onLogout = () => {},
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar role="farmer" activeKey="overview" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>{farmName}</h1>
            <p>
              {location}
              {isVerified ? " · Verified Farmer ✓" : ""}
            </p>
          </div>
        </div>

        {isLoading ? (
          <p className="muted-text">Loading overview…</p>
        ) : (
          <>
            <div className="stat-grid">
              {stats.map((stat) => {
                const config = STAT_DISPLAY_CONFIG[stat.key] || {};
                const Icon = config.icon || Sprout;
                return (
                  <div className="stat-card" key={stat.key}>
                    <div className="stat-card-top">
                      <span className={`stat-card-icon stat-card-icon--${config.variant || "green"}`}>
                        <Icon size={16} />
                      </span>
                    </div>
                    <div className="stat-card-value">{stat.value}</div>
                    <div className="stat-card-label">{config.label || stat.key}</div>
                  </div>
                );
              })}
            </div>

            <div className="panel">
              <div className="panel-header">
                <h3>My Produce Listings</h3>
                {/* Clicking "View All" takes the farmer to the full My Listings page */}
                <button className="panel-link" onClick={() => onNavigate("my-listings")}>
                  View All
                </button>
              </div>
              {listings.length === 0 ? (
                <p className="muted-text">No produce listed yet.</p>
              ) : (
                listings.map((item) => (
                  <div className="list-item" key={item.id} style={{ justifyContent: "space-between" }}>
                    <img className="list-item-thumb" src={item.imageUrl} alt="" />
                    <div className="list-item-body">
                      <p className="list-item-title">{item.name}</p>
                      <p className="list-item-sub">{item.quantityLabel} · {item.availableLabel}</p>
                    </div>
                    <span className={badgeClass(item.status)}>{item.status}</span>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
