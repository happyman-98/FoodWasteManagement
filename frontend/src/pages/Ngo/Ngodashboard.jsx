import React, { useState } from "react";
import { Search, UtensilsCrossed, Sprout, Shirt, BookOpen, Heart } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import { useSidebarNavigation } from "../../hooks/useSidebarNavigation";
import "../../styles/Dashboard.css";

const FILTERS = ["All", "Food", "Vegetables", "Clothes", "Books", "Electronics"];

const LISTINGS = [
  { name: "Basmati Rice – 80 kg", by: "Spice Garden Restaurant", distance: "2.1 km away", urgent: true, icon: UtensilsCrossed, iconBg: "#dcf3de", iconColor: "#2e7d32" },
  { name: "Mixed Vegetables – 25 kg", by: "Green Acres Farm", distance: "4.5 km away", urgent: false, icon: Sprout, iconBg: "#dcf3de", iconColor: "#2e7d32" },
  { name: "Men's Casual Wear – 30 pcs", by: "Ravi Kumar", distance: "1.8 km away", urgent: false, icon: Shirt, iconBg: "#fbe7d4", iconColor: "#e65100" },
  { name: "Baby Clothes Bundle", by: "Meena Iyer", distance: "3.2 km away", urgent: true, icon: Shirt, iconBg: "#fbe7d4", iconColor: "#e65100" },
  { name: "Python Programming Books", by: "Techno College", distance: "6.0 km away", urgent: false, icon: BookOpen, iconBg: "#fbe7d4", iconColor: "#1565c0" },
];

export default function NgoDashboard() {
  const { activeKey, onNavigate, onLogout } = useSidebarNavigation("ngo");
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="dashboard-layout">
      <Sidebar role="ngo" activeKey={activeKey} onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Browse Donations</h1>
            <p>Find and request available food and item donations near you.</p>
          </div>
        </div>

        <div className="panel">
          <div className="filter-bar">
            <div className="search-bar">
              <Search size={18} />
              <input placeholder="Search donations..." />
            </div>
            <div className="filter-pills">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  className={`filter-pill${f === activeFilter ? " filter-pill--active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {LISTINGS.map((item) => (
            <div className="request-row" key={item.name}>
              <span className="list-item-icon" style={{ background: item.iconBg, color: item.iconColor }}>
                <item.icon size={18} />
              </span>
              <div className="list-item-body">
                <div className="request-title-row">
                  <p className="list-item-title" style={{ margin: 0 }}>{item.name}</p>
                  {item.urgent && <span className="badge badge--urgent">URGENT</span>}
                </div>
                <p className="list-item-sub">{item.by} · {item.distance}</p>
              </div>
              <div className="list-item-trailing">
                <button className="icon-btn" aria-label="Save">
                  <Heart size={20} />
                </button>
                <button className="request-btn">Request</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}