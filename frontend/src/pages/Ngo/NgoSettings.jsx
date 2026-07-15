import React, { useState } from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";

// Mirrors GET/PUT /api/ngo/profile
const DEFAULT_PROFILE = {
  ngoName: "Seva Humanitarian Trust",
  registrationNumber: "NGO-2024-0482",
  address: "14, CMH Road, Indiranagar, Bangalore 560038",
};

export default function NgoSettings({ onNavigate = () => {}, onLogout = () => {}, onSaveProfile = () => {} }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [isSaving, setIsSaving] = useState(false);

  function handleFieldChange(field, value) {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setIsSaving(true);
    // Replace with: await fetch("/api/ngo/profile", { method: "PUT", body: JSON.stringify(profile) });
    await onSaveProfile(profile);
    setIsSaving(false);
  }

  return (
    <div className="dashboard-layout">
      <Sidebar role="ngo" activeKey="settings" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Settings</h1>
            <p>Manage your NGO profile and notification preferences.</p>
          </div>
        </div>

        <div className="settings-card">
          <h3 style={{ margin: "0 0 1.25rem" }}>NGO Profile</h3>

          <div className="settings-grid">
            <div className="form-field">
              <label htmlFor="ngoName">NGO Name</label>
              <input
                id="ngoName"
                type="text"
                value={profile.ngoName}
                onChange={(e) => handleFieldChange("ngoName", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="registrationNumber">Registration No.</label>
              <input
                id="registrationNumber"
                type="text"
                value={profile.registrationNumber}
                onChange={(e) => handleFieldChange("registrationNumber", e.target.value)}
              />
            </div>
          </div>

          <div className="form-field" style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              value={profile.address}
              onChange={(e) => handleFieldChange("address", e.target.value)}
            />
          </div>

          <button className="settings-submit-btn" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </main>
    </div>
  );
}
