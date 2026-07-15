import React, { useState } from "react";
import NgoOverview from "./NgoOverview";
import NgoDashboard from "./Ngodashboard"; // Browse Donations
import SavedDonations from "./SavedDonations";
import PickupRequests from "./PickupRequests";
import NgoSettings from "./NgoSettings";

/**
 * This is the missing piece that makes sidebar clicks actually switch pages.
 *
 * Each page component (NgoOverview, NgoDashboard, ...) is "dumb" — it just
 * calls onNavigate(key) when a sidebar link is clicked and has no idea what
 * happens next. This component is the one thing that's "smart": it keeps
 * track of which page key is currently active in state, and renders the
 * matching page. Every page's `activeKey` prop comes from here too, which
 * is how the sidebar highlights the right link.
 *
 * Swap the useState below for your router of choice (React Router, etc.)
 * later — onNavigate/activeKey are deliberately router-agnostic so that
 * swap doesn't touch any of the page components themselves.
 */

// Maps each sidebar `key` (see sidebarConfig.js) to the page component
// that should render when that key is active.
const NGO_PAGES = {
  overview: NgoOverview,
  "browse-donations": NgoDashboard,
  saved: SavedDonations,
  pickups: PickupRequests,
  settings: NgoSettings,
};

export default function NgoApp({ onLogout = () => {} }) {
  const [activePage, setActivePage] = useState("overview");

  const PageComponent = NGO_PAGES[activePage] ?? NgoOverview;

  return (
    <PageComponent
      onNavigate={setActivePage}
      onLogout={onLogout}
      // Backend callbacks (onRequestDonation, onSaveProfile, etc.) can be
      // passed through here too once they're wired to real API calls —
      // each page already accepts them as props.
    />
  );
}
