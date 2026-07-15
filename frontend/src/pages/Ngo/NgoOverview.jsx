import React from "react";
import { Truck, Heart, Activity, FileCheck2 } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";

/**
 * Mirrors GET /api/ngo/profile
 * Keep `verified` as a boolean, not baked into `name`/`subtitle`, so the
 * checkmark can be toggled independently of the rest of the profile copy.
 */
const NGO_PROFILE = {
  name: "Seva Humanitarian Trust",
  locality: "Indiranagar, Bangalore",
  registrationId: "NGO-2024-0482",
  verified: true,
};

// Mirrors GET /api/ngo/overview/stats
const OVERVIEW_STATS = [
  { key: "pickupsThisMonth", icon: Truck, variant: "green", value: "142", label: "Pickups This Month" },
  { key: "peopleServed", icon: Heart, variant: "orange", value: "3,820", label: "People Served" },
  { key: "savedListings", icon: Heart, variant: "purple", value: "28", label: "Saved Listings" },
  { key: "activeRequests", icon: Activity, variant: "blue", value: "6", label: "Active Requests" },
];

/**
 * Mirrors GET /api/ngo/donations/nearby?limit=3
 * Same shape as the Browse Donations listings — reuse this array's fields
 * (`donationId`, `title`, `donorName`, `distanceKm`) across both pages so
 * the API only needs one endpoint shape for "a donation card".
 */
const NEARBY_DONATIONS = [
  { donationId: "don_9001", title: "Basmati Rice – 80 kg", donorName: "Spice Garden Restaurant", distanceKm: 2.1 },
  { donationId: "don_9002", title: "Mixed Vegetables – 25 kg", donorName: "Green Acres Farm", distanceKm: 4.5 },
  { donationId: "don_9003", title: "Men's Casual Wear – 30 pcs", donorName: "Ravi Kumar", distanceKm: 1.8 },
];

export default function NgoOverview({
  onNavigate = () => {},
  onLogout = () => {},
  onRequestDonation = () => {},
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar role="ngo" activeKey="overview" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>{NGO_PROFILE.name}</h1>
            <p>
              {NGO_PROFILE.locality} · NGO ID: {NGO_PROFILE.registrationId}
              {NGO_PROFILE.verified && " · Verified ✓"}
            </p>
          </div>
          <span className="page-header-badge page-header-badge--info">
            <FileCheck2 size={16} />
            Registered NGO
          </span>
        </div>

        <div className="stat-grid">
          {OVERVIEW_STATS.map(({ key, icon: Icon, variant, value, label }) => (
            <div className="stat-card" key={key}>
              <span className={`stat-card-icon-flat stat-card-icon-flat--${variant}`}>
                <Icon size={22} />
              </span>
              <div className="stat-card-value">{value}</div>
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

          {NEARBY_DONATIONS.map((donation) => (
            <div className="request-row" key={donation.donationId}>
              <div className="list-item-body">
                <p className="list-item-title" style={{ margin: 0 }}>{donation.title}</p>
                <p className="list-item-sub">
                  {donation.donorName} · {donation.distanceKm} km away
                </p>
              </div>
              <button className="request-btn" onClick={() => onRequestDonation(donation.donationId)}>
                Request
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
