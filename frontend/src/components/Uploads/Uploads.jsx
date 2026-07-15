import React, { useState, useEffect, useCallback } from "react";
import { Package, MapPin, Clock, ArrowRight } from "lucide-react";
import { donations, formatTimeLeft, tagClass } from "./uploadsData";
import "./Uploads.css";

function DonationCard({ donation, requested, onRequest }) {
  const [timeLeft, setTimeLeft] = useState(() =>
    formatTimeLeft(donation.claimBy())
  );

  // Keep the "time left" label live without needing a page refresh.
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(formatTimeLeft(donation.claimBy()));
    }, 60000);
    return () => clearInterval(id);
  }, [donation]);

  return (
    <div className="up-card">
      <div className="up-media">
        <img src={donation.image} alt={donation.title} loading="lazy" />
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
          onClick={() => onRequest(donation.id)}
        >
          {requested ? "Requested" : "Request Donation"}
        </button>
      </div>
    </div>
  );
}

export default function Uploads({ onViewAll }) {
  const [requestedIds, setRequestedIds] = useState({});

  const handleRequest = useCallback((id) => {
    setRequestedIds((prev) => ({ ...prev, [id]: true }));
  }, []);

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

        <div className="up-grid">
          {donations.map((donation) => (
            <DonationCard
              key={donation.id}
              donation={donation}
              requested={!!requestedIds[donation.id]}
              onRequest={handleRequest}
            />
          ))}
        </div>
      </div>
    </section>
  );
}