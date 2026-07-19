import React, { useState, useEffect ,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, BadgeCheck } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../api/donations";
import "../../styles/animations.css";
import "../../styles/Dashboard.css";
import "../../styles/Profile.css";
import {uploadAvatar} from "../../api/donations";

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const onNavigate = (key) => navigate(`/doner/${key}`);
  const onLogout = async () => { await logout(); navigate("/login"); };
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Image must be smaller than ${maxSizeMB}MB.`);
      return;
    }

    setError("");
    setSuccess("");
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarUploading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

  const response = await uploadAvatar(formData);
const newAvatarUrl = response?.data?.avatar;// response.data IS the user object

      if (newAvatarUrl) {
  const updatedUser = { ...user, avatar: newAvatarUrl };
  console.log("Updating user with:", updatedUser); 
  updateUser(updatedUser);
  setSuccess("Profile photo updated!");
}
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload photo.");
      setAvatarPreview(null);
    } finally {
      setAvatarUploading(false);
      e.target.value = "";
    }
  };
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        city: user.address?.city || user.location?.city || user.city || "",
      });
    }
  }, [user]);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await updateProfile({
        name: form.name,
        phone: form.phone,
        city: form.city
      });

      const updatedUserData = {
        ...user,
        name: form.name,
        phone: form.phone,
        city: form.city,
        address: { ...user?.address, city: form.city },
        location: { ...user?.location, city: form.city }
      };

      if (updateUser) {
        updateUser(updatedUserData);
      } else if (response?.data?.user) {
        updateUser(response.data.user);
      }

      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const nameParts = form.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

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
              <img
                className="profile-avatar"
                src={avatarPreview || user?.avatar || "https://i.pravatar.cc/144?img=4"}
                alt=""
              />
              <button
                type="button"
                className="profile-avatar-edit"
                aria-label="Edit photo"
                onClick={handleAvatarClick}
                disabled={avatarUploading}
              >
                <Pencil size={12} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/webp"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </div>
            <div>
              <p className="profile-name">{form.name}</p>
              <p className="profile-meta">
                Donor · {form.city || "Location not set"}
                {avatarUploading && " · Uploading photo..."}
              </p>
              <span className="profile-verified-badge">
                <BadgeCheck size={14} /> Verified Account
              </span>
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <form onSubmit={handleSave}>
            <div className="form-grid">
              <div className="form-field">
                <label>First Name</label>
                <input
                  className="form-input"
                  type="text"
                  value={firstName}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: `${e.target.value} ${lastName}`.trim() }))
                  }
                />
              </div>
              <div className="form-field">
                <label>Last Name</label>
                <input
                  className="form-input"
                  type="text"
                  value={lastName}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: `${firstName} ${e.target.value}`.trim() }))
                  }
                />
              </div>

              <div className="form-field form-field--full">
                <label>Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  value={form.email}
                  disabled
                  style={{ opacity: 0.6, cursor: "not-allowed" }}
                />
              </div>

              <div className="form-field form-field--full">
                <label>Phone Number</label>
                <input
                  className="form-input"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                />
              </div>

              <div className="form-field form-field--full">
                <label>City / Area</label>
                <input
                  className="form-input"
                  type="text"
                  value={form.city}
                  onChange={handleChange("city")}
                  placeholder="e.g. Koramangala, Bangalore"
                />
              </div>
            </div>

            <div className="profile-actions">
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button type="button" className="btn-cancel" onClick={() => navigate("/doner/dashboard")}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}