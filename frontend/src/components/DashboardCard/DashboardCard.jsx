import React from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  UtensilsCrossed,
  Wheat,
  ClipboardList,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import "./DashboardCard.css";

const roles = [
  {
    key: "user",
    icon: UserRound,
    label: "User Dashboard",
    modifier: "dc-card--user",
  },
  {
    key: "restaurant",
    icon: UtensilsCrossed,
    label: "Restaurant Dashboard",
    modifier: "dc-card--restaurant",
  },
  {
    key: "farmer",
    icon: Wheat,
    label: "Farmer Dashboard",
    modifier: "dc-card--farmer",
  },
  {
    key: "ngo",
    icon: ClipboardList,
    label: "NGO Dashboard",
    modifier: "dc-card--ngo",
  },
];

export default function DashboardCard({ onSelectRole, onSelectAdmin }) {
  const navigate = useNavigate();

  const handleSelect = (roleKey) => {
    if (onSelectRole) {
      onSelectRole(roleKey);
    } else {
      navigate("/login");
    }
  };

  const handleAdmin = () => {
    if (onSelectAdmin) {
      onSelectAdmin();
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="dc-section">
      <div className="dc-container">
        <p className="dc-eyebrow">Try a Dashboard</p>

        <div className="dc-grid">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.key}
                type="button"
                className={`dc-card ${role.modifier}`}
                onClick={() => handleSelect(role.key)}
              >
                <span className="dc-icon-wrap">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <span className="dc-card-title">{role.label}</span>
                <ChevronRight size={16} className="dc-chevron" />
              </button>
            );
          })}
        </div>

        <div className="dc-admin-wrap">
          <button type="button" className="dc-admin" onClick={handleAdmin}>
            <ShieldCheck size={18} />
            Admin Dashboard
          </button>
        </div>
      </div>
    </section>
  );
}