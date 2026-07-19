import { useState, useRef, useEffect } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Menu, X, ChevronDown, LayoutDashboard, UserRound, LogOut } from "lucide-react";
import { ROLE_LABELS, getAvatarInfo } from "./authHelpers";


export default function Navbar({ user = null, isLoadingUser = false, onLogout = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

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

  function handleLogoutClick() {
    setProfileOpen(false);
    setMenuOpen(false);
    onLogout();
  }

  function handleNavClick(e, to) {
    e.preventDefault();
    setMenuOpen(false);
    navigate("/login");
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
              onClick={(e) => handleNavClick(e, item.to)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Buttons / Account */}
        <div className="nav-buttons">

          {isLoadingUser && <div className="avatar-skeleton" aria-hidden="true" />}

          {!isLoadingUser && !user && (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          )}

          {isLoggedIn && (
            <div className="profile-menu" ref={profileRef}>
              <button
                className="profile-trigger"
                onClick={() => setProfileOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={profileOpen}
                aria-label={`${displayName} account menu`}
              >
                <span className="profile-avatar">
                  {imageUrl ? (
                    <img src={imageUrl} alt="" className="profile-avatar-img" />
                  ) : (
                    <span className="profile-avatar-initials">{initials}</span>
                  )}
                </span>
                <ChevronDown size={16} className={`profile-chevron ${profileOpen ? "profile-chevron-open" : ""}`} />
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <span className="profile-dropdown-name">{displayName}</span>
                    <span className="profile-dropdown-role">{roleLabel}</span>
                  </div>

                  <Link to="/dashboard" className="profile-dropdown-link" onClick={() => setProfileOpen(false)}>
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <Link to="/profile" className="profile-dropdown-link" onClick={() => setProfileOpen(false)}>
                    <UserRound size={16} />
                    Profile
                  </Link>
                  <button className="profile-dropdown-link profile-dropdown-logout" onClick={handleLogoutClick}>
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
              onClick={(e) => handleNavClick(e, item.to)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}