import React from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";

// Mirrors GET /api/admin/donations/summary
const DONATION_SUMMARY = [
  { key: "active", value: "4,120", label: "Active", color: "#2e7d32" },
  { key: "pendingPickup", value: "892", label: "Pending Pickup", color: "#f57c00" },
  { key: "completed", value: "38,210", label: "Completed", color: "#1565c0" },
];

/**
 * Mirrors GET /api/admin/donations
 * `status` is a plain enum: "active" | "picked_up" | "delivered" | "pending" | "cancelled".
 * The badge class/label mapping lives in STATUS_DISPLAY below, kept out of the API layer.
 */
const DONATIONS = [
  { donationId: "d_2381", title: "Cooked Biryani 40 portions", donor: "Spice Garden", category: "Food", postedAt: "2026-07-08", status: "active" },
  { donationId: "d_2380", title: "Organic Tomatoes 120 kg", donor: "Green Acres", category: "Vegetables", postedAt: "2026-07-07", status: "picked_up" },
  { donationId: "d_2379", title: "Children's Clothing 45 pcs", donor: "Meena Joshi", category: "Clothes", postedAt: "2026-07-06", status: "delivered" },
  { donationId: "d_2378", title: "Python Books Set", donor: "Techno College", category: "Books", postedAt: "2026-07-05", status: "pending" },
  { donationId: "d_2377", title: "Office Chair 1 unit", donor: "Kiran Kumar", category: "Furniture", postedAt: "2026-07-04", status: "cancelled" },
];

const STATUS_DISPLAY = {
  active: { label: "Active", badgeClass: "active" },
  picked_up: { label: "Picked Up", badgeClass: "picked-up" },
  delivered: { label: "Delivered", badgeClass: "delivered" },
  pending: { label: "Pending", badgeClass: "pending" },
  cancelled: { label: "Cancelled", badgeClass: "cancelled" },
};

function formatShortDate(isoDate) {
  const [, month, day] = isoDate.split("-");
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${MONTHS[parseInt(month, 10) - 1]} ${parseInt(day, 10)}`;
}

export default function Donations({ onNavigate = () => {}, onLogout = () => {} }) {
  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" activeKey="donations" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>All Donations</h1>
            <p>Monitor all active and completed donations across the platform.</p>
          </div>
        </div>

        <div className="stat-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
          {DONATION_SUMMARY.map((stat) => (
            <div className="stat-card" key={stat.key} style={{ textAlign: "center" }}>
              <div className="stat-card-value" style={{ color: stat.color }}>{stat.value}</div>
              <div className="stat-card-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="panel" style={{ padding: "1.5rem" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Donation</th>
                <th>Donor</th>
                <th>Category</th>
                <th>Posted</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {DONATIONS.map((donation) => {
                const display = STATUS_DISPLAY[donation.status];
                return (
                  <tr key={donation.donationId}>
                    <td>{donation.title}</td>
                    <td>{donation.donor}</td>
                    <td>
                      <span className="badge badge--active">{donation.category}</span>
                    </td>
                    <td>{formatShortDate(donation.postedAt)}</td>
                    <td>
                      <span className={`badge badge--${display.badgeClass}`}>{display.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
