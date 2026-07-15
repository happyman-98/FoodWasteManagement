import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";
import "../../styles/Forms.css";

/**
 * ---------------------------------------------------------------------------
 * BACKEND / API CONTRACT — Upload Surplus Food (POST /api/restaurant/listings)
 * ---------------------------------------------------------------------------
 * All form state lives in this component. On submit, `onSubmit(payload)` is
 * called with a plain object — wire that up to your API call.
 *
 * payload shape (multipart/form-data recommended, since `images` is a
 * FileList):
 * {
 *   "foodItemName": "Biryani & Curry",       // text input
 *   "quantityPortions": 60,                  // number input, parsed as int
 *   "expiryDate": "2026-07-08",               // <input type="date"> value, ISO yyyy-mm-dd
 *   "expiryTime": "21:00",                    // <input type="time"> value, 24h HH:mm
 *   "pickupAddress": "12, 5th Cross, Koramangala 4th Block, Bangalore 560034",
 *   "additionalNotes": "Freshly cooked. Vegetarian. Suitable for large groups.",
 *   "images": File[]                          // 0+ image files, PNG/JPG, ≤10MB each (validate both client + server side)
 * }
 *
 * Suggested response: 201 Created with the created listing object
 * (same shape used in RestaurantDashboard / DonationHistory listings).
 * On validation error, return 4xx with { "field": "message" } so it can be
 * surfaced next to the right input — this component already has an
 * `errors` prop wired up for that (see below).
 * ---------------------------------------------------------------------------
 */

const EMPTY_FORM = {
  foodItemName: "",
  quantityPortions: "",
  expiryDate: "",
  expiryTime: "",
  pickupAddress: "",
  additionalNotes: "",
};

export default function UploadDonation({
  onSubmit = () => {},
  onNavigate = () => {},
  onLogout = () => {},
  isSubmitting = false,
  // Server-side validation errors keyed by field name, e.g. { foodItemName: "Required" }
  errors = {},
  // Set true briefly after a successful submit to show the confirmation banner.
  submitSuccess = false,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [images, setImages] = useState([]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files || []));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setImages(Array.from(e.dataTransfer.files || []));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      foodItemName: form.foodItemName,
      quantityPortions: Number(form.quantityPortions) || 0,
      expiryDate: form.expiryDate,
      expiryTime: form.expiryTime,
      pickupAddress: form.pickupAddress,
      additionalNotes: form.additionalNotes,
      images,
    });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="restaurant" activeKey="upload-donation" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Upload Surplus Food</h1>
            <p>Post your surplus food so nearby NGOs can request a pickup.</p>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          {submitSuccess && (
            <div className="form-success-banner">Donation listing posted successfully.</div>
          )}

          <label
            className="dropzone"
            htmlFor="food-images"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <UploadCloud size={28} className="dropzone-icon" />
            <span className="dropzone-title">
              Drop food images here or <b>browse</b>
            </span>
            <span className="dropzone-hint">PNG, JPG up to 10MB</span>
            <input id="food-images" type="file" accept="image/png,image/jpeg" multiple onChange={handleFileChange} />
            {images.length > 0 && (
              <div className="dropzone-preview-list">
                {images.map((file) => (
                  <span className="dropzone-preview-chip" key={file.name}>{file.name}</span>
                ))}
              </div>
            )}
          </label>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="foodItemName">Food Item Name</label>
              <input
                id="foodItemName"
                type="text"
                placeholder="e.g. Biryani & Curry"
                value={form.foodItemName}
                onChange={handleChange("foodItemName")}
                required
              />
              {errors.foodItemName && <span className="form-error-text">{errors.foodItemName}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="quantityPortions">Quantity (portions)</label>
              <input
                id="quantityPortions"
                type="number"
                min="1"
                placeholder="e.g. 60"
                value={form.quantityPortions}
                onChange={handleChange("quantityPortions")}
                required
              />
              {errors.quantityPortions && <span className="form-error-text">{errors.quantityPortions}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                id="expiryDate"
                type="date"
                value={form.expiryDate}
                onChange={handleChange("expiryDate")}
                required
              />
              {errors.expiryDate && <span className="form-error-text">{errors.expiryDate}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="expiryTime">Expiry Time</label>
              <input
                id="expiryTime"
                type="time"
                value={form.expiryTime}
                onChange={handleChange("expiryTime")}
                required
              />
              {errors.expiryTime && <span className="form-error-text">{errors.expiryTime}</span>}
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="pickupAddress">Pickup Address</label>
              <input
                id="pickupAddress"
                type="text"
                placeholder="e.g. 12, 5th Cross, Koramangala 4th Block, Bangalore 560034"
                value={form.pickupAddress}
                onChange={handleChange("pickupAddress")}
                required
              />
              {errors.pickupAddress && <span className="form-error-text">{errors.pickupAddress}</span>}
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="additionalNotes">Additional Notes</label>
              <textarea
                id="additionalNotes"
                placeholder="e.g. Freshly cooked. Vegetarian. Suitable for large groups."
                value={form.additionalNotes}
                onChange={handleChange("additionalNotes")}
              />
            </div>
          </div>

          <button type="submit" className="form-submit-btn form-submit-btn--full" disabled={isSubmitting}>
            <UploadCloud size={18} />
            {isSubmitting ? "Posting…" : "Post Donation Listing"}
          </button>
        </form>
      </main>
    </div>
  );
}