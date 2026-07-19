import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { usePickupRequests } from "../../hooks/useNgo";
import "../../styles/Dashboard.css";
import "../../styles/ngo-dashboard-shared.css";


const STATUS_DISPLAY = {
  active:     { label: "Active",    badgeClass: "active"    },
  picked_up:  { label: "Picked Up", badgeClass: "picked-up" },
  delivered:  { label: "Delivered", badgeClass: "delivered" },
  Pending:    { label: "Pending",   badgeClass: "pending"   },
  "Picked Up":{ label: "Picked Up", badgeClass: "picked-up" },
  Delivered:  { label: "Delivered", badgeClass: "delivered" },
  Cancelled:  { label: "Cancelled", badgeClass: "cancelled" },
};

export default function PickupRequests() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { pickups, loading, error } = usePickupRequests();

  const onNavigate = (key) => navigate(`/ngo/${key}`);
  const onLogout = async () => { await logout(); navigate("/login"); };

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
          {error && <p className="form-error">{error}</p>}

          {loading ? (
            <p className="loading-text">Loading pickup requests...</p>
          ) : pickups.length === 0 ? (
            <p className="empty-text">No pickup requests yet.</p>
          ) : (
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
                {pickups.map((pickup) => {
                  const display = STATUS_DISPLAY[pickup.status] || { label: pickup.status, badgeClass: "active" };
                  return (
                    <tr key={pickup._id}>
                      <td>{pickup.donation?.title || pickup.title}</td>
                      <td>{pickup.donor?.name || pickup.donorName}</td>
                      <td>{new Date(pickup.createdAt || pickup.scheduledAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
                      <td>
                        <span className={`badge badge--${display.badgeClass}`}>{display.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}