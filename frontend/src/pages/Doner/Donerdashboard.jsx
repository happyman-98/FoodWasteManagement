import React from "react";
import { Gift, Package, Heart, Leaf, UtensilsCrossed, Search, Truck, CheckCircle2 } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";

const QUICK_ACTIONS = [
  { key: "donate-food", label: "Donate Food", icon: UtensilsCrossed, variant: "green" },
  { key: "donate-items", label: "Donate Items", icon: Package, variant: "orange" },
  { key: "find-donations", label: "Find Donations", icon: Search, variant: "blue" },
  { key: "track-orders", label: "Track Orders", icon: Truck, variant: "purple" },
];

const STATS = [
  { icon: Gift, variant: "green", meta: "+12 this month", value: "82", label: "Total Donations" },
  { icon: Package, variant: "orange", meta: "+5 this month", value: "34", label: "Items Shared" },
  { icon: Heart, variant: "blue", meta: "estimated impact", value: "210", label: "Families Helped" },
  { icon: Leaf, variant: "purple", meta: "lifetime", value: "128", label: "CO₂ Saved (kg)" },
];

const RECENT_DONATIONS = [
  { id: "#D2401", donation: "Cooked Biryani – 40 portions", date: "Jul 6, 2026", status: "Delivered" },
  { id: "#D2398", donation: "Winter Jackets – 12 pcs", date: "Jul 4, 2026", status: "Picked Up" },
];

const NOTIFICATIONS = [
  { text: "Your food donation was picked up by Seva NGO", time: "2h ago" },
  { text: "New donation request for your listing", time: "5h ago" },
];

function badgeClass(status) {
  if (status === "Delivered") return "badge badge--delivered";
  if (status === "Picked Up") return "badge badge--picked-up";
  return "badge";
}

export default function DonorDashboard({ userName = "Ananya Krishnan", onNavigate = () => {}, onLogout = () => {} }) {
  return (
    <div className="dashboard-layout">
      <Sidebar role="donor" activeKey="dashboard" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="welcome-banner">
          <div>
            <p className="eyebrow">Welcome back,</p>
            <h2>{userName} 👋</h2>
            <p className="sub">You've donated 18 times this month — amazing work!</p>
          </div>
          <img
            className="welcome-banner-avatar"
            src="https://i.pravatar.cc/112?img=47"
            alt=""
          />
        </div>

        <h3 className="section-title">Quick Actions</h3>
        <div className="quick-actions-grid">
          {QUICK_ACTIONS.map(({ key, label, icon: Icon, variant }) => (
            <button key={key} className={`quick-action-card quick-action-card--${variant}`} onClick={() => onNavigate(key)}>
              <Icon size={26} strokeWidth={2} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="stat-grid">
          {STATS.map(({ icon: Icon, variant, meta, value, label }) => (
            <div className="stat-card" key={label}>
              <div className="stat-card-top">
                <span className={`stat-card-icon stat-card-icon--${variant}`}>
                  <Icon size={16} />
                </span>
                <span className="stat-card-meta">{meta}</span>
              </div>
              <div className="stat-card-value">{value}</div>
              <div className="stat-card-label">{label}</div>
            </div>
          ))}
        </div>

        <div className="panel-grid">
          <div className="panel">
            <div className="panel-header">
              <h3>Recent Donations</h3>
              <button className="panel-link">View All</button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Donation</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_DONATIONS.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td style={{ fontWeight: 600 }}>{row.donation}</td>
                    <td>{row.date}</td>
                    <td><span className={badgeClass(row.status)}>{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3>Notifications</h3>
              <span className="notif-badge">{NOTIFICATIONS.length} new</span>
            </div>
            {NOTIFICATIONS.map((n, i) => (
              <div className="list-item" key={i}>
                <span className="list-item-icon" style={{ background: "#dcf3de", color: "#2e7d32" }}>
                  <CheckCircle2 size={18} />
                </span>
                <div className="list-item-body">
                  <p className="list-item-title" style={{ fontWeight: 400 }}>{n.text}</p>
                  <p className="list-item-sub">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}