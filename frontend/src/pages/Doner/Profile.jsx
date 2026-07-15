import React, { useState } from "react";
import { Pencil, BadgeCheck } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";
import "../../styles/DonorPages.css";

export default function Profile({ onNavigate = () => {}, onLogout = () => {} }) {
  const [form, setForm] = useState({
    firstName: "Ananya",
    lastName: "Krishnan",
    email: "ananya.krishnan@email.com",
    phone: "+91 98765 43210",
    city: "Koramangala, Bangalore",
    bio: "Passionate about reducing food waste and giving reusable items a second life.",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    // Hook up to your profile-update API here.
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="donor" activeKey="profile" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>My Profile</h1>
            <p>Manage your personal details and account settings.</p>
          </div>
        </div>

        <div className="panel">
          <div className="profile-header-row">
            <div className="profile-avatar-wrap">
              <img className="profile-avatar" src="https://i.pravatar.cc/144?img=47" alt="" />
              <button className="profile-avatar-edit" aria-label="Edit photo">
                <Pencil size={12} />
              </button>
            </div>
            <div>
              <p className="profile-name">{form.firstName} {form.lastName}</p>
              <p className="profile-meta">Donor · Bangalore, India</p>
              <span className="profile-verified-badge">
                <BadgeCheck size={14} /> Verified Account
              </span>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="form-grid">
              <div className="form-field">
                <label>First Name</label>
                <input className="form-input" type="text" value={form.firstName} onChange={handleChange("firstName")} />
              </div>
              <div className="form-field">
                <label>Last Name</label>
                <input className="form-input" type="text" value={form.lastName} onChange={handleChange("lastName")} />
              </div>

              <div className="form-field form-field--full">
                <label>Email Address</label>
                <input className="form-input" type="email" value={form.email} onChange={handleChange("email")} />
              </div>

              <div className="form-field form-field--full">
                <label>Phone Number</label>
                <input className="form-input" type="tel" value={form.phone} onChange={handleChange("phone")} />
              </div>

              <div className="form-field form-field--full">
                <label>City / Area</label>
                <input className="form-input" type="text" value={form.city} onChange={handleChange("city")} />
              </div>

              <div className="form-field form-field--full">
                <label>Bio</label>
                <textarea className="form-textarea" value={form.bio} onChange={handleChange("bio")} />
              </div>
            </div>

            <div className="profile-actions">
              <button type="submit" className="btn-save">Save Changes</button>
              <button type="button" className="btn-cancel" onClick={() => onNavigate("dashboard")}>Cancel</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}