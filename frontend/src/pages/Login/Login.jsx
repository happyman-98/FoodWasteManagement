import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

import {
  FaLeaf,
  FaGoogle,
  FaArrowRight,
  FaPhoneAlt,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { useAuth } from "../../context/AuthContext";

const ROLE_ROUTES = {
  donor: "/doner/dashboard",
  restaurant: "/restaurant/overview",
  farmer: "/farmer/overview",
  ngo: "/ngo/overview",
  admin: "/admin/dashboard",
};

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("Donor");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const roles = ["Donor", "Restaurant", "Farmer", "NGO", "Admin"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login({ ...form, role });
      // Fix: Normalize user.role to lowercase to match the ROLE_ROUTES keys
      const userRole = user?.role?.toLowerCase() || role.toLowerCase();
      navigate(ROLE_ROUTES[userRole] || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <div className="login-container">
        <header className="auth-logo">
          <div className="auth-logo-icon">
            <FaLeaf />
          </div>
          <h1>Share<span>Cycle</span></h1>
        </header>

        <div className="login-card">
          <h2>Welcome back</h2>
          <p className="subtitle">Sign in to continue making a difference.</p>

          <label className="form-group-label">I am a...</label>
          <div className="roles">
            {roles.map((item) => (
              <button
                key={item}
                type="button"
                className={role === item ? "active" : ""}
                onClick={() => { setRole(item); setError(""); }}
              >
                {item}
              </button>
            ))}
          </div>

          {error && <p className="form-error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="password-row">
                <label>Password</label>
                <button type="button" className="forgot-btn">
                  Forgot password?
                </button>
              </div>

              <div className="password-box">
                <FaLock className="input-icon" />
                <input
                  className="form-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <FaArrowRight />}
            </button>
          </form>

          <div className="divider">
            <span></span>
            <p>or continue with</p>
            <span></span>
          </div>

          <div className="social-buttons">
            <button type="button"><FaGoogle /> Google</button>
            <button type="button"><FaPhoneAlt /> Mobile OTP</button>
          </div>

          <div className="signup">
            Don't have an account? <Link to="/signup">Create one free</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;