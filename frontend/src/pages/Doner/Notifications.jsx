import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Bell, Heart, AlertCircle, Users } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Dashboard.css";
import "../../styles/DonorPages.css";

export default function Notifications() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onNavigate = (key) => navigate(`/doner/${key}`);
  const onLogout = async () => { await logout(); navigate("/login"); };

  const INITIAL = [
    { id: 1, icon: CheckCircle2, iconBg: "#dcf3de", iconColor: "#2e7d32", text: `Welcome to ShareCycle, ${user?.name?.split(" ")[0] || "there"}! Start making a difference.`, time: "Just now", unread: true },
    { id: 2, icon: Bell,         iconBg: "#dbe9fb", iconColor: "#1565c0", text: "Complete your profile to get more visibility for your donations.",                            time: "1 hour ago",   unread: true  },
    { id: 3, icon: Heart,        iconBg: "#fbe7d4", iconColor: "#e65100", text: "Tip: Donations tagged 'Urgent' get picked up 3x faster!",                                    time: "1 day ago",    unread: false },
    { id: 4, icon: AlertCircle,  iconBg: "#fdf1cf", iconColor: "#a37a12", text: "Make sure to add a pickup address to every donation listing.",                               time: "2 days ago",   unread: false },
    { id: 5, icon: Users,        iconBg: "#ece4fb", iconColor: "#6a1b9a", text: "5 NGOs in your area are actively looking for food donations.",                               time: "3 days ago",   unread: false },
  ];

  const [notifications, setNotifications] = useState(INITIAL);

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