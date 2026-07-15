import React, { useState } from "react";
import { UtensilsCrossed, Sprout, Shirt, Trash2 } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";

/**
 * Mirrors GET /api/ngo/saved-donations
 * `icon`/`iconBg`/`iconColor` are resolved from `category` via
 * CATEGORY_ICON_MAP below — the API only needs to send `category`,
 * never presentation details.
 */
const SAVED_DONATIONS = [
  { savedId: "sav_1", donationId: "don_9001", title: "Basmati Rice – 80 kg", donorName: "Spice Garden Restaurant", distanceKm: 2.1, category: "food" },
  { savedId: "sav_2", donationId: "don_9002", title: "Mixed Vegetables – 25 kg", donorName: "Green Acres Farm", distanceKm: 4.5, category: "vegetables" },
  { savedId: "sav_3", donationId: "don_9003", title: "Men's Casual Wear – 30 pcs", donorName: "Ravi Kumar", distanceKm: 1.8, category: "clothes" },
];

const CATEGORY_ICON_MAP = {
  food: { icon: UtensilsCrossed, bg: "#dcf3de", color: "#2e7d32" },
  vegetables: { icon: Sprout, bg: "#dcf3de", color: "#2e7d32" },
  clothes: { icon: Shirt, bg: "#fbe7d4", color: "#e65100" },
};

export default function SavedDonations({
  onNavigate = () => {},
  onLogout = () => {},
  onRequestDonation = () => {},
  onRemoveSaved = () => {},
}) {
  const [savedDonations, setSavedDonations] = useState(SAVED_DONATIONS);

  function handleRemove(savedId) {
    // Replace with: await fetch(`/api/ngo/saved-donations/${savedId}`, { method: "DELETE" });
    setSavedDonations((prev) => prev.filter((item) => item.savedId !== savedId));
    onRemoveSaved(savedId);
  }

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

        {savedDonations.map((item) => {
          const { icon: Icon, bg, color } = CATEGORY_ICON_MAP[item.category] || {};
          return (
            <div className="panel" style={{ padding: "0 1.5rem", marginBottom: "1rem" }} key={item.savedId}>
              <div className="request-row">
                <span className="list-item-icon" style={{ background: bg, color }}>
                  {Icon && <Icon size={18} />}
                </span>
                <div className="list-item-body">
                  <p className="list-item-title" style={{ margin: 0 }}>{item.title}</p>
                  <p className="list-item-sub">
                    {item.donorName} · {item.distanceKm} km away
                  </p>
                </div>
                <div className="list-item-trailing">
                  <button className="request-btn" onClick={() => onRequestDonation(item.donationId)}>
                    Request
                  </button>
                  <button
                    className="icon-btn icon-btn--danger"
                    aria-label="Remove from saved"
                    onClick={() => handleRemove(item.savedId)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {savedDonations.length === 0 && (
          <div className="panel" style={{ textAlign: "center", color: "var(--muted-foreground)" }}>
            No saved donations yet.
          </div>
        )}
      </main>
    </div>
  );
}
