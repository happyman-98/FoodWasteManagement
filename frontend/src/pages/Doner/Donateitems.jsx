import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X, ImagePlus } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Sidebar from "../../components/SideBar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { createDonation } from "../../api/donations";
import "../../styles/Dashboard.css";
import "../../styles/DonorPages.css";

// label = shown to user, value = must match backend Post schema enum exactly
const CATEGORY_OPTIONS = [
  { label: "Clothes", value: "Clothing" },
  { label: "Furniture", value: "Household Items" },
  { label: "Books", value: "Books" },
  { label: "Electronics", value: "Electronics" },
  { label: "Other", value: "Household Items" },
];
const CONDITIONS = ["Like New", "Good", "Fair", "Well Used"];

export default function DonateItems() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onNavigate = (key) => navigate(`/doner/${key}`);
  const onLogout = async () => { await logout(); navigate("/login"); };

  const [form, setForm] = useState({
    itemName: "",
    category: CATEGORY_OPTIONS[0].value, // "Clothing"
    quantity: 1,
    condition: "Like New",
    address: "",
    description: "",
  });

  const photosRef = useRef([]);
  const [photos, setPhotosState] = useState([]);
  const setPhotos = (updater) => {
    setPhotosState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      photosRef.current = next;
      return next;
    });
  };

  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError("");

    if (rejectedFiles.length > 0) {
      const code = rejectedFiles[0].errors[0]?.code;
      if (code === "file-too-large") setError("File size must be under 10MB per image");
      else if (code === "file-invalid-type") setError("Only PNG and JPG files are accepted");
      else setError("File upload rejected");
      return;
    }

    if (acceptedFiles.length > 0) {
      const currentCount = photosRef.current.length;
      if (currentCount >= 5) {
        setError("Maximum 5 photos allowed");
        return;
      }

      const availableSlots = 5 - currentCount;
      const filesToAdd = acceptedFiles.slice(0, availableSlots);

      setPhotos((prev) => [...prev, ...filesToAdd]);

      const newPreviews = filesToAdd.map((file) => ({
        id: Math.random(),
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
      }));
      setPhotoPreviews((prev) => [...prev, ...newPreviews]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    disabled: false,
  });

  const handleRemovePhoto = (id, index) => {
    const preview = photoPreviews[index];
    if (preview?.url) URL.revokeObjectURL(preview.url);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearAllPhotos = () => {
    photoPreviews.forEach((preview) => {
      if (preview?.url) URL.revokeObjectURL(preview.url);
    });
    setPhotos([]);
    setPhotoPreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.itemName);
      formData.append("description", `${form.description} | Condition: ${form.condition}`);
      formData.append("category", form.category); // now guaranteed to be a valid enum value
      formData.append("quantity", String(form.quantity));
      formData.append("location", form.address);
      formData.append("expiresAt", new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString());
      formData.append("tag", "Available");

      photos.forEach((photo) => {
        formData.append("photo", photo);
      });

      await createDonation(formData);

      setSuccess("Item donation posted successfully!");
      setForm({ itemName: "", category: CATEGORY_OPTIONS[0].value, quantity: 1, condition: "Like New", address: "", description: "" });
      handleClearAllPhotos();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post donation. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="donor" activeKey="donate-items" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Donate Used Items</h1>
            <p>Give clothes, furniture, books, or electronics a second life.</p>
          </div>
        </div>

        <div className="panel">
          <h3 className="form-panel-title form-panel-title--item">
            <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>+</span> New Item Donation
          </h3>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <div
            {...getRootProps()}
            className="upload-dropzone upload-dropzone--item"
            style={{
              cursor: "pointer",
              transition: "all 0.2s ease",
              ...(isDragActive
                ? {
                    borderColor: "#ff9800",
                    backgroundColor: "#fff3e0",
                    transform: "scale(1.02)",
                  }
                : {}),
              ...(photoPreviews.length > 0
                ? { padding: "12px", minHeight: "auto" }
                : {}),
            }}
          >
            <input {...getInputProps()} />

            {photoPreviews.length > 0 ? (
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                    gap: "12px",
                    marginBottom: "12px",
                  }}
                >
                  {photoPreviews.map((preview, index) => (
                    <div
                      key={preview.id}
                      style={{
                        position: "relative",
                        borderRadius: "8px",
                        overflow: "hidden",
                        backgroundColor: "#f5f5f5",
                        aspectRatio: "1 / 1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={preview.url}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemovePhoto(preview.id, index);
                        }}
                        aria-label="Remove photo"
                        style={{
                          position: "absolute",
                          top: "4px",
                          right: "4px",
                          background: "rgba(0, 0, 0, 0.6)",
                          border: "none",
                          color: "#fff",
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(0, 0, 0, 0.8)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(0, 0, 0, 0.6)";
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {photoPreviews.length < 5 && (
                  <div
                    style={{
                      padding: "16px",
                      textAlign: "center",
                      backgroundColor: "#fafafa",
                      borderRadius: "8px",
                      border: isDragActive ? "2px dashed #ff9800" : "2px dashed #ccc",
                      transition: "all 0.2s",
                    }}
                  >
                    <ImagePlus size={24} style={{ color: "#ff9800", marginBottom: "8px" }} />
                    <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                      {isDragActive
                        ? "Drop images here"
                        : `Drag & drop more images (${photoPreviews.length}/5)`}
                    </p>
                    <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#999" }}>
                      Click to add more photos
                    </p>
                  </div>
                )}

                {photoPreviews.length > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearAllPhotos();
                    }}
                    style={{
                      marginTop: "12px",
                      padding: "8px 16px",
                      backgroundColor: "#ffebee",
                      color: "#c62828",
                      border: "1px solid #ef5350",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffcdd2";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffebee";
                    }}
                  >
                    Clear All Photos
                  </button>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <Upload size={28} strokeWidth={2} />
                <span className="upload-dropzone-text">
                  {isDragActive
                    ? "Drop your images here"
                    : "Upload item photos or click to browse"}
                </span>
                <span className="upload-dropzone-hint">PNG, JPG up to 10MB per image (max 5 images)</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <label>Item Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="e.g. Winter Jacket, Study Table"
                  value={form.itemName}
                  onChange={handleChange("itemName")}
                  required
                />
              </div>
              <div className="form-field">
                <label>Category</label>
                <select className="form-select" value={form.category} onChange={handleChange("category")}>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c.label} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Quantity</label>
                <input
                  className="form-input"
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={handleChange("quantity")}
                />
              </div>
              <div className="form-field">
                <label>Condition</label>
                <select className="form-select" value={form.condition} onChange={handleChange("condition")}>
                  {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-field form-field--full">
                <label>Pickup Address</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Full address for pickup"
                  value={form.address}
                  onChange={handleChange("address")}
                  required
                />
              </div>

              <div className="form-field form-field--full">
                <label>Description</label>
                <textarea
                  className="form-textarea"
                  placeholder="Describe the item — size, colour, brand..."
                  value={form.description}
                  onChange={handleChange("description")}
                />
              </div>
            </div>

            <button
              type="submit"
              className="form-submit-btn form-submit-btn--item"
              disabled={loading}
            >
              <Upload size={16} />
              {loading ? "Posting..." : "Post Item Donation"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}