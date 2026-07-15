import React from "react";
import {
  Users,
  Gift,
  Leaf,
  Package,
  Download,
  ShieldCheck,
  Sprout,
  Truck,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Sidebar from "../../components/SideBar/Sidebar";
import { useSidebarNavigation } from "../../hooks/useSidebarNavigation";
import "../../styles/Dashboard.css";

const STATS = [
  { icon: Users, variant: "blue", value: "85,420", label: "Total Users", meta: "+2,340 this week" },
  { icon: Gift, variant: "green", value: "4,120", label: "Active Donations", meta: "+180 today" },
  { icon: Leaf, variant: "green", value: "48,200", label: "Food Saved (kg)", meta: "+1,200 this week" },
  { icon: Package, variant: "orange", value: "38,290", label: "Items Donated", meta: "+420 this week" },
];

const WEEKLY_ACTIVITY = [
  { day: "Mon", newUsers: 40, donations: 60 },
  { day: "Tue", newUsers: 55, donations: 75 },
  { day: "Wed", newUsers: 30, donations: 50 },
  { day: "Thu", newUsers: 60, donations: 95 },
  { day: "Fri", newUsers: 70, donations: 120 },
  { day: "Sat", newUsers: 45, donations: 80 },
  { day: "Sun", newUsers: 42, donations: 68 },
];

const CATEGORY_DATA = [
  { name: "Food", value: 45, color: "#2e7d32" },
  { name: "Vegetables", value: 22, color: "#66bb6a" },
  { name: "Clothes", value: 18, color: "#f57c00" },
  { name: "Furniture", value: 8, color: "#ffb74d" },
  { name: "Books", value: 5, color: "#1565c0" },
  { name: "Electronics", value: 2, color: "#6a1b9a" },
];

/**
 * Recent Users — mirrors GET /api/admin/users?limit=4&sort=-joinedAt
 * `status` is the source of truth for the badge; keep it a plain enum
 * ("active" | "inactive") rather than a display label, so the UI can
 * decide copy/color and the API never has to know about styling.
 */
const RECENT_USERS = [
  { userId: "u_1007", fullName: "Sunita Rao", avatarUrl: "/avatars/sunita-rao.jpg", role: "Restaurant", joinedAt: "2026-07-07", status: "active" },
  { userId: "u_1006", fullName: "Arvind Patel", avatarUrl: "/avatars/arvind-patel.jpg", role: "Farmer", joinedAt: "2026-07-06", status: "active" },
  { userId: "u_1005", fullName: "Meena Joshi", avatarUrl: "/avatars/meena-joshi.jpg", role: "NGO", joinedAt: "2026-07-05", status: "active" },
  { userId: "u_1004", fullName: "Kiran Kumar", avatarUrl: "/avatars/kiran-kumar.jpg", role: "Donor", joinedAt: "2026-07-04", status: "inactive" },
];

/**
 * Recent Activity — mirrors GET /api/admin/activity-feed?limit=5
 * `type` is a stable enum the backend controls; it drives which icon/color
 * renders (see ACTIVITY_ICON_MAP below) so adding a new event type is a
 * one-line change here rather than a design decision in the API layer.
 * `occurredAt` should be an ISO timestamp — swap the hardcoded `timeAgo`
 * strings below for a real relative-time formatter (e.g. dayjs/date-fns)
 * once that's wired up.
 */
const RECENT_ACTIVITY = [
  { activityId: "a_501", type: "ngo_registered", title: "New NGO registered", subtitle: "Helping Hands Trust", occurredAt: "2026-07-08T16:27:00+05:45", timeAgo: "3 min ago" },
  { activityId: "a_500", type: "donation_posted", title: "Large food donation posted", subtitle: "Taj Hotel Group", occurredAt: "2026-07-08T16:18:00+05:45", timeAgo: "12 min ago" },
  { activityId: "a_499", type: "pickup_confirmed", title: "Pickup confirmed", subtitle: "Seva NGO ← Spice Garden", occurredAt: "2026-07-08T16:02:00+05:45", timeAgo: "28 min ago" },
  { activityId: "a_498", type: "user_signup", title: "New user signed up", subtitle: "Ramesh Gupta (Donor)", occurredAt: "2026-07-08T15:45:00+05:45", timeAgo: "45 min ago" },
  { activityId: "a_497", type: "donation_expired", title: "Donation expired", subtitle: "#D2381 · Veg Biryani", occurredAt: "2026-07-08T15:30:00+05:45", timeAgo: "1h ago" },
];

// Maps the backend `type`/`status` enums above to presentation-only concerns
// (icon + color). Keeping this lookup in the component means the API layer
// never has to send icon names or hex codes.
const ACTIVITY_ICON_MAP = {
  ngo_registered: { icon: ShieldCheck, variant: "blue" },
  donation_posted: { icon: Sprout, variant: "green" },
  pickup_confirmed: { icon: Truck, variant: "teal" },
  user_signup: { icon: UserPlus, variant: "purple" },
  donation_expired: { icon: AlertCircle, variant: "red" },
};

const STATUS_BADGE_MAP = {
  active: "active",
  inactive: "inactive",
};

// "2026-07-07" -> "Jul 7"  (swap for a real date lib if locale support is needed)
function formatShortDate(isoDate) {
  const [, month, day] = isoDate.split("-");
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${MONTHS[parseInt(month, 10) - 1]} ${parseInt(day, 10)}`;
}

export default function AdminDashboard() {
  const { activeKey, onNavigate, onLogout } = useSidebarNavigation("admin");

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" activeKey={activeKey} onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Last updated: July 8, 2026, 4:30 PM IST</p>
          </div>
          <button className="page-header-action">
            <Download size={16} />
            Export Report
          </button>
        </div>

        <div className="stat-grid">
          {STATS.map(({ icon: Icon, variant, value, label, meta }) => (
            <div className="stat-card" key={label}>
              <div className="stat-card-top">
                <span className={`stat-card-icon stat-card-icon--${variant}`}>
                  <Icon size={16} />
                </span>
              </div>
              <div className="stat-card-value">{value}</div>
              <div className="stat-card-label">{label}</div>
              <div className="stat-card-meta stat-card-meta--up" style={{ marginTop: "0.35rem" }}>{meta}</div>
            </div>
          ))}
        </div>

        <div className="panel-grid">
          <div className="panel">
            <div className="panel-header">
              <h3>Weekly Activity</h3>
            </div>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={WEEKLY_ACTIVITY} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="newUsers" fill="#1565c0" radius={[3, 3, 0, 0]} barSize={10} name="New Users" />
                  <Bar dataKey="donations" fill="var(--chart-1)" radius={[3, 3, 0, 0]} barSize={10} name="Donations" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem", fontSize: "0.85rem" }}>
              <span><span className="legend-swatch" style={{ background: "#1565c0" }} /> New Users</span>
              <span><span className="legend-swatch" style={{ background: "var(--chart-1)" }} /> Donations</span>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3>By Category</h3>
            </div>
            <div style={{ width: "100%", height: 200 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={CATEGORY_DATA} dataKey="value" innerRadius={55} outerRadius={85} startAngle={90} endAngle={-270}>
                    {CATEGORY_DATA.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="legend-list">
              {CATEGORY_DATA.map((c) => (
                <li key={c.name}>
                  <span className="legend-label">
                    <span className="legend-swatch" style={{ background: c.color }} />
                    {c.name}
                  </span>
                  <span className="legend-value">{c.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="panel-grid" style={{ marginTop: "1.25rem" }}>
          <div className="panel">
            <div className="panel-header">
              <h3>Recent Users</h3>
              <button className="panel-link" onClick={() => onNavigate("users")}>
                Manage All
              </button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_USERS.map((user) => (
                  <tr key={user.userId}>
                    <td>
                      <div className="data-table-user-cell">
                        <img className="data-table-avatar" src={user.avatarUrl} alt={user.fullName} />
                        {user.fullName}
                      </div>
                    </td>
                    <td>{user.role}</td>
                    <td>{formatShortDate(user.joinedAt)}</td>
                    <td>
                      <span className={`badge badge--${STATUS_BADGE_MAP[user.status]}`}>
                        {user.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3>Recent Activity</h3>
            </div>
            {RECENT_ACTIVITY.map((event) => {
              const { icon: Icon, variant } = ACTIVITY_ICON_MAP[event.type] || {};
              return (
                <div className="list-item" key={event.activityId}>
                  <span className={`list-item-icon list-item-icon--${variant}`}>
                    {Icon && <Icon size={18} />}
                  </span>
                  <div className="list-item-body">
                    <p className="list-item-title">{event.title}</p>
                    <p className="list-item-sub">{event.subtitle}</p>
                  </div>
                  <span className="list-item-qty">{event.timeAgo}</span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}