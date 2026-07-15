import React, { useState } from "react";
import { CheckCircle2, Bell, Heart, AlertCircle, Users } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";
import "../../styles/DonorPages.css";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    icon: CheckCircle2,
    iconBg: "#dcf3de",
    iconColor: "#2e7d32",
    text: "Your food donation 'Biryani & Curry' was picked up by Seva NGO.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    icon: Bell,
    iconBg: "#dbe9fb",
    iconColor: "#1565c0",
    text: "New pickup request from Helping Hands Trust for your vegetable listing.",
    time: "5 hours ago",
    unread: true,
  },
  {
    id: 3,
    icon: Heart,
    iconBg: "#fbe7d4",
    iconColor: "#e65100",
    text: "You helped 12 families this week. Your donations made a real difference!",
    time: "1 day ago",
    unread: true,
  },
  {
    id: 4,
    icon: AlertCircle,
    iconBg: "#fdf1cf",
    iconColor: "#a37a12",
    text: "Donation #D2371 (Engineering Books) expires in 24 hours. Consider extending or closing it.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 5,
    icon: CheckCircle2,
    iconBg: "#dcf3de",
    iconColor: "#2e7d32",
    text: "Your item donation 'Winter Jackets' was successfully delivered to Bal Bhavan NGO.",
    time: "3 days ago",
    unread: false,
  },
  {
    id: 6,
    icon: Users,
    iconBg: "#ece4fb",
    iconColor: "#6a1b9a",
    text: "Kavitha Reddy (NGO) saved your listing 'Organic Spinach 15kg'.",
    time: "4 days ago",
    unread: false,
  },
];

export default function Notifications({ onNavigate = () => {}, onLogout = () => {} }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <div className="dashboard-layout">
      <Sidebar role="donor" activeKey="notifications" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Notifications</h1>
            <p>Stay updated on your donations and community activity.</p>
          </div>
          <button className="mark-all-read-link" onClick={markAllRead}>
            Mark all read
          </button>
        </div>

        <div className="notif-list">
          {notifications.map((n) => (
            <div className="notif-row" key={n.id}>
              <span className="notif-icon" style={{ background: n.iconBg, color: n.iconColor }}>
                <n.icon size={18} />
              </span>
              <div className="notif-body">
                <p className="notif-text">{n.text}</p>
                <p className="notif-time">{n.time}</p>
              </div>
              {n.unread && <span className="notif-dot" />}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}