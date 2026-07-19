import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  UtensilsCrossed,
  Wheat,
  Shirt,
  Sofa,
  BookOpen,
  Smartphone,
} from "lucide-react";
import "./Donation.css";

const categories = [
  {
    key: "food",
    icon: UtensilsCrossed,
    title: "Surplus Food",
    count: "2,340 items",
    modifier: "don-card--food",
  },
  {
    key: "veg",
    icon: Wheat,
    title: "Fresh Vegetables",
    count: "1,820 items",
    modifier: "don-card--veg",
  },
  {
    key: "clothes",
    icon: Shirt,
    title: "Clothes",
    count: "4,120 items",
    modifier: "don-card--clothes",
  },
  {
    key: "furniture",
    icon: Sofa,
    title: "Furniture",
    count: "680 items",
    modifier: "don-card--furniture",
  },
  {
    key: "books",
    icon: BookOpen,
    title: "Books",
    count: "3,290 items",
    modifier: "don-card--books",
  },
  {
    key: "electronics",
    icon: Smartphone,
    title: "Electronics",
    count: "920 items",
    modifier: "don-card--electronics",
  },
];

export default function Donation() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleRequestDonation = (categoryKey) => {
    if (!user) {
      // No account yet — send them to login (which links to Sign Up too)
      navigate("/login");
      return;
    }

    // Logged in — proceed with the actual request flow
    navigate(`/doner/donations/${categoryKey}`);
  };

  return (
    <section className="don-section">
      <div className="don-container">
        <div className="don-header">
          <p className="don-eyebrow">Browse</p>
          <h2 className="don-title">Donation Categories</h2>
          <p className="don-subtitle">
            From fresh food to reusable everyday items — every category helps
            someone in need.
          </p>
        </div>

        <div className="don-grid">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.key} className={`don-card ${cat.modifier}`}>
                <div className="don-icon-wrap">
                  <Icon size={26} strokeWidth={2} />
                </div>
                <h3 className="don-card-title">{cat.title}</h3>
                <p className="don-card-count">{cat.count}</p>
                <button
                  type="button"
                  className="don-card-btn"
                  onClick={() => handleRequestDonation(cat.key)}
                >
                  Request Donation
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}