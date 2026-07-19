import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";
import "../../styles/Farmer.css";



const MOCK_LISTINGS = [
  { id: "lst_1", name: "Tomatoes", quantityLabel: "120 kg", availableLabel: "Available Jul 8", status: "Active", imageUrl: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=100&h=100&fit=crop" },
  { id: "lst_2", name: "Spinach", quantityLabel: "45 kg", availableLabel: "Available Jul 7", status: "Picked Up", imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop" },
  { id: "lst_3", name: "Brinjal", quantityLabel: "80 kg", availableLabel: "Available Jul 5", status: "Delivered", imageUrl: "https://images.unsplash.com/photo-1659261200833-ec8761558af7?w=100&h=100&fit=crop" },
];

function badgeClass(status) {
  if (status === "Delivered" || status === "Active") return "badge badge--delivered";
  if (status === "Picked Up") return "badge badge--picked-up";
  if (status === "Cancelled") return "badge badge--cancelled";
  return "badge";
}

export default function MyListings({
  farmName = "Green Acres Farm",
  listings = MOCK_LISTINGS,
  isLoading = false,
  onNavigate = () => {},
  onLogout = () => {},
  onNewListing = () => {},
  onDeleteListing = () => {},
  onUpdateListing = () => {},
}) {
  const [items, setItems] = useState(listings);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", quantityLabel: "", availableLabel: "" });

  // Re-sync local copy whenever the parent passes fresh data (e.g. after a
  // refetch, or to roll back an optimistic update that failed server-side).
  useEffect(() => {
    setItems(listings);
  }, [listings]);

  const handleNewListing = () => {
    onNewListing();
    onNavigate("upload-harvest");
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ name: item.name, quantityLabel: item.quantityLabel, availableLabel: item.availableLabel });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = (id) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...editForm } : it)));
    onUpdateListing(id, editForm);
    setEditingId(null);
  };

  const handleDelete = (id, name) => {
    if (typeof window !== "undefined" && !window.confirm(`Remove "${name}" from your listings?`)) {
      return;
    }
    setItems((prev) => prev.filter((it) => it.id !== id));
    onDeleteListing(id);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="farmer" activeKey="my-listings" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>My Listings</h1>
            <p>All produce listed from {farmName}.</p>
          </div>
          <button className="page-header-action" onClick={handleNewListing}>
            <Plus size={16} />
            New Listing
          </button>
        </div>

        {isLoading ? (
          <p className="muted-text">Loading listings…</p>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <p>No produce listed yet.</p>
            <button className="page-header-action" onClick={handleNewListing}>
              <Plus size={16} />
              New Listing
            </button>
          </div>
        ) : (
          <div className="listing-card-list">
            {items.map((item) => {
              const isEditing = editingId === item.id;
              return (
                <div className="listing-card" key={item.id}>
                  <img className="list-item-thumb" src={item.imageUrl} alt="" />

                  {isEditing ? (
                    <>
                      <div className="listing-edit-grid">
                        <input
                          value={editForm.name}
                          onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                          aria-label="Produce name"
                        />
                        <input
                          value={editForm.quantityLabel}
                          onChange={(e) => setEditForm((f) => ({ ...f, quantityLabel: e.target.value }))}
                          aria-label="Quantity"
                        />
                        <input
                          value={editForm.availableLabel}
                          onChange={(e) => setEditForm((f) => ({ ...f, availableLabel: e.target.value }))}
                          aria-label="Availability"
                        />
                      </div>
                      <div className="listing-card-actions">
                        <button
                          type="button"
                          className="icon-btn icon-btn--confirm"
                          aria-label="Save changes"
                          onClick={() => saveEdit(item.id)}
                        >
                          <Check size={18} />
                        </button>
                        <button
                          type="button"
                          className="icon-btn"
                          aria-label="Cancel editing"
                          onClick={cancelEdit}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="listing-card-body">
                        <p className="listing-card-title">{item.name}</p>
                        <p className="listing-card-sub">{item.quantityLabel} · {item.availableLabel}</p>
                      </div>
                      <div className="listing-card-trailing">
                        <span className={badgeClass(item.status)}>{item.status}</span>
                        <div className="listing-card-actions">
                          <button
                            type="button"
                            className="icon-btn"
                            aria-label={`Edit ${item.name}`}
                            onClick={() => startEdit(item)}
                          >
                            <Pencil size={17} />
                          </button>
                          <button
                            type="button"
                            className="icon-btn icon-btn--danger"
                            aria-label={`Delete ${item.name}`}
                            onClick={() => handleDelete(item.id, item.name)}
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
