import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { updateNgoProfile } from "../../api/ngo";
import "../../styles/Dashboard.css";
import "../../styles/ngo-dashboard-shared.css";


export default function NgoSettings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onNavigate = (key) => navigate(`/ngo/${key}`);
  const onLogout = async () => { await logout(); navigate("/login"); };

  const [profile, setProfile] = useState({
    name: "",
    ngoRegNumber: "",
    phone: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

 useEffect(() => {
  if (user) {
    setProfile({
      name: user.name || "",
      ngoRegNumber: user.licenseNumber || "",
      phone: user.phone || "",
      city: user.city || "",
    });
  }
}, [user]);

  const handleChange = (field) => (e) =>
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
const handleSave = async () => {
  setError("");
  setSuccess("");
  setLoading(true);
  try {
    await updateNgoProfile({ name: profile.name, phone: profile.phone, city: profile.city });
    setSuccess("Profile saved successfully!");
  } catch (err) {
    setError(err.response?.data?.message || "Failed to save profile.");
  } finally {
    setLoading(false);
  }
};

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

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <div className="settings-grid">
            <div className="form-field">
              <label>NGO Name</label>
              <input
                type="text"
                className="form-input"
                value={profile.name}
                onChange={handleChange("name")}
              />
            </div>
            <div className="form-field">
              <label>Registration No.</label>
              <input
                type="text"
                className="form-input form-input--disabled"
                value={profile.ngoRegNumber}
                disabled
              />
            </div>
          </div>

          <div className="form-field" style={{ marginBottom: "1rem" }}>
            <label>Phone</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={handleChange("phone")}
            />
          </div>

          <div className="form-field" style={{ marginBottom: "1.5rem" }}>
            <label>City / Address</label>
            <input
              type="text"
              value={profile.city}
              onChange={handleChange("city")}
            />
          </div>

          <button className="settings-submit-btn" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </main>
    </div>
  );
}