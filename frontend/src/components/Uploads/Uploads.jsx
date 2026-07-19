import React, { useState, useEffect, useCallback } from "react";
import { Package, MapPin, Clock, ArrowRight } from "lucide-react";
import { getFeaturedDonations } from "../../api/donations";
import { formatTimeLeft, tagClass } from "./uploadsData";
import "./Uploads.css";

// Neutral inline placeholder — used when a donation has no photos yet,
// so we don't depend on an external image URL that could break.
const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>
      <rect width='100%' height='100%' fill='#e5e7eb'/>
      <text x='50%' y='50%' font-family='sans-serif' font-size='20' fill='#9ca3af' text-anchor='middle' dy='.3em'>No photo available</text>
    </svg>`
  );

function DonationCard({ donation, requested, onRequest }) {
  const [timeLeft, setTimeLeft] = useState(() => formatTimeLeft(donation.expiresAt));

  // Keep the "time left" label live without needing a page refresh.
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(formatTimeLeft(donation.expiresAt));
    }, 60000);
    return () => clearInterval(id);
  }, [donation.expiresAt]);

  const cover = donation.image?.[0] || FALLBACK_IMAGE;

  return (
    <div className="up-card">
      <div className="up-media">
        <img src={cover} alt={donation.title} loading="lazy" />
        <span className={`up-tag ${tagClass(donation.tag)}`}>
          {donation.tag}
        </span>
        <span className="up-time">
          <Clock size={12} />
          {timeLeft}
        </span>
      </div>

      <div className="up-body">
        <p className="up-category">{donation.category}</p>
        <h3 className="up-card-title">{donation.title}</h3>

        <div className="up-meta">
          <span className="up-meta-item">
            <Package size={15} />
            {donation.quantity}
          </span>
          <span className="up-meta-item">
            <MapPin size={15} />
            {donation.location}
          </span>
        </div>

        <button
          type="button"
          className={`up-btn ${requested ? "up-btn--done" : ""}`}
          disabled={requested}
          onClick={() => onRequest(donation._id)}
        >
          {requested ? "Requested" : "Request Donation"}
        </button>
      </div>
    </div>
  );
}

export default function Uploads({ onViewAll }) {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestedIds, setRequestedIds] = useState({});

  useEffect(() => {
    getFeaturedDonations(8)
      .then((res) => setDonations(res.data?.donations || []))
      .catch(() => setDonations([])) // fail quietly on a public marketing page
      .finally(() => setLoading(false));
  }, []);

  const handleRequest = useCallback((id) => {
    setRequestedIds((prev) => ({ ...prev, [id]: true }));
  }, []);

  if (!loading && donations.length === 0) return null;

  return (
    <section className="up-section">
      <div className="up-container">
        <div className="up-header">
          <div>
            <p className="up-eyebrow">Latest</p>
            <h2 className="up-title">Featured Donations</h2>
          </div>
          <button type="button" className="up-view-all" onClick={onViewAll}>
            View All
            <ArrowRight size={16} />
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", padding: "2rem 0" }}>Loading donations…</p>
        ) : (
          <div className="up-grid">
            {donations.map((donation) => (
              <DonationCard
                key={donation._id}
                donation={donation}
                requested={!!requestedIds[donation._id]}
                onRequest={handleRequest}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}