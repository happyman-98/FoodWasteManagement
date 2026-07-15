import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";
import "../../styles/Forms.css";

/**
 * ---------------------------------------------------------------------------
 * BACKEND / API CONTRACT — Upload Harvest (POST /api/farmer/listings)
 * ---------------------------------------------------------------------------
 * payload passed to onSubmit(payload):
 * {
 *   "produceName": "Organic Tomatoes",
 *   "quantityKg": 100,                        // parsed to a number
 *   "availableFrom": "2026-07-09",             // <input type="date"> value, ISO yyyy-mm-dd
 *   "pickupLocation": "Survey No. 42, Whitefield Road, Bangalore",
 *   "conditionNotes": "Freshly harvested, pesticide-free. Can arrange crates.",
 *   "image": File | null                       // single image, PNG/JPG, validate size both sides
 * }
 *
 * Suggested response: 201 Created with the created listing (same shape as
 * the `listings` items used on the Overview and My Listings pages, i.e.
 * { id, name, quantityLabel, availableLabel, status, imageUrl }).
 * On validation errors, return { "field": "message" } — passed back in via
 * the `errors` prop to show inline under the right input.
 * ---------------------------------------------------------------------------
 *
 * This component shows a success banner and clears the form the moment
 * `onSubmit` is called, so it's immediately usable/demoable without any
 * backend wired up yet. If your real submit can fail, pass `errors` back in
 * on the next render and the banner won't show up if `errors` is non-empty.
 */

const EMPTY_FORM = {
  produceName: "",
  quantityKg: "",
  availableFrom: "",
  pickupLocation: "",
  conditionNotes: "",
};

export default function UploadHarvest({
  onSubmit = () => {},
  onNavigate = () => {},
  onLogout = () => {},
  isSubmitting = false,
  errors = {},
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [image, setImage] = useState(null);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files?.[0] || null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setImage(e.dataTransfer.files?.[0] || null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      produceName: form.produceName,
      quantityKg: Number(form.quantityKg) || 0,
      availableFrom: form.availableFrom,
      pickupLocation: form.pickupLocation,
      conditionNotes: form.conditionNotes,
      image,
    });

    // Give immediate visual feedback and reset the form, regardless of
    // whether a real backend call is wired in yet.
    setForm(EMPTY_FORM);
    setImage(null);
    setJustSubmitted(true);
    setTimeout(() => setJustSubmitted(false), 3000);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="dashboard-layout">
      <Sidebar role="farmer" activeKey="upload-harvest" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Upload Harvest</h1>
            <p>List your unsold produce so NGOs and families can collect it.</p>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          {justSubmitted && !hasErrors && (
            <div className="form-success-banner">Harvest listing posted successfully.</div>
          )}

          <label
            className="dropzone"
            htmlFor="harvest-image"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <UploadCloud size={28} className="dropzone-icon" />
            <span className="dropzone-title">
              Upload produce photo or <b>browse</b>
            </span>
            <input id="harvest-image" type="file" accept="image/png,image/jpeg" onChange={handleFileChange} />
            {image && (
              <div className="dropzone-preview-list">
                <span className="dropzone-preview-chip">{image.name}</span>
              </div>
            )}
          </label>

          <div className="form-grid">
            <div className="form-field form-field--full">
              <label htmlFor="produceName">Crop / Produce Name</label>
              <input
                id="produceName"
                type="text"
                placeholder="e.g. Organic Tomatoes"
                value={form.produceName}
                onChange={handleChange("produceName")}
                required
              />
              {errors.produceName && <span className="form-error-text">{errors.produceName}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="quantityKg">Quantity (kg)</label>
              <input
                id="quantityKg"
                type="number"
                min="1"
                placeholder="e.g. 100"
                value={form.quantityKg}
                onChange={handleChange("quantityKg")}
                required
              />
              {errors.quantityKg && <span className="form-error-text">{errors.quantityKg}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="availableFrom">Available From</label>
              <input
                id="availableFrom"
                type="date"
                value={form.availableFrom}
                onChange={handleChange("availableFrom")}
                required
              />
              {errors.availableFrom && <span className="form-error-text">{errors.availableFrom}</span>}
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="pickupLocation">Pickup Location</label>
              <input
                id="pickupLocation"
                type="text"
                placeholder="e.g. Survey No. 42, Whitefield Road, Bangalore"
                value={form.pickupLocation}
                onChange={handleChange("pickupLocation")}
                required
              />
              {errors.pickupLocation && <span className="form-error-text">{errors.pickupLocation}</span>}
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="conditionNotes">Condition / Notes</label>
              <textarea
                id="conditionNotes"
                placeholder="e.g. Freshly harvested, pesticide-free. Can arrange crates."
                value={form.conditionNotes}
                onChange={handleChange("conditionNotes")}
              />
            </div>
          </div>

          <button type="submit" className="form-submit-btn form-submit-btn--full" disabled={isSubmitting}>
            {isSubmitting ? "Posting…" : "Post Harvest Listing"}
          </button>
        </form>
      </main>
    </div>
  );
}
