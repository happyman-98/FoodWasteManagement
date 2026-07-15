import React, { useState } from "react";
import { Upload } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";
import "../../styles/DonorPages.css";

const CATEGORIES = ["Clothes", "Furniture", "Books", "Electronics", "Other"];
const CONDITIONS = ["Like New", "Good", "Fair", "Well Used"];

export default function DonateItems({ onNavigate = () => {}, onLogout = () => {} }) {
  const [form, setForm] = useState({
    itemName: "",
    category: "Clothes",
    quantity: 1,
    condition: "Like New",
    address: "",
    description: "",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook up to your donations API here.
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

          <label className="upload-dropzone upload-dropzone--item">
            <input type="file" accept="image/png, image/jpeg" multiple style={{ display: "none" }} />
            <Upload size={28} strokeWidth={2} />
            <span className="upload-dropzone-text">
              Upload item photos or <span className="upload-browse-link">browse</span>
            </span>
          </label>

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
                />
              </div>
              <div className="form-field">
                <label>Category</label>
                <select className="form-select" value={form.category} onChange={handleChange("category")}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
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
                  {CONDITIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
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

            <button type="submit" className="form-submit-btn form-submit-btn--item">
              <Upload size={16} /> Post Item Donation
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}