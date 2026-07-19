import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UtensilsCrossed, Sprout, Shirt, BookOpen, Heart, Package } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useBrowseDonations } from "../../hooks/useNgo";
import "../../styles/Dashboard.css";
import "../../styles/ngo-dashboard-shared.css";


const FILTERS = ["All", "Food", "Vegetables", "Clothing", "Books", "Electronics"];

const CATEGORY_ICON = {
  Food:        { icon: UtensilsCrossed, bg: "#dcf3de", color: "#2e7d32" },
  Vegetables:  { icon: Sprout,          bg: "#dcf3de", color: "#2e7d32" },
  Clothing:    { icon: Shirt,           bg: "#fbe7d4", color: "#e65100" },
  Books:       { icon: BookOpen,        bg: "#dbe9fb", color: "#1565c0" },
  Electronics: { icon: Package,         bg: "#ece4fb", color: "#6a1b9a" },
};

export default function NgoDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const { donations, savedIds, loading, error, toggleSave, request } = useBrowseDonations(activeFilter);

  const onNavigate = (key) => navigate(`/ngo/${key}`);
  const onLogout = async () => { await logout(); navigate("/login"); };

  const filtered = donations.filter((d) =>
    d.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      <Sidebar role="ngo" activeKey="browse-donations" onNavigate={onNavigate} onLogout={onLogout} />

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
              <input
                placeholder="Search donations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
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

          {error && <p className="form-error">{error}</p>}

          {loading ? (
            <p className="loading-text">Loading donations...</p>
          ) : filtered.length === 0 ? (
            <p className="empty-text">No donations found.</p>
          ) : (
            filtered.map((item) => {
              const iconData = CATEGORY_ICON[item.category] || CATEGORY_ICON["Food"];
              const Icon = iconData.icon;
              const isSaved = savedIds.has(item._id);
              return (
                <div className="request-row" key={item._id}>
                  <span className="list-item-icon" style={{ background: iconData.bg, color: iconData.color }}>
                    <Icon size={18} />
                  </span>
                  <div className="list-item-body">
                    <div className="request-title-row">
                      <p className="list-item-title" style={{ margin: 0 }}>{item.title}</p>
                      {item.tag === "Urgent" && <span className="badge badge--urgent">URGENT</span>}
                    </div>
                    <p className="list-item-sub">
                      {item.donor?.name || "Unknown"} · {item.location}
                    </p>
                  </div>
                  <div className="list-item-trailing">
                    <button
                      className="icon-btn"
                      aria-label={isSaved ? "Remove from saved" : "Save"}
                      onClick={() => toggleSave(item._id)}
                      style={isSaved ? { color: "#e53935" } : undefined}
                    >
                      <Heart size={20} fill={isSaved ? "#e53935" : "none"} />
                    </button>
                    <button className="request-btn" onClick={() => request(item._id)}>
                      Request
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}