import React from "react";
import { useNavigate } from "react-router-dom";
import { UtensilsCrossed, Sprout, Shirt, Trash2 } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useSavedDonations } from "../../hooks/useNgo";
import "../../styles/Dashboard.css";
import "../../styles/ngo-dashboard-shared.css";


const CATEGORY_ICON = {
  Food:     { icon: UtensilsCrossed, bg: "#dcf3de", color: "#2e7d32" },
  Vegetables: { icon: Sprout,        bg: "#dcf3de", color: "#2e7d32" },
  Clothing: { icon: Shirt,           bg: "#fbe7d4", color: "#e65100" },
};

export default function SavedDonations() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { saved, loading, error, remove, request } = useSavedDonations();

  const onNavigate = (key) => navigate(`/ngo/${key}`);
  const onLogout = async () => { await logout(); navigate("/login"); };

  return (
    <div className="dashboard-layout">
      <Sidebar role="ngo" activeKey="saved" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Saved Donations</h1>
            <p>Donations you bookmarked for later pickup.</p>
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        {loading ? (
          <p className="loading-text">Loading saved donations...</p>
        ) : saved.length === 0 ? (
          <div className="panel" style={{ textAlign: "center", color: "var(--muted-foreground)" }}>
            No saved donations yet.
          </div>
        ) : (
          saved.map((item) => {
            const iconData = CATEGORY_ICON[item.category] || CATEGORY_ICON["Food"];
            const Icon = iconData.icon;
            return (
              <div className="panel" style={{ padding: "0 1.5rem", marginBottom: "1rem" }} key={item._id}>
                <div className="request-row">
                  <span className="list-item-icon" style={{ background: iconData.bg, color: iconData.color }}>
                    <Icon size={18} />
                  </span>
                  <div className="list-item-body">
                    <p className="list-item-title" style={{ margin: 0 }}>{item.title}</p>
                    <p className="list-item-sub">
                      {item.donor?.name || "Unknown"} · {item.location}
                    </p>
                  </div>
                  <div className="list-item-trailing">
                    <button className="request-btn" onClick={() => request(item._id)}>
                      Request
                    </button>
                    <button
                      className="icon-btn icon-btn--danger"
                      aria-label="Remove from saved"
                      onClick={() => remove(item._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}