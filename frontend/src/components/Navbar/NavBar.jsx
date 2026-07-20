import { useState, useRef, useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { Leaf, Menu, X, ChevronDown, LayoutDashboard, UserRound, LogOut } from "lucide-react";
import { USER_ROLES, ROLE_LABELS, getAvatarInfo } from "./authHelpers";

const DASHBOARD_ROUTES = {
  [USER_ROLES.DONOR]: "/doner/dashboard",
  [USER_ROLES.RESTAURANT]: "/restaurant/overview",
  [USER_ROLES.FARMER]: "/farmer/overview",
  [USER_ROLES.NGO]: "/ngo/overview",
  [USER_ROLES.ADMIN]: "/admin/dashboard",
};

const PROFILE_ROUTES = {
  [USER_ROLES.DONOR]: "/doner/profile",
};


export default function Navbar({ user = null, isLoadingUser = false, onLogout = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/donate-food", label: "Donate Food" },
    { to: "/donate-items", label: "Donate Items" },
    { to: "/find-donations", label: "Find Donations" },
    { to: "/ngos", label: "NGOs" },
  ];

  // Close the profile dropdown on outside click.
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLoggedIn = !isLoadingUser && !!user;
  const { displayName, initials, imageUrl } = getAvatarInfo(user);
  const roleLabel = user ? ROLE_LABELS[user.role] : "";
  const dashboardPath = user ? DASHBOARD_ROUTES[user.role] : null;
  const profilePath = user ? PROFILE_ROUTES[user.role] : null;

  function handleLogoutClick() {
    setProfileOpen(false);
    setMenuOpen(false);
    onLogout();
  }

  function handleNavClick() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-icon">
            <Leaf size={20} strokeWidth={2.3} />
          </div>

          <h2 className="logo-text">
            <span>Share</span>Cycle
          </h2>
        </Link>

        {/* Navigation */}
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={handleNavClick}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Buttons / Account */}
        <div className="nav-buttons">

          {isLoadingUser && <div className="navbar-avatar-skeleton" aria-hidden="true" />}

          {!isLoadingUser && !user && (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          )}

          {isLoggedIn && (
            <div className="navbar-profile-menu" ref={profileRef}>
              <button
                className={`navbar-profile-trigger ${user.role === USER_ROLES.FARMER ? "navbar-profile-trigger-farmer" : ""}`}
                onClick={() => setProfileOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={profileOpen}
                aria-label={`${displayName} account menu`}
              >
                {user.role === USER_ROLES.FARMER ? (
                  <span className="navbar-farm-name">{displayName}</span>
                ) : (
                  <span className="navbar-avatar">
                    {imageUrl ? (
                      <img src={imageUrl} alt="" className="navbar-avatar-img" />
                    ) : (
                      <span className="navbar-avatar-initials">{initials}</span>
                    )}
                  </span>
                )}
                <ChevronDown size={14} className={`navbar-profile-chevron ${profileOpen ? "navbar-profile-chevron-open" : ""}`} />
              </button>

              {profileOpen && (
                <div className="navbar-profile-dropdown">
                  <div className="navbar-profile-dropdown-header">
                    <span className="navbar-profile-dropdown-name">{displayName}</span>
                    <span className="navbar-profile-dropdown-role">{roleLabel}</span>
                  </div>

                  {dashboardPath && (
                    <Link to={dashboardPath} className="navbar-profile-dropdown-link" onClick={() => setProfileOpen(false)}>
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                  )}
                  {profilePath && (
                    <Link to={profilePath} className="navbar-profile-dropdown-link" onClick={() => setProfileOpen(false)}>
                      <UserRound size={16} />
                      Profile
                    </Link>
                  )}
                  <button className="navbar-profile-dropdown-link navbar-profile-dropdown-logout" onClick={handleLogoutClick}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={handleNavClick}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}