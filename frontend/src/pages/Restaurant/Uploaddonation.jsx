import React, { useState, useCallback, useRef } from "react";
import { Upload, X, ImagePlus } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";
import "../../styles/Farmer.css";

export default function UploadDonation({
  onSubmit = () => {},
  onNavigate = () => {},
  onLogout = () => {},
}) {
  const [form, setForm] = useState({
    foodName: "",
    quantityKg: "",
    availableFrom: "",
    pickupLocation: "",
    conditionNotes: "",
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
    setSuccess("");

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
      await onSubmit({
        foodName: form.foodName,
        quantityKg: form.quantityKg,
        availableFrom: form.availableFrom,
        pickupLocation: form.pickupLocation,
        conditionNotes: form.conditionNotes,
        photos,
      });

      setSuccess("Donation listing posted successfully!");
      setForm({
        foodName: "",
        quantityKg: "",
        availableFrom: "",
        pickupLocation: "",
        conditionNotes: "",
      });
      handleClearAllPhotos();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post donation. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="restaurant" activeKey="upload-donation" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Upload Surplus Food</h1>
            <p>Post your surplus food so nearby NGOs can request a pickup.</p>
          </div>
        </div>

        <div className="panel">
          <h3 className="form-panel-title form-panel-title--food">
            <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>+</span> New Food Donation
          </h3>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <div
            {...getRootProps()}
            className="upload-dropzone upload-dropzone--food"
            style={{
              cursor: "pointer",
              transition: "all 0.2s ease",
              ...(isDragActive
                ? {
                  borderColor: "#4caf50",
                  backgroundColor: "#f0f8f0",
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
                        alt={`Food preview ${index + 1}`}
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
                      border: isDragActive ? "2px dashed #4caf50" : "2px dashed #ccc",
                      transition: "all 0.2s",
                    }}
                  >
                    <ImagePlus size={24} style={{ color: "#4caf50", marginBottom: "8px" }} />
                    <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                      {isDragActive
                        ? "Drop images here"
                        : `Drag & drop more food photos (${photoPreviews.length}/5)`}
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
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                width: "100%"
              }}>
                <ImagePlus size={28} strokeWidth={1.5} style={{ marginBottom: "0.5rem" }} />
                <p style={{ margin: "0 0 0.25rem 0", fontSize: "var(--text-base)", color: "var(--foreground)", fontWeight: "var(--font-weight-normal)" }}>
                  {isDragActive ? "Drop your images here" : "Drag & drop images or click to browse"}
                </p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--muted-foreground)" }}>
                  PNG, JPG up to 10MB per image (max 5 images)
                </p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <label>Food Item Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="e.g. Biryani & Curry"
                  value={form.foodName}
                  onChange={handleChange("foodName")}
                  required
                />
              </div>
              <div className="form-field">
                <label>Quantity (kg)</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="e.g. 20"
                  value={form.quantityKg}
                  onChange={handleChange("quantityKg")}
                  required
                />
              </div>

              <div className="form-field">
                <label>Available Until</label>
                <input
                  className="form-input"
                  type="date"
                  value={form.availableFrom}
                  onChange={handleChange("availableFrom")}
                  required
                />
              </div>

              <div className="form-field form-field--full">
                <label>Pickup Location</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Full address for pickup"
                  value={form.pickupLocation}
                  onChange={handleChange("pickupLocation")}
                  required
                />
              </div>

              <div className="form-field form-field--full">
                <label>Condition Notes (optional)</label>
                <textarea
                  className="form-textarea"
                  placeholder="e.g. Freshly cooked, vegetarian, suitable for large groups..."
                  value={form.conditionNotes}
                  onChange={handleChange("conditionNotes")}
                />
              </div>
            </div>

            <button
              type="submit"
              className="form-submit-btn form-submit-btn--food"
              disabled={loading}
            >
              <Upload size={16} />
              {loading ? "Posting..." : "Post Donation Listing"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}