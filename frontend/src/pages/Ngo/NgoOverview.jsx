import React from "react";
import { useNavigate } from "react-router-dom";
import { Truck, Heart, Activity, FileCheck2 } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useNgoStats, useBrowseDonations } from "../../hooks/useNgo";
import "../../styles/Dashboard.css";
import "../../styles/ngo-dashboard-shared.css";


export default function NgoOverview() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { stats, loading: statsLoading } = useNgoStats();
  const { donations, loading: donationsLoading } = useBrowseDonations("All");

  const onNavigate = (key) => navigate(`/ngo/${key}`);
  const onLogout = async () => { await logout(); navigate("/login"); };

  const overviewStats = [
    { key: "pickups",  icon: Truck,    variant: "green",  value: stats?.pickupsThisMonth ?? "—", label: "Pickups This Month" },
    { key: "served",   icon: Heart,    variant: "orange", value: stats?.peopleServed      ?? "—", label: "People Served"       },
    { key: "saved",    icon: Heart,    variant: "purple", value: stats?.savedListings     ?? "—", label: "Saved Listings"      },
    { key: "active",   icon: Activity, variant: "blue",   value: stats?.activeRequests    ?? "—", label: "Active Requests"     },
  ];

  const nearby = donations.slice(0, 3);

  return (
    <div className="dashboard-layout">
      <Sidebar role="ngo" activeKey="overview" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>{user?.name || "NGO Dashboard"}</h1>
            <p>
              {user?.city || "Location not set"} · NGO ID: {user?.ngoRegNumber || "N/A"}
            </p>
          </div>
          <span className="page-header-badge page-header-badge--info">
            <FileCheck2 size={16} />
            Registered NGO
          </span>
        </div>

        <div className="stat-grid">
          {overviewStats.map(({ key, icon: Icon, variant, value, label }) => (
            <div className="stat-card" key={key}>
              <span className={`stat-card-icon-flat stat-card-icon-flat--${variant}`}>
                <Icon size={22} />
              </span>
              <div className="stat-card-value">{statsLoading ? "..." : value}</div>
              <div className="stat-card-label">{label}</div>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Available Nearby</h3>
            <button className="panel-link" onClick={() => onNavigate("browse-donations")}>
              Browse All
            </button>
          </div>

          {donationsLoading ? (
            <p className="loading-text">Loading donations...</p>
          ) : nearby.length === 0 ? (
            <p className="empty-text">No donations available nearby right now.</p>
          ) : (
            nearby.map((donation) => (
              <div className="request-row" key={donation._id}>
                <div className="list-item-body">
                  <p className="list-item-title" style={{ margin: 0 }}>{donation.title}</p>
                  <p className="list-item-sub">
                    {donation.donor?.name || "Unknown"} · {donation.location}
                  </p>
                </div>
                <button className="request-btn" onClick={() => navigate(`/ngo/browse-donations`)}>
                  Request
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}