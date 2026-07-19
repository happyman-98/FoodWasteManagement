// pages/restaurant/RestaurantDonationDetail.jsx
import React from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import DonationDetailView from "../../components/Donation/DonationDetailView";
export default function RestaurantDonationDetail({
  donationId,
  donations = [],
  isLoading = false,
  onNavigate = () => {},
  onLogout = () => {},
  onBack = () => {},
}) {
  const donation = donations.find((d) => d._id === donationId);

  return (
    <div className="dashboard-layout">
      <Sidebar role="restaurant" activeKey="donation-history" onNavigate={onNavigate} onLogout={onLogout} />
      <main className="dashboard-main">
        <DonationDetailView
          donation={donation}
          loading={isLoading}
          error={!isLoading && !donation ? "Donation not found." : ""}
          backLabel="Back to Donation History"
          onBack={onBack}
        />
      </main>
    </div>
  );
}