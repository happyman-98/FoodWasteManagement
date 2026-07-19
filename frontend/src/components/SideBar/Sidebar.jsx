import React, { useState } from "react";
import { Leaf, Menu, X, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROLE_CONFIG } from "./sidebarConfig";
import "./Sidebar.css";

export default function Sidebar({
  role = "donor",
  activeKey,
  onNavigate = () => {},
  onLogout = () => {},
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const config = ROLE_CONFIG[role] ?? ROLE_CONFIG.donor;

  const handleNavClick = (key) => {
    onNavigate(key);
    setMobileOpen(false);
  };

  const handleHomeClick = () => {
    setMobileOpen(false);
    navigate("/");
  };

  return (
    <>
      <button
        className="sidebar-mobile-trigger"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar${mobileOpen ? " sidebar--mobile-open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span className="sidebar-brand-icon">
              <Leaf size={16} strokeWidth={2.5} />
            </span>
            <span className="sidebar-brand-name">
              Share<span className="sidebar-brand-accent">Cycle</span>
            </span>
          </div>
          <button
            className="sidebar-mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {config.portalLabel && (
          <div className="sidebar-portal-label">{config.portalLabel}</div>
        )}

        <nav className="sidebar-nav">
          <ul>
            {config.items.map(({ key, label, icon: Icon }) => {
              const isActive = key === activeKey;
              return (
                <li key={key}>
                  <button
                    type="button"
                    className={`sidebar-link${isActive ? " sidebar-link--active" : ""}`}
                    onClick={() => handleNavClick(key)}
                  >
                    <Icon size={18} strokeWidth={2} className="sidebar-link-icon" />
                    <span>{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button
            type="button"
            className="sidebar-link"
            onClick={handleHomeClick}
          >
            <Home size={18} strokeWidth={2} className="sidebar-link-icon" />
            <span>Back to Home</span>
          </button>

          <button
            type="button"
            className="sidebar-link sidebar-logout"
            onClick={() => {
              onLogout();
              setMobileOpen(false);
            }}
          >
            <config.logout.icon size={18} strokeWidth={2} className="sidebar-link-icon" />
            <span>{config.logout.label}</span>
          </button>
        </div>
      </aside>
    </>
  );
}