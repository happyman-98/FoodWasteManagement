import React, { useState } from "react";
import { Utensils, Truck, Building2 } from "lucide-react";
import RestaurantDashboard from "./RestaurantDashboard";
import UploadDonation from "./UploadDonation";
import DonationHistory from "./DonationHistory";
import RestaurantDonationDetail from "./RestaurantDonationDetail";
import Analytics from "./Analytics";
import RestaurantSettings from "./Settings";
import { useDonations } from "../../hooks/useDonations";
import { useProfile } from "../../hooks/useProfile";
import { useAuth } from "../../context/AuthContext";

export default function RestaurantPortal() {
  const [activeKey, setActiveKey] = useState("overview");
  const [viewingDonationId, setViewingDonationId] = useState(null);
  const { logout } = useAuth();

  const { profile, loading: profileLoading, saving: profileSaving, save: saveProfile } = useProfile();
  const { donations, loading: donationsLoading, create, update, remove } = useDonations();

  const restaurantName = profile?.name || "Your Restaurant";
  const location = [profile?.city].filter(Boolean).join(", ");

  const handleNavigate = (key) => setActiveKey(key);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  const handleCreateDonation = async (payload) => {
    const formData = new FormData();
    formData.append("title", payload.foodName);
    formData.append("description", payload.conditionNotes || payload.foodName);
    formData.append("category", "Food");
    formData.append("quantity", `${payload.quantityKg} kg`);
    formData.append("location", payload.pickupLocation);
    formData.append("expiresAt", new Date(`${payload.availableFrom}T23:59`).toISOString());
    formData.append("tag", "Available");

    payload.photos.forEach((photo) => formData.append("photo", photo));

    await create(formData);
    setActiveKey("donation-history");
  };

  const handleNewDonation = () => setActiveKey("upload-donation");

  const handleViewDonation = (id) => {
    setViewingDonationId(id);
    setActiveKey("donation-detail");
  };

  const handleDeleteDonation = async (id) => {
    await remove(id);
  };

  const handleUpdateDonation = async (id, updates) => {
    // NOTE: depends on PATCH /donations/:id existing on the backend.
    await update(id, {
      title: updates.name,
      quantity: parseInt(updates.quantityLabel),
      availableFrom: updates.availableLabel,
    });
  };

  const donationsForDisplay = donations.map((d) => ({
    id: d._id,
    itemName: d.title,
    quantityLabel: d.quantity,
    postedDate: d.createdAt
      ? new Date(d.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : "",
    claimedBy: d.claimedBy?.name || null,
    status: d.status || "Active",
    imageUrl: d.image?.[0] || "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop",
  }));

  const totalKg = donations.reduce((sum, d) => {
    const match = d.quantity?.match(/[\d.]+/); // "120 kg" -> 120
    return sum + (match ? parseFloat(match[0]) : 0);
  }, 0);

  const pickupsDone = donations.filter((d) => d.status === "Picked Up" || d.status === "Delivered").length;

  const ngosServed = new Set(
    donations.filter((d) => d.claimedBy).map((d) => d.claimedBy)
  ).size;

  const realStats = [
    { key: "totalDonated", icon: Utensils, variant: "green", value: `${totalKg.toFixed(1)} kg`, label: "Total Donated" },
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

  switch (activeKey) {
    case "upload-donation":
      return (
        <UploadDonation
          onSubmit={handleCreateDonation}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      );

    case "donation-history":
      return (
        <DonationHistory
          restaurantName={restaurantName}
          donations={donationsForDisplay}
          isLoading={donationsLoading}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onNewDonation={handleNewDonation}
          onViewDonation={handleViewDonation}
          onDeleteDonation={handleDeleteDonation}
          onUpdateDonation={handleUpdateDonation}
        />
      );

    case "donation-detail":
      return (
        <RestaurantDonationDetail
          donationId={viewingDonationId}
          donations={donations}
          isLoading={donationsLoading}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onBack={() => setActiveKey("donation-history")}
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
        <RestaurantSettings
          profile={profile}
          saving={profileSaving}
          onSave={saveProfile}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      );

    case "overview":
    default:
      return (
        <RestaurantDashboard
          restaurantName={restaurantName}
          location={location}
          donations={donationsForDisplay.slice(0, 3)}
          isLoading={donationsLoading}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      );
  }
}