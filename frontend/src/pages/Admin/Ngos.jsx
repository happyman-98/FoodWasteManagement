import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";

// Placeholder rows for GET /api/admin/ngos — swap this mock resolver
// for a real fetch() call. Shape: { id, name, location, status }.
const MOCK_NGOS = [
  { id: "n_1", name: "Helping Hands Trust", location: "Kathmandu", status: "active" },
  { id: "n_2", name: "Seva NGO", location: "Patan", status: "active" },
  { id: "n_3", name: "Bright Future Foundation", location: "Pokhara", status: "inactive" },
];

const TOTAL_NGOS_COUNT = 142; // from GET /api/admin/ngos/count

export default function Ngos({ onNavigate = () => {}, onLogout = () => {} }) {
  const [ngos, setNgos] = useState(null); // null = not yet loaded
  const [isLoading, setIsLoading] = useState(false);

  function handleLoadNgos() {
    setIsLoading(true);
    // Replace with: const data = await fetch("/api/admin/ngos").then(r => r.json());
    setTimeout(() => {
      setNgos(MOCK_NGOS);
      setIsLoading(false);
    }, 400);
  }

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" activeKey="ngos" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>NGOs</h1>
            <p>Manage all registered ngos on the platform.</p>
          </div>
        </div>

        {!ngos ? (
          <div className="empty-state-card">
            <span className="empty-state-icon">
              <ShieldCheck size={30} />
            </span>
            <p className="empty-state-text">
              Showing all verified ngos — {TOTAL_NGOS_COUNT} total
            </p>
            <button className="empty-state-button" onClick={handleLoadNgos} disabled={isLoading}>
              {isLoading ? "Loading..." : "Load NGOs List"}
            </button>
          </div>
        ) : (
          <div className="panel" style={{ padding: "1.5rem" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>NGO</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ngos.map((ngo) => (
                  <tr key={ngo.id}>
                    <td>{ngo.name}</td>
                    <td>{ngo.location}</td>
                    <td>
                      <span className={`badge badge--${ngo.status}`}>
                        {ngo.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
