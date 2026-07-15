import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

import {
  FaLeaf,
  FaGoogle,
  FaArrowRight,
  FaPhoneAlt,
  FaEnvelope,
  FaLock
} from "react-icons/fa";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

function Login() {
  const [role, setRole] = useState("Donor");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const roles = [
    "Donor",
    "Restaurant",
    "Farmer",
    "NGO",
    "Admin",
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      role,
      ...form,
    });
  };

  return (
    <div className="login-page">

      {/* Background */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      {/* Wrapper */}
      <div className="login-container">

        {/* Logo */}

        <header className="auth-logo">

          <div className="auth-logo-icon">
            <FaLeaf />
          </div>

          <h1>
            Share<span>Cycle</span>
          </h1>

        </header>

        {/* Login Card */}

        <div className="login-card">

          <h2>Welcome back</h2>

          <p className="subtitle">
            Sign in to continue making a difference.
          </p>

          <label>I am a...</label>

          <div className="roles">

            {roles.map((item) => (

              <button
                key={item}
                type="button"
                className={role === item ? "active" : ""}
                onClick={() => setRole(item)}
              >
                {item}
              </button>

            ))}

          </div>

          <form onSubmit={handleSubmit}>

            {/* Email */}

            <label>Email Address</label>

            <div className="input-box">

                <div className="input-wrapper">

                    <FaEnvelope className="input-icon"/>

                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                    />

                </div>

            </div>

            {/* Password */}

            <div className="password-row">

              <label>Password</label>

              <button
                type="button"
                className="forgot-btn"
              >
                Forgot password?
              </button>

            </div>

            <div className="password-box">

                <FaLock className="input-icon"/>

                <input
                    className="form-input"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                />

                <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword
                        ? <IoEyeOffOutline/>
                        : <IoEyeOutline/>
                    }
                </button>

            </div>

            <button
              type="submit"
              className="auth-submit-btn"
            >
              Sign In
              <FaArrowRight />
            </button>

          </form>

          <div className="divider">

            <span></span>

            <p>or continue with</p>

            <span></span>

          </div>

          <div className="social-buttons">

            <button type="button">

              <FaGoogle />

              Google

            </button>

            <button type="button">

              <FaPhoneAlt />

              Mobile OTP

            </button>

          </div>

          <div className="signup">

            Don't have an account?

            <Link to="/signup">
              Create one free
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;