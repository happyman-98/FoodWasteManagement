import React, { useState } from "react";
import { Upload } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";
import "../../styles/DonorPages.css";

export default function DonateFood({ onNavigate = () => {}, onLogout = () => {} }) {
  const [form, setForm] = useState({
    itemName: "",
    quantity: "",
    expiryDate: "",
    expiryTime: "",
    address: "",
    notes: "",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook up to your donations API here.
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="donor" activeKey="donate-food" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Donate Food</h1>
            <p>List surplus cooked food or packaged items for nearby NGOs to collect.</p>
          </div>
        </div>

        <div className="panel">
          <h3 className="form-panel-title form-panel-title--food">
            <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>+</span> New Food Donation
          </h3>

          <label className="upload-dropzone upload-dropzone--food">
            <input type="file" accept="image/png, image/jpeg" style={{ display: "none" }} />
            <Upload size={28} strokeWidth={2} />
            <span className="upload-dropzone-text">
              Drop food photo here or <span className="upload-browse-link">browse</span>
            </span>
            <span className="upload-dropzone-hint">PNG, JPG up to 10MB</span>
          </label>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <label>Food Item Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="e.g. Dal Rice, Biryani"
                  value={form.itemName}
                  onChange={handleChange("itemName")}
                />
              </div>
              <div className="form-field">
                <label>Quantity (portions)</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="e.g. 20"
                  value={form.quantity}
                  onChange={handleChange("quantity")}
                />
              </div>

              <div className="form-field">
                <label>Expiry Date</label>
                <input
                  className="form-input"
                  type="date"
                  value={form.expiryDate}
                  onChange={handleChange("expiryDate")}
                />
              </div>
              <div className="form-field">
                <label>Expiry Time</label>
                <input
                  className="form-input"
                  type="time"
                  value={form.expiryTime}
                  onChange={handleChange("expiryTime")}
                />
              </div>

              <div className="form-field form-field--full">
                <label>Pickup Address</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Full address for pickup"
                  value={form.address}
                  onChange={handleChange("address")}
                />
              </div>

              <div className="form-field form-field--full">
                <label>Notes (optional)</label>
                <textarea
                  className="form-textarea"
                  placeholder="e.g. Vegetarian, freshly cooked, contains nuts..."
                  value={form.notes}
                  onChange={handleChange("notes")}
                />
              </div>
            </div>

            <button type="submit" className="form-submit-btn form-submit-btn--food">
              <Upload size={16} /> Post Food Donation
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}