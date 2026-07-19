import { FaLeaf } from "react-icons/fa";
import PasswordField from "./PasswordField";

export default function Step3({
  data,
  updateForm,
  prevStep,
  onSubmit,
  loading
}) {

  const isValid =
    data.password &&
    data.password.length >= 8 &&
    data.password === data.confirmPassword &&
    data.terms;

  const handleFormSubmit = () => {
    if (!isValid || loading) return;
    onSubmit(); // Executes actual registration in Signup.jsx
  };

  return (
    <>
      <h1 className="signup-title">
        Create Password
      </h1>

      <p className="signup-subtitle">
        Set a secure password to protect your account.
      </p>

      <div className="form-group">
        <label>Password</label>
        <PasswordField
          placeholder="At least 8 characters"
          value={data.password}
          onChange={(e) => updateForm("password", e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <PasswordField
          placeholder="Repeat your password"
          value={data.confirmPassword}
          onChange={(e) => updateForm("confirmPassword", e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className="requirements-box">
        <ul>
          <li>At least 8 characters</li>
          <li>One uppercase letter</li>
          <li>One number or symbol</li>
        </ul>
      </div>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={data.terms}
          onChange={(e) => updateForm("terms", e.target.checked)}
        />
        <span>
          I agree to the <a href="/terms">Terms of Service</a> and{" "}
          <a href="/privacy">Privacy Policy</a>
        </span>
      </label>

      <div className="button-row">
        <button
          type="button"
          className="back-btn"
          onClick={prevStep}
          disabled={loading}
        >
          Back
        </button>

        <button
          type="button"
          className="primary-btn"
          disabled={!isValid || loading}
          onClick={handleFormSubmit}
        >
          <FaLeaf />
          {loading ? "Creating Account..." : "Create My Account"}
        </button>
      </div>
    </>
  );
}