import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Gift, Package, Heart, Leaf,
  UtensilsCrossed, Search, Truck, CheckCircle2,
} from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useDonations } from "../../hooks/useDonations";


import "../../styles/animations.css";
import "../../styles/Dashboard.css";

/* ── Constants ─────────────────────────────────── */
const QUICK_ACTIONS = [
  { key: "donate-food",    label: "Donate Food",    icon: UtensilsCrossed, variant: "green"  },
  { key: "donate-items",   label: "Donate Items",   icon: Package,         variant: "orange" },
  { key: "find-donations", label: "Find Donations", icon: Search,          variant: "blue"   },
  { key: "track-orders",   label: "Track Orders",   icon: Truck,           variant: "purple" },
];

const ROUTE_MAP = {
  "dashboard":      "/doner/dashboard",
  "donate-food":    "/doner/donate-food",
  "donate-items":   "/doner/donate-items",
  "my-donations":   "/doner/my-donations",
  "notifications":  "/doner/notifications",
  "profile":        "/doner/profile",
  "find-donations": "/ngo/browse-donations",
  "track-orders":   "/doner/my-donations",
};

function badgeClass(status) {
  const map = {
    "Delivered":  "badge badge--delivered",
    "Picked Up":  "badge badge--picked-up",
    "Pending":    "badge badge--pending",
    "Cancelled":  "badge badge--cancelled",
    "Active":     "badge badge--active",
  };
  return map[status] ?? "badge";
}

export default function DonorDashboard() {
  const { user, logout } = useAuth();
  const { donations, loading } = useDonations();
  const navigate = useNavigate();

  const onNavigate = (key) => navigate(ROUTE_MAP[key] || "/");
  const onLogout   = async () => { await logout(); navigate("/login"); };

  const recent = donations.slice(0, 3);

  const thisMonth = donations.filter(
    (d) => new Date(d.createdAt).getMonth() === new Date().getMonth()
  ).length;

  const stats = [
    {
      icon: Gift,    variant: "green",
      meta: "all time",         value: donations.length,
      label: "Total Donations",
    },
    {
      icon: Package, variant: "orange",
      meta: "this month",       value: thisMonth,
      label: "This Month",
    },
    {
      icon: Heart,   variant: "blue",
      meta: "estimated impact", value: donations.length * 3,
      label: "Families Helped",
    },
    {
      icon: Leaf,    variant: "purple",
      meta: "lifetime",         value: donations.length * 2,
      label: "CO₂ Saved (kg)",
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar
        role="donor"
        activeKey="dashboard"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="dashboard-main">

        {/* ── Welcome Banner ── */}
        <div className="db-banner">
          <div className="db-banner-text">
            <p className="db-banner-eyebrow">Welcome back,</p>
            <h2 className="db-banner-name">{user?.name || "Donor"} 👋</h2>
            <p className="db-banner-sub">
              You've donated {donations.length} time{donations.length !== 1 ? "s" : ""} — amazing work!
            </p>
          </div>
          <img
            className="db-banner-avatar"
            src={user?.avatar || "/default-avatar.png"||"https://i.pravatar.cc/144?img=4"}
            alt={user?.name || "Donor avatar"}
          />
        </div>

        {/* ── Quick Actions ── */}
        <h3 className="db-section-title">Quick Actions</h3>
        <div className="db-actions-grid">
          {QUICK_ACTIONS.map(({ key, label, icon: Icon, variant }) => (
            <button
              key={key}
              className={`db-action-btn db-action-btn--${variant}`}
              onClick={() => onNavigate(key)}
              aria-label={label}
            >
              <span className="db-action-icon">
                <Icon size={22} strokeWidth={2} />
              </span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* ── Stat Cards ── */}
        <div className="db-stat-grid">
          {stats.map(({ icon: Icon, variant, meta, value, label }) => (
            <div className={`db-stat-card db-stat-card--${variant}`} key={label}>
              <div className="db-stat-top">
                <span className={`db-stat-icon db-stat-icon--${variant}`}>
                  <Icon size={17} />
                </span>
                <span className="db-stat-meta">{meta}</span>
              </div>
              <div className="db-stat-value">
                {loading ? "—" : value}
              </div>
              <div className="db-stat-label">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Panel Grid ── */}
        <div className="db-panel-grid">

          {/* Recent Donations */}
          <div className="db-panel">
            <div className="db-panel-header">
              <h3>Recent Donations</h3>
              <button
                className="db-panel-link"
                onClick={() => navigate("/doner/my-donations")}
              >
                View all →
              </button>
            </div>

            {loading ? (
              <p className="db-loading">Loading…</p>
            ) : recent.length === 0 ? (
              <p className="db-empty">
                No donations yet — start by donating food or items!
              </p>
            ) : (
              <table className="db-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Donation</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((row) => (
                    <tr
                      key={row._id}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/doner/donation/${row._id}`)}
                    >
                      <td>
                        <span className="db-table-id">
                          #{row._id.slice(-5).toUpperCase()}
                        </span>
                      </td>
                      <td className="db-table-title">{row.title}</td>
                      <td>
                        {new Date(row.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </td>
                      <td>
                        <span className={badgeClass(row.status)}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Notifications */}
          <div className="db-panel">
            <div className="db-panel-header">
              <h3>Notifications</h3>
            </div>

            <div className="db-notif-item">
              <span
                className="db-notif-icon"
                style={{ background: "#dcf3de", color: "#2e7d32" }}
              >
                <CheckCircle2 size={18} />
              </span>
              <div>
                <p className="db-notif-title">
                  Welcome to ShareCycle, {user?.name?.split(" ")[0] || "there"}!
                  Start making a difference.
                </p>
                <p className="db-notif-time">Just now</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}