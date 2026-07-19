import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";

export default function RestaurantSettings({
  profile = {},
  saving = false,
  onSave = async () => {},
  onNavigate = () => {},
  onLogout = () => {},
}) {
  const [form, setForm] = useState({
    name: "",
    licenseNumber: "",
    phone: "",
    city: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setForm({
      name: profile?.name || "",
      licenseNumber: profile?.licenseNumber || "",
      phone: profile?.phone || "",
      city: profile?.city || "",
    });
  }, [profile]);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = async () => {
    setError("");
    setSuccess("");
    try {
      await onSave({ name: form.name, phone: form.phone, city: form.city });
      setSuccess("Profile saved successfully!");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save profile.");
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="restaurant" activeKey="settings" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Settings</h1>
            <p>Manage your restaurant profile and notification preferences.</p>
          </div>
        </div>

        <div className="settings-card">
          <h3 style={{ margin: "0 0 1.25rem" }}>Restaurant Profile</h3>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <div className="settings-grid">
            <div className="form-field">
              <label>Restaurant Name</label>
              <input
                type="text"
                className="form-input"
                value={form.name}
                onChange={handleChange("name")}
              />
            </div>
            <div className="form-field">
              <label>License No.</label>
              <input
                type="text"
                className="form-input form-input--disabled"
                value={form.licenseNumber}
                disabled
              />
            </div>
          </div>

          <div className="form-field" style={{ marginBottom: "1rem" }}>
            <label>Phone</label>
            <input type="tel" className="form-input" value={form.phone} onChange={handleChange("phone")} />
          </div>

          <div className="form-field" style={{ marginBottom: "1.5rem" }}>
            <label>City / Address</label>
            <input type="text" className="form-input" value={form.city} onChange={handleChange("city")} />
          </div>

          <button className="settings-submit-btn" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </main>
    </div>
  );
}