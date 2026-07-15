import React from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";

/**
 * Mirrors GET /api/ngo/pickups
 * `status` is a plain enum: "active" | "picked_up" | "delivered".
 * Badge label/color mapping lives in STATUS_DISPLAY, not the API.
 */
const PICKUP_REQUESTS = [
  { pickupId: "p_401", title: "Basmati Rice 80kg", donorName: "Spice Garden", scheduledAt: "2026-07-08", status: "active" },
  { pickupId: "p_400", title: "Mixed Vegetables 25kg", donorName: "Green Acres Farm", scheduledAt: "2026-07-06", status: "picked_up" },
  { pickupId: "p_399", title: "Men's Casual Wear", donorName: "Ravi Kumar", scheduledAt: "2026-07-04", status: "delivered" },
  { pickupId: "p_398", title: "School Books", donorName: "Techno College", scheduledAt: "2026-06-30", status: "delivered" },
];

const STATUS_DISPLAY = {
  active: { label: "Active", badgeClass: "active" },
  picked_up: { label: "Picked Up", badgeClass: "picked-up" },
  delivered: { label: "Delivered", badgeClass: "delivered" },
};

function formatShortDate(isoDate) {
  const [, month, day] = isoDate.split("-");
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${MONTHS[parseInt(month, 10) - 1]} ${parseInt(day, 10)}`;
}

export default function PickupRequests({ onNavigate = () => {}, onLogout = () => {} }) {
  return (
    <div className="dashboard-layout">
      <Sidebar role="ngo" activeKey="pickups" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Pickup Requests</h1>
            <p>Track all your active and completed pickup requests.</p>
          </div>
        </div>

        <div className="panel" style={{ padding: "1.5rem" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Donation</th>
                <th>Donor</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {PICKUP_REQUESTS.map((pickup) => {
                const display = STATUS_DISPLAY[pickup.status];
                return (
                  <tr key={pickup.pickupId}>
                    <td>{pickup.title}</td>
                    <td>{pickup.donorName}</td>
                    <td>{formatShortDate(pickup.scheduledAt)}</td>
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
