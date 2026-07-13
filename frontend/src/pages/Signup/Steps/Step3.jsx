import { FaLeaf } from "react-icons/fa";
import PasswordField from "./PasswordField";

export default function Step3({
  data,
  updateForm,
  prevStep,
}) {

  const isValid =
    data.password &&
    data.password.length >= 8 &&
    data.password === data.confirmPassword &&
    data.terms;

  const handleSubmit = () => {

    if (!isValid) return;

    // TODO: hook this up to your signup API call
    console.log("Creating account with:", data);

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
        >
          Back
        </button>

        <button
          type="button"
          className="primary-btn"
          disabled={!isValid}
          onClick={handleSubmit}
        >
          <FaLeaf />
          Create My Account
        </button>

      </div>
    </>
  );
}