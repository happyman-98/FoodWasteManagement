import React, { useState } from "react";
import { Search, Eye, Trash2, Plus } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";
import "../../styles/DonorPages.css";

const STAT_BOXES = [
  { value: "82", label: "All Time", accent: false },
  { value: "18", label: "This Month", accent: false },
  { value: "3", label: "Pending", accent: true },
  { value: "67", label: "Delivered", accent: false },
];

const DONATIONS = [
  { id: "#D2401", donation: "Cooked Biryani – 40 portions", date: "Jul 6, 2026", type: "Food", status: "Delivered" },
  { id: "#D2398", donation: "Winter Jackets – 12 pcs", date: "Jul 4, 2026", type: "Clothes", status: "Picked Up" },
  { id: "#D2389", donation: "Organic Spinach – 15 kg", date: "Jun 30, 2026", type: "Vegetables", status: "Delivered" },
  { id: "#D2371", donation: "Engineering Books – 8 pcs", date: "Jun 25, 2026", type: "Books", status: "Pending" },
  { id: "#D2360", donation: "Office Chair – 1 unit", date: "Jun 20, 2026", type: "Furniture", status: "Cancelled" },
];

function badgeClass(status) {
  if (status === "Delivered") return "badge badge--delivered";
  if (status === "Picked Up") return "badge badge--picked-up";
  if (status === "Pending") return "badge badge--pending";
  if (status === "Cancelled") return "badge badge--cancelled";
  return "badge";
}

export default function MyDonations({ onNavigate = () => {}, onLogout = () => {} }) {
  const [query, setQuery] = useState("");

  const filtered = DONATIONS.filter((d) =>
    d.donation.toLowerCase().includes(query.toLowerCase()) ||
    d.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      <Sidebar role="donor" activeKey="my-donations" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>My Donations</h1>
            <p>Track the status of all your past and active donations.</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button className="header-action-btn header-action-btn--food" onClick={() => onNavigate("donate-food")}>
              <Plus size={16} /> Donate Food
            </button>
            <button className="header-action-btn header-action-btn--item" onClick={() => onNavigate("donate-items")}>
              <Plus size={16} /> Donate Item
            </button>
          </div>
        </div>

        <div className="stat-box-grid">
          {STAT_BOXES.map((s) => (
            <div className="stat-box" key={s.label}>
              <div className={s.accent ? "stat-box-value stat-box-value--accent" : "stat-box-value"}>
                {s.value}
              </div>
              <div className="stat-box-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="panel-header panel-header--with-search">
            <h3>All Donations</h3>
            <div className="panel-search-bar">
              <Search size={16} />
              <input
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Donation</th>
                <th>Date</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td style={{ fontWeight: 600 }}>{row.donation}</td>
                  <td>{row.date}</td>
                  <td><span className="type-pill">{row.type}</span></td>
                  <td><span className={badgeClass(row.status)}>{row.status}</span></td>
                  <td>
                    <div className="table-actions">
                      <button className="table-icon-btn" aria-label="View">
                        <Eye size={16} />
                      </button>
                      <button className="table-icon-btn table-icon-btn--danger" aria-label="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}