import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

import { FaLeaf } from "react-icons/fa";

import ProgressBar from "./Steps/ProgressBar";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";

import { useAuth } from "../../context/AuthContext";

const ROLE_ROUTES = {
  donor: "/doner/dashboard",
  restaurant: "/restaurant/overview",
  farmer: "/farmer/overview",
  ngo: "/ngo/overview",
};

// Maps the human-readable role labels used in Step1's role cards
// to the lowercase enum values the backend User schema expects.
const ROLE_KEY_MAP = {
  "Individual Donor": "donor",
  "Restaurant / Hotel": "restaurant",
  "Farmer": "farmer",
  "NGO / Organisation": "ngo",
};

// Translates the flat, role-agnostic formData shape collected across
// Step1-3 into the payload shape backend/services/auth.service.js and
// registerSchema actually expect (name, role, licenseNumber, etc.).
function buildRegistrationPayload(formData) {
  const role = ROLE_KEY_MAP[formData.role];

  let name;
  let licenseNumber;

  switch (role) {
    case "restaurant":
      name = formData.businessName;
      licenseNumber = formData.fssaiNumber || undefined; // optional, per Step2 UI copy
      break;
    case "farmer":
      name = formData.farmName;
      licenseNumber = formData.farmLicenseNumber || undefined; // optional for now — flip to required in Step2/backend together if needed
      break;
    case "ngo":
      name = formData.orgName;
      licenseNumber = formData.ngoRegNumber;
      break;
    case "donor":
    default:
      name = `${formData.firstName} ${formData.lastName}`.trim();
      break;
  }

  return {
    name,
    email: formData.email,
    password: formData.password,
    role,
    phone: formData.phone,
    city: formData.city,
    licenseNumber,
    agreed: formData.terms,
  };
}

function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState("forward");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    role: "",
    firstName: "",
    lastName: "",
    businessName: "",
    fssaiNumber: "",
    farmName: "",
    farmLicenseNumber: "",
    orgName: "",
    ngoRegNumber: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const nextStep = () => {
    if (step < 3) {
      setDirection("forward");
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setDirection("backward");
      setStep(step - 1);
    }
  };

  const updateForm = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setError("");
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const user = await register(buildRegistrationPayload(formData));
      const userRole = user?.role?.toLowerCase() || ROLE_KEY_MAP[formData.role];
      navigate(ROLE_ROUTES[userRole] || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <div className="signup-container">
        <div className="signup-logo">
          <div className="logo-circle">
            <FaLeaf />
          </div>
          <h1>Share<span>Cycle</span></h1>
        </div>

        <div className="signup-card">
          <ProgressBar step={step} />

          {error && <p className="form-error">{error}</p>}

          <div
            key={step}
            className={`step-panel ${direction === "forward" ? "slide-fwd" : "slide-back"}`}
          >
            {step === 1 && (
              <Step1 formData={formData} updateForm={updateForm} nextStep={nextStep} />
            )}
            {step === 2 && (
              <Step2 data={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />
            )}
            {step === 3 && (
              <Step3
                data={formData}
                updateForm={updateForm}
                prevStep={prevStep}
                onSubmit={handleSubmit} // Wired up the actual registration function here
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;