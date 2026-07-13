import { useState } from "react";
import "./Signup.css";

import { FaLeaf } from "react-icons/fa";

import ProgressBar from "./Steps/ProgressBar";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";

function Signup() {

  const [step, setStep] = useState(1);

  const [direction, setDirection] = useState("forward");

  const [formData, setFormData] = useState({

    role: "",

    // Individual Donor
    firstName: "",
    lastName: "",

    // Restaurant / Hotel
    businessName: "",
    fssaiNumber: "",

    // Farmer
    farmName: "",

    // NGO / Organisation
    orgName: "",
    ngoRegNumber: "",

    // Shared (all roles)
    email: "",
    phone: "",
    city: "",

    password: "",
    confirmPassword: "",

    terms: false,

  });

  const nextStep = () => {

    if(step < 3){

      setDirection("forward");

      setStep(step + 1);

    }

  };

  const prevStep = () => {

    if(step > 1){

      setDirection("backward");

      setStep(step - 1);

    }

  };

  const updateForm = (field,value)=>{

    setFormData({

      ...formData,

      [field]:value,

    });

  };

  return (

    <div className="signup-page">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <div className="signup-container">

        {/* Logo */}

        <div className="signup-logo">

          <div className="logo-circle">

            <FaLeaf />

          </div>

          <h1>

            Share<span>Cycle</span>

          </h1>

        </div>

        {/* Card */}

        <div className="signup-card">

          <ProgressBar step={step} />

          <div
            key={step}
            className={`step-panel ${
              direction === "forward" ? "slide-fwd" : "slide-back"
            }`}
          >

          {step===1 &&

            <Step1

              formData={formData}

              updateForm={updateForm}

              nextStep={nextStep}

            />

          }

          {step===2 &&

            <Step2

              data={formData}

              updateForm={updateForm}

              nextStep={nextStep}

              prevStep={prevStep}

            />

          }

          {step===3 &&

            <Step3

              data={formData}

              updateForm={updateForm}

              prevStep={prevStep}

            />

          }

          </div>

        </div>

      </div>

    </div>

  );

}

export default Signup;