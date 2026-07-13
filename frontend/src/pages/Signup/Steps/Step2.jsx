import { FaArrowRight } from "react-icons/fa";
import PhoneInput from "./PhoneInput";

const ROLES = {
  DONOR: "Individual Donor",
  RESTAURANT: "Restaurant / Hotel",
  FARMER: "Farmer",
  NGO: "NGO / Organisation",
};

export default function Step2({
  data,
  updateForm,
  nextStep,
  prevStep,
}) {

  const phoneDigits = (data.phone || "").replace(/\D/g, "");

  const sharedValid =
    data.email &&
    phoneDigits.length >= 6 &&
    data.city;

  const roleValid = (() => {
    switch (data.role) {
      case ROLES.RESTAURANT:
        return !!data.businessName;
      case ROLES.FARMER:
        return !!data.farmName;
      case ROLES.NGO:
        return !!(data.orgName && data.ngoRegNumber);
      case ROLES.DONOR:
      default:
        return !!(data.firstName && data.lastName);
    }
  })();

  const isValid = sharedValid && roleValid;

  return (
    <>
      <h1 className="signup-title">
        Your Details
      </h1>

      <p className="signup-subtitle">
        Tell us a bit about yourself.
      </p>

      {/* Individual Donor */}
      {data.role === ROLES.DONOR && (
        <div className="form-grid">

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              placeholder="e.g. Ananya"
              value={data.firstName}
              onChange={(e) => updateForm("firstName", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="e.g. Krishnan"
              value={data.lastName}
              onChange={(e) => updateForm("lastName", e.target.value)}
            />
          </div>

        </div>
      )}

      {/* Restaurant / Hotel */}
      {data.role === ROLES.RESTAURANT && (
        <>
          <div className="form-group">
            <label>Restaurant / Business Name</label>
            <input
              type="text"
              placeholder="e.g. Spice Garden Restaurant"
              value={data.businessName}
              onChange={(e) => updateForm("businessName", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>FSSAI License No. (optional)</label>
            <input
              type="text"
              placeholder="e.g. 12724999000543"
              value={data.fssaiNumber}
              onChange={(e) => updateForm("fssaiNumber", e.target.value)}
            />
          </div>
        </>
      )}

      {/* Farmer */}
      {data.role === ROLES.FARMER && (
        <div className="form-group">
          <label>Farm Name</label>
          <input
            type="text"
            placeholder="e.g. Green Acres Farm"
            value={data.farmName}
            onChange={(e) => updateForm("farmName", e.target.value)}
          />
        </div>
      )}

      {/* NGO / Organisation */}
      {data.role === ROLES.NGO && (
        <>
          <div className="form-group">
            <label>Organisation Name</label>
            <input
              type="text"
              placeholder="e.g. Helping Hands Trust"
              value={data.orgName}
              onChange={(e) => updateForm("orgName", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>NGO Registration Number</label>
            <input
              type="text"
              placeholder="e.g. NGO-2024-XXXX"
              value={data.ngoRegNumber}
              onChange={(e) => updateForm("ngoRegNumber", e.target.value)}
            />
          </div>
        </>
      )}

      {/* Shared fields for every role */}
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={data.email}
          onChange={(e) => updateForm("email", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <PhoneInput
          value={data.phone}
          onChange={(val) => updateForm("phone", val)}
        />
      </div>

      <div className="form-group">
        <label>City / Area</label>
        <input
          type="text"
          placeholder="e.g. Koramangala, Bangalore"
          value={data.city}
          onChange={(e) => updateForm("city", e.target.value)}
        />
      </div>

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
          onClick={nextStep}
        >
          Continue
          <FaArrowRight />
        </button>

      </div>
    </>
  );
}