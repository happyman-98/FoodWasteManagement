import React, { useState } from "react";
import { Building2 } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";

// Placeholder rows for GET /api/admin/restaurants — swap this mock
// resolver for a real fetch() call. Shape: { id, name, location, status }.
const MOCK_RESTAURANTS = [
  { id: "r_1", name: "Spice Garden", location: "Kathmandu", status: "active" },
  { id: "r_2", name: "Taj Hotel Group", location: "Lalitpur", status: "active" },
  { id: "r_3", name: "Green Leaf Kitchen", location: "Bhaktapur", status: "inactive" },
];

const TOTAL_RESTAURANTS_COUNT = 142; // from GET /api/admin/restaurants/count

export default function Restaurants({ onNavigate = () => {}, onLogout = () => {} }) {
  const [restaurants, setRestaurants] = useState(null); // null = not yet loaded
  const [isLoading, setIsLoading] = useState(false);

  function handleLoadRestaurants() {
    setIsLoading(true);
    // Replace with: const data = await fetch("/api/admin/restaurants").then(r => r.json());
    setTimeout(() => {
      setRestaurants(MOCK_RESTAURANTS);
      setIsLoading(false);
    }, 400);
  }

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" activeKey="restaurants" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Restaurants</h1>
            <p>Manage all registered restaurants on the platform.</p>
          </div>
        </div>

        {!restaurants ? (
          <div className="empty-state-card">
            <span className="empty-state-icon">
              <Building2 size={30} />
            </span>
            <p className="empty-state-text">
              Showing all verified restaurants — {TOTAL_RESTAURANTS_COUNT} total
            </p>
            <button className="empty-state-button" onClick={handleLoadRestaurants} disabled={isLoading}>
              {isLoading ? "Loading..." : "Load Restaurants List"}
            </button>
          </div>
        ) : (
          <div className="panel" style={{ padding: "1.5rem" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Restaurant</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant) => (
                  <tr key={restaurant.id}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.location}</td>
                    <td>
                      <span className={`badge badge--${restaurant.status}`}>
                        {restaurant.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
