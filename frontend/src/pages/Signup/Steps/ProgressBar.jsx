import { Fragment } from "react";
import { FaCheck } from "react-icons/fa";

function ProgressBar({ step }) {

  const titles = [

    "Choose your role",

    "Your details",

    "Almost done"

  ];

  const widths = ["33.3%", "66.6%", "100%"];

  return (

    <>

      <div
        className="top-progress"
        style={{ width: widths[step - 1] }}
      ></div>

      <div className="progress-header">

        {[1, 2, 3].map((item) => (

          <Fragment key={item}>

            <div
              className={`progress-circle
              ${step === item ? "active" : ""}
              ${step > item ? "done" : ""}`}
            >

              {step > item ? <FaCheck /> : item}

            </div>

            {item !== 3 &&

            <div
              className={`progress-line ${step > item ? "filled" : ""}`}
            ></div>

            }

          </Fragment>

        ))}

        <span className="progress-title">

          {titles[step - 1]}

        </span>

      </div>

    </>

  );

}

export default ProgressBar;