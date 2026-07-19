import React, { useState } from "react";
import { Sprout, Truck, Building2 } from "lucide-react";
import FarmerDashboard from "./FarmerDashboard";
import UploadHarvest from "./UploadHarvest";
import MyListings from "./MyListings";
import Analytics from "./Analytics";
import Settings from "./Settings";
import { useDonations } from "../../hooks/useDonations";
import { useProfile } from "../../hooks/useProfile";
import { useAuth } from "../../context/AuthContext";

export default function FarmerPortal() {
  const [activeKey, setActiveKey] = useState("overview");
  const { logout } = useAuth();

  const { profile, loading: profileLoading, saving: profileSaving, save: saveProfile } = useProfile();
  const { donations, loading: donationsLoading, create, update, remove } = useDonations();

  const farmName = profile?.name || "Your Farm";
  const location = [profile?.city].filter(Boolean).join(", ");

  const handleNavigate = (key) => setActiveKey(key);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

 const handleCreateListing = async (payload) => {
  const formData = new FormData();
  formData.append("title", payload.produceName);
  formData.append("description", payload.conditionNotes || payload.produceName);
  formData.append("category", "Produce");
  formData.append("quantity", `${payload.quantityKg} kg`);
  formData.append("location", payload.pickupLocation);
  formData.append("expiresAt", new Date(`${payload.availableFrom}T23:59`).toISOString());
  formData.append("tag", "Available");

  payload.photos.forEach((photo) => formData.append("photo", photo));

  await create(formData);
  setActiveKey("my-listings");
};

  const handleDeleteListing = async (id) => {
    await remove(id);
  };

  const handleUpdateListing = async (id, updates) => {
    // NOTE: depends on PATCH /donations/:id existing on the backend.
    await update(id, {
      title: updates.name,
      quantity: parseInt(updates.quantityLabel),
      availableFrom: updates.availableLabel,
    });
  };

  const handleSaveProfile = async (updatedProfile) => {
    await saveProfile({
      name: updatedProfile.farmName,
      city: updatedProfile.farmAddress,
      phone: updatedProfile.contactNumber,
    });
  };

  const listingsForDisplay = donations.map((d) => ({
  id: d._id,
  name: d.title,
  quantityLabel: d.quantity,
  availableLabel: d.expiresAt
    ? `Listed until ${new Date(d.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
    : "",
  status: d.status || "Active",
  imageUrl: d.image?.[0] || "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop",
}));
// Add inside FarmerPortal, alongside listingsForDisplay

const totalKg = donations.reduce((sum, d) => {
  const match = d.quantity?.match(/[\d.]+/); // "120 kg" -> 120
  return sum + (match ? parseFloat(match[0]) : 0);
}, 0);

const pickupsDone = donations.filter((d) => d.status === "Picked Up" || d.status === "Delivered").length;

const ngosServed = new Set(
  donations.filter((d) => d.claimedBy).map((d) => d.claimedBy)
).size;

const realStats = [
  { key: "totalDonated", icon: Sprout, variant: "green", value: `${totalKg.toFixed(1)} kg`, label: "Total Donated" },
  { key: "pickupsDone", icon: Truck, variant: "green", value: String(pickupsDone), label: "Pickups Done" },
  { key: "ngosServed", icon: Building2, variant: "blue", value: String(ngosServed), label: "NGOs Served" },
];

const chartMap = {};
donations.forEach((d) => {
  const month = new Date(d.createdAt).toLocaleDateString("en-US", { month: "short" });
  const match = d.quantity?.match(/[\d.]+/);
  const kg = match ? parseFloat(match[0]) : 0;
  chartMap[month] = (chartMap[month] || 0) + kg;
});
const realChartData = Object.entries(chartMap).map(([month, kg]) => ({ month, kg }));

  const profileForSettings = {
    farmName,
    contactNumber: profile?.phone || "",
    farmAddress: profile?.city || "",
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
          farmName={farmName}
          listings={listingsForDisplay}
          isLoading={donationsLoading}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onDeleteListing={handleDeleteListing}
          onUpdateListing={handleUpdateListing}
        />
      );
   case "analytics":
  return (
    <Analytics
      stats={realStats}
      chartData={realChartData}
      isLoading={donationsLoading}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    />
  );
    case "settings":
      return (
        <Settings
          profile={profileForSettings}
          isLoading={profileLoading}
          isSaving={profileSaving}
          onSave={handleSaveProfile}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      );
    case "overview":
    default:
      return (
        <FarmerDashboard
          farmName={farmName}
          location={location}
          listings={listingsForDisplay.slice(0, 3)}
          isLoading={donationsLoading}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      );
  }
}