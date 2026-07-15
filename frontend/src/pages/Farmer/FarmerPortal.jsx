import React, { useState } from "react";
import FarmerDashboard from "./FarmerDashboard";
import UploadHarvest from "./UploadHarvest";
import MyListings from "./MyListings";
import Analytics from "./Analytics";
import Settings from "./Settings";

/**
 * ---------------------------------------------------------------------------
 * FarmerPortal — a working reference implementation
 * ---------------------------------------------------------------------------
 * The five page components (FarmerDashboard, UploadHarvest, MyListings,
 * Analytics, Settings) are pure — they take data via props and report
 * actions via callbacks, so a real app can wire them to an API however it
 * likes. This file is that wiring, done with local React state instead of
 * a backend, so the whole portal is clickable and fully working immediately:
 * navigating between pages, posting a new harvest, editing/deleting a
 * listing, and saving the farm profile all actually do something here.
 *
 * TO CONNECT A REAL BACKEND: replace the useState calls below with data
 * fetched from your API (e.g. in a useEffect / React Query), and replace
 * each handler's local state update with the matching API call (the
 * shape of every request/response is documented at the top of each page
 * component). You can keep the local state update too, as an optimistic
 * update — MyListings already does this internally.
 * ---------------------------------------------------------------------------
 */

const INITIAL_LISTINGS = [
  { id: "lst_1", name: "Tomatoes", quantityLabel: "120 kg", availableLabel: "Available Jul 8", status: "Active", imageUrl: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=100&h=100&fit=crop" },
  { id: "lst_2", name: "Spinach", quantityLabel: "45 kg", availableLabel: "Available Jul 7", status: "Picked Up", imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop" },
  { id: "lst_3", name: "Brinjal", quantityLabel: "80 kg", availableLabel: "Available Jul 5", status: "Delivered", imageUrl: "https://images.unsplash.com/photo-1659261200833-ec8761558af7?w=100&h=100&fit=crop" },
];

const INITIAL_PROFILE = {
  farmName: "Green Acres Farm",
  contactNumber: "+91 98765 22222",
  farmAddress: "Survey No. 42, Whitefield Road, Bangalore 560066",
};

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop";

function formatDateLabel(isoDate) {
  if (!isoDate) return "Available date TBD";
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "Available date TBD";
  return `Available ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

export default function FarmerPortal() {
  const [activeKey, setActiveKey] = useState("overview");
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [profile, setProfile] = useState(INITIAL_PROFILE);

  const handleNavigate = (key) => setActiveKey(key);

  const handleLogout = () => {
    // Real app: clear auth session/token and redirect to login.
    window.alert("Logged out.");
  };

  const handleCreateListing = (payload) => {
    const newListing = {
      id: `lst_${Date.now()}`,
      name: payload.produceName,
      quantityLabel: `${payload.quantityKg} kg`,
      availableLabel: formatDateLabel(payload.availableFrom),
      status: "Active",
      imageUrl: PLACEHOLDER_IMAGE,
    };
    setListings((prev) => [newListing, ...prev]);
    // Jump over to My Listings so the farmer immediately sees it was posted.
    setActiveKey("my-listings");
  };

  const handleDeleteListing = (id) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateListing = (id, updates) => {
    setListings((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const handleSaveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  switch (activeKey) {
    case "upload-harvest":
      return (
        <UploadHarvest
          onSubmit={handleCreateListing}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      );
    case "my-listings":
      return (
        <MyListings
          farmName={profile.farmName}
          listings={listings}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onDeleteListing={handleDeleteListing}
          onUpdateListing={handleUpdateListing}
        />
      );
    case "analytics":
      return <Analytics onNavigate={handleNavigate} onLogout={handleLogout} />;
    case "settings":
      return (
        <Settings
          profile={profile}
          onSave={handleSaveProfile}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      );
    case "overview":
    default:
      return (
        <FarmerDashboard
          farmName={profile.farmName}
          listings={listings.slice(0, 3)}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      );
  }
}
