import React, { useState } from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";

// Mirrors GET/PUT /api/admin/settings — a flat key/value object is enough
// for this form; add fields here as the settings surface grows.
const DEFAULT_SETTINGS = {
  platformName: "ShareCycle",
  supportEmail: "support@sharecycle.org",
};

export default function Settings({ onNavigate = () => {}, onLogout = () => {}, onSaveSettings = () => {} }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);

  function handleFieldChange(field, value) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setIsSaving(true);
    // Replace with: await fetch("/api/admin/settings", { method: "PUT", body: JSON.stringify(settings) });
    await onSaveSettings(settings);
    setIsSaving(false);
  }

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" activeKey="settings" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Platform Settings</h1>
            <p>Configure global platform settings and policies.</p>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-grid">
            <div className="form-field">
              <label htmlFor="platformName">Platform Name</label>
              <input
                id="platformName"
                type="text"
                value={settings.platformName}
                onChange={(e) => handleFieldChange("platformName", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="supportEmail">Support Email</label>
              <input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleFieldChange("supportEmail", e.target.value)}
              />
            </div>
          </div>
          <button className="settings-submit-btn" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </main>
    </div>
  );
}
