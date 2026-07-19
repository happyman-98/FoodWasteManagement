import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Tag, Package, ImageOff } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useDonations } from "../../hooks/useDonations";
import "../../styles/DonorPages.css";
import "../../styles/Dashboard.css";
import "../../styles/DonationDetail.css";

function badgeClass(status) {
  const map = {
    Delivered:  "badge badge--delivered",
    "Picked Up": "badge badge--picked-up",
    Pending:    "badge badge--pending",
    Cancelled:  "badge badge--cancelled",
    Active:     "badge badge--active",
  };
  return map[status] ?? "badge";
}

function ImageGrid({ images, title }) {
  if (!images?.length) {
    return (
      <div className="dd-no-image">
        <ImageOff size={40} />
        <span>No images uploaded</span>
      </div>
    );
  }

  const count = Math.min(images.length, 5);

  return (
    <div className="dd-image-grid" data-count={count}>
      {images.slice(0, count).map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${title} — photo ${i + 1}`}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
  );
}


export default function DonationDetail() {
  const { id } = useParams();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { donation, donationLoading, donationError } = useDonations(id);

  const onNavigate = (key) => navigate(`/doner/${key}`);
  const onLogout = async () => { await logout(); navigate("/login"); };

  const expires = donation?.expiresAt
    ? new Date(donation.expiresAt).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      })
    : "—";

  return (
    <div className="dashboard-layout">
      <Sidebar
        role="donor"
        activeKey="my-donations"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="dashboard-main">

        {/* ── Header ── */}
        <div className="page-header dd-header">
          <div>
            <button
              className="dd-back-btn"
              onClick={() => navigate("/doner/my-donations")}
            >
              <ArrowLeft size={15} />
              Back to My Donations
            </button>

            <h1 className="dd-title">
              {donationLoading ? "Loading…" : donation?.title || "Donation Details"}
            </h1>

            {donation && (
              <p className="dd-meta">
                #{donation._id.slice(-5).toUpperCase()} &middot; {donation.category}
              </p>
            )}
          </div>
        </div>

        {/* ── Error ── */}
        {donationError && (
          <p className="dd-error">{donationError}</p>
        )}

        {/* ── States ── */}
        {donationLoading ? (
          <div className="panel">
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "2rem" }}>
              <div className="dd-skeleton" style={{ height: 28, width: "55%" }} />
              <div className="dd-skeleton" style={{ height: 200 }} />
              <div className="dd-skeleton" style={{ height: 16, width: "80%" }} />
              <div className="dd-skeleton" style={{ height: 16, width: "65%" }} />
            </div>
          </div>
        ) : !donation ? (
          <p className="dd-empty">Donation not found.</p>
        ) : (
          /* ── Detail Panel ── */
          <div className="dd-panel">
            <div className="dd-body">

              {/* Left: Images */}
              <div className="dd-image-section">
                <ImageGrid images={donation.image} title={donation.title} />
              </div>

              {/* Right: Info */}
              <div className="dd-content-section">

                {/* Badges */}
                <div className="dd-badge-row">
                  <span className={badgeClass(donation.status)}>{donation.status}</span>
                  <span className="type-pill">{donation.tag}</span>
                </div>

                {/* Description */}
                <p className="dd-description">{donation.description}</p>

                {/* Stat cards */}
                <div className="dd-stat-grid">
                  <div className="dd-stat-card">
                    <div className="dd-stat-icon-val">
                      <Package size={15} />
                      {donation.quantity}
                    </div>
                    <div className="dd-stat-label">Quantity</div>
                  </div>

                  <div className="dd-stat-card">
                    <div className="dd-stat-icon-val">
                      <MapPin size={15} />
                      {donation.location}
                    </div>
                    <div className="dd-stat-label">Location</div>
                  </div>

                  <div className="dd-stat-card">
                    <div className="dd-stat-icon-val">
                      <Calendar size={15} />
                      {expires}
                    </div>
                    <div className="dd-stat-label">Expires</div>
                  </div>

                  <div className="dd-stat-card">
                    <div className="dd-stat-icon-val">
                      <Tag size={15} />
                      {donation.category}
                    </div>
                    <div className="dd-stat-label">Category</div>
                  </div>
                </div>

                {/* Claimed By */}
                {donation.claimedBy && (
                  <div className="dd-claimed-box">
                    <h3>Claimed by</h3>
                    <p>{donation.claimedBy.name || "—"}</p>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}