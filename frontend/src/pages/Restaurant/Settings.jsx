import React from "react";
import { Eye, Trash2, Plus } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";

/**
 * ---------------------------------------------------------------------------
 * BACKEND / API CONTRACT — Donation History (GET /api/restaurant/:id/donations)
 * ---------------------------------------------------------------------------
 * Suggested response shape:
 * {
 *   "restaurantName": "Spice Garden Restaurant",
 *   "donations": [
 *     {
 *       "id": "don_1001",                 // used as React key + for view/delete actions
 *       "itemName": "Dal & Rice",
 *       "quantityLabel": "40 pcs",
 *       "postedDate": "Jul 7",            // pre-formatted display string (format on backend or format client-side from an ISO date — either is fine, just be consistent)
 *       "claimedBy": "Seva NGO",           // null/"" if not yet claimed -> renders as "—"
 *       "status": "Active"                // one of: "Active" | "Picked Up" | "Delivered" | "Cancelled"
 *     }
 *   ]
 * }
 *
 * Actions:
 *  - `onViewDonation(id)`   — fires when the eye icon is clicked (open detail view/modal)
 *  - `onDeleteDonation(id)` — fires when the trash icon is clicked (should confirm, then DELETE /api/restaurant/donations/:id)
 *  - `onNewDonation()`      — fires when "+ New Donation" is clicked (typically routes to Upload Donation page)
 * ---------------------------------------------------------------------------
 */

const MOCK_DONATIONS = [
  { id: "don_1", itemName: "Dal & Rice", quantityLabel: "40 pcs", postedDate: "Jul 7", claimedBy: "Seva NGO", status: "Active" },
  { id: "don_2", itemName: "Sambar & Idli", quantityLabel: "25 pcs", postedDate: "Jul 5", claimedBy: "Helping Hands", status: "Picked Up" },
  { id: "don_3", itemName: "Chapati & Sabzi", quantityLabel: "30 pcs", postedDate: "Jul 3", claimedBy: "Bal Bhavan", status: "Delivered" },
  { id: "don_4", itemName: "Veg Biryani", quantityLabel: "50 pcs", postedDate: "Jul 1", claimedBy: "Seva NGO", status: "Delivered" },
  { id: "don_5", itemName: "Paneer Curry", quantityLabel: "20 pcs", postedDate: "Jun 28", claimedBy: null, status: "Cancelled" },
];

function badgeClass(status) {
  if (status === "Delivered" || status === "Active") return "badge badge--delivered";
  if (status === "Picked Up") return "badge badge--picked-up";
  if (status === "Cancelled") return "badge badge--cancelled";
  return "badge";
}

export default function DonationHistory({
  restaurantName = "Spice Garden Restaurant",
  donations = MOCK_DONATIONS,
  isLoading = false,
  onNavigate = () => {},
  onLogout = () => {},
  onNewDonation = () => {},
  onViewDonation = () => {},
  onDeleteDonation = () => {},
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar role="restaurant" activeKey="donation-history" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Donation History</h1>
            <p>All food donations posted by {restaurantName}.</p>
          </div>
          <button className="page-header-action" onClick={onNewDonation}>
            <Plus size={16} />
            New Donation
          </button>
        </div>

        <div className="panel">
          {isLoading ? (
            <p className="muted-text">Loading donation history…</p>
          ) : donations.length === 0 ? (
            <p className="muted-text">No donations posted yet.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Posted</th>
                  <th>Claimed By</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id}>
                    <td>{donation.itemName}</td>
                    <td>{donation.quantityLabel}</td>
                    <td>{donation.postedDate}</td>
                    <td>{donation.claimedBy || "—"}</td>
                    <td>
                      <span className={badgeClass(donation.status)}>{donation.status}</span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          type="button"
                          className="icon-btn"
                          aria-label={`View ${donation.itemName}`}
                          onClick={() => onViewDonation(donation.id)}
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          type="button"
                          className="icon-btn icon-btn--danger"
                          aria-label={`Delete ${donation.itemName}`}
                          onClick={() => onDeleteDonation(donation.id)}
                        >
                          <Trash2 size={17} />
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