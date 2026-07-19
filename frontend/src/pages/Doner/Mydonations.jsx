import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Eye, Trash2, Plus } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useDonations } from "../../hooks/useDonations";
import "../../styles/animations.css";
import "../../styles/Dashboard.css";
import "../../styles/MyDonations.css";

function badgeClass(status) {
  if (status === "Delivered")  return "badge badge--delivered";
  if (status === "Picked Up")  return "badge badge--picked-up";
  if (status === "Pending")    return "badge badge--pending";
  if (status === "Cancelled")  return "badge badge--cancelled";
  if (status === "Active")     return "badge badge--active";
  return "badge";
}

export default function MyDonations() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { donations, loading, error, remove } = useDonations();
  const [query, setQuery] = useState("");

  const onNavigate = (key) => navigate(`/doner/${key}`);
  const onLogout = async () => { await logout(); navigate("/login"); };

  const filtered = donations.filter((d) =>
    d.title?.toLowerCase().includes(query.toLowerCase()) ||
    d._id?.toLowerCase().includes(query.toLowerCase())
  );

 const statBoxes = [
  { value: donations.length,                                                                          label: "All Time"   },
  { value: donations.filter(d => new Date(d.createdAt).getMonth() === new Date().getMonth()).length,  label: "This Month" },
  { value: donations.filter(d => d.status === "Pending").length,                                       label: "Pending", accent: true },
  { value: donations.filter(d => d.status === "Delivered").length,                                     label: "Delivered"  },
];

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
            <button className="header-action-btn header-action-btn--food" onClick={() => navigate("/doner/donate-food")}>
              <Plus size={16} /> Donate Food
            </button>
            <button className="header-action-btn header-action-btn--item" onClick={() => navigate("/doner/donate-items")}>
              <Plus size={16} /> Donate Item
            </button>
          </div>
        </div>

        <div className="stat-box-grid">
          {statBoxes.map((s) => (
            <div className="stat-box" key={s.label}>
              <div className={s.accent ? "stat-box-value stat-box-value--accent" : "stat-box-value"}>
                {loading ? "..." : s.value}
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

          {error && <p className="form-error">{error}</p>}

          {loading ? (
            <p className="loading-text">Loading your donations...</p>
          ) : filtered.length === 0 ? (
            <p className="empty-text">No donations found. Start by donating food or items!</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th><th>Donation</th><th>Date</th><th>Type</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row._id}>
                    <td>#{row._id.slice(-5).toUpperCase()}</td>
                    <td style={{ fontWeight: 600 }}>{row.title}</td>
                    <td>{new Date(row.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                    <td><span className="type-pill">{row.category}</span></td>
                    <td><span className={badgeClass(row.status)}>{row.status}</span></td>
                    <td>
                      <div className="table-actions">
                        <button className="table-icon-btn" 
                        aria-label="View"
                        onClick={() => navigate(`/doner/donations/${row._id}`)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="table-icon-btn table-icon-btn--danger"
                          aria-label="Delete"
                          onClick={() => remove(row._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}