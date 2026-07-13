import {
  FaUser,
  FaStore,
  FaLeaf,
  FaHandsHelping,
  FaArrowRight,
} from "react-icons/fa";

const roles = [
  {
    title: "Individual Donor",
    desc: "Donate food or items from home",
    icon: <FaUser />,
  },
  {
    title: "Restaurant / Hotel",
    desc: "Donate surplus cooked food",
    icon: <FaStore />,
  },
  {
    title: "Farmer",
    desc: "Donate unsold harvest produce",
    icon: <FaLeaf />,
  },
  {
    title: "NGO / Organisation",
    desc: "Receive and distribute donations",
    icon: <FaHandsHelping />,
  },
];

export default function Step1({
  formData,
  updateForm,
  nextStep,
}) {
  return (
    <>
      <h1 className="signup-title">
        Join ShareCycle
      </h1>

      <p className="signup-subtitle">
        I want to join as a...
      </p>

      <div className="role-grid">
        {roles.map((role) => (
          <button
            key={role.title}
            type="button"
            className={`role-card ${
              formData.role === role.title ? "selected" : ""
            }`}
            onClick={() => updateForm("role", role.title)}
          >
            <div className="role-icon">
              {role.icon}
            </div>

            <div className="role-content">
              <h3>{role.title}</h3>
              <p>{role.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        className="primary-btn"
        disabled={!formData.role}
        onClick={nextStep}
      >
        Continue as {formData.role || "..."}
        <FaArrowRight />
      </button>

      <p className="signin-link">
        Already have an account?
        <a href="/"> Sign In</a>
      </p>
    </>
  );
}