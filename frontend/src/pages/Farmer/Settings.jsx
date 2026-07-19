import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";
import "../../styles/Farmer.css";


const DEFAULT_PROFILE = {
  farmName: "Green Acres Farm",
  contactNumber: "+91 98765 22222",
  farmAddress: "Survey No. 42, Whitefield Road, Bangalore 560066",
};

export default function Settings({
  profile = DEFAULT_PROFILE,
  isLoading = false,
  isSaving = false,
  errors = {},
  onSave = () => {},
  onNavigate = () => {},
  onLogout = () => {},
}) {
  const [form, setForm] = useState(profile);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 3000);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="dashboard-layout">
      <Sidebar role="farmer" activeKey="settings" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Settings</h1>
            <p>Manage your farm profile and pickup preferences.</p>
          </div>
        </div>

        {isLoading ? (
          <p className="muted-text">Loading profile…</p>
        ) : (
          <form className="form-card" onSubmit={handleSubmit}>
            <h3 style={{ marginTop: 0, marginBottom: "1.25rem" }}>Farm Profile</h3>

            {justSaved && !hasErrors && (
              <div className="form-success-banner">Profile saved successfully.</div>
            )}

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="farmName">Farm Name</label>
                <input
                  id="farmName"
                  type="text"
                  value={form.farmName}
                  onChange={handleChange("farmName")}
                />
                {errors.farmName && <span className="form-error-text">{errors.farmName}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  id="contactNumber"
                  type="tel"
                  value={form.contactNumber}
                  onChange={handleChange("contactNumber")}
                />
                {errors.contactNumber && <span className="form-error-text">{errors.contactNumber}</span>}
              </div>

              <div className="form-field form-field--full">
                <label htmlFor="farmAddress">Farm Address</label>
                <input
                  id="farmAddress"
                  type="text"
                  value={form.farmAddress}
                  onChange={handleChange("farmAddress")}
                />
                {errors.farmAddress && <span className="form-error-text">{errors.farmAddress}</span>}
              </div>
            </div>

            <button type="submit" className="form-submit-btn" disabled={isSaving}>
              {isSaving ? "Saving…" : "Save Profile"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
