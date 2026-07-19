import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NgoOverview from "./NgoOverview";
import NgoDashboard from "./Ngodashboard";
import SavedDonations from "./SavedDonations";
import PickupRequests from "./PickupRequests";
import NgoSettings from "./NgoSettings";

export default function NgoApp() {
  return (
    <Routes>
      <Route path="overview"          element={<NgoOverview />} />
      <Route path="browse-donations"  element={<NgoDashboard />} />
      <Route path="saved"             element={<SavedDonations />} />
      <Route path="pickups"           element={<PickupRequests />} />
      <Route path="settings"          element={<NgoSettings />} />
      <Route path="*"                 element={<Navigate to="overview" replace />} />
    </Routes>
  );
}