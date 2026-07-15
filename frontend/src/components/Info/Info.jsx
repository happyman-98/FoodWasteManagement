import React from "react";
import { UserRound, Gift, ClipboardList, Truck } from "lucide-react";
import "./Info.css";

const steps = [
  {
    number: "01",
    icon: UserRound,
    title: "Register",
    description:
      "Create a free account as a donor, NGO, or receiver. Verify your identity in minutes.",
  },
  {
    number: "02",
    icon: Gift,
    title: "Post Donation",
    description:
      "List surplus food, vegetables, or items with photos, quantity, and pickup details.",
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "NGO Requests",
    description:
      "Registered NGOs and verified individuals browse listings and send pickup requests.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Pickup & Delivery",
    description:
      "Coordinate pickup via our platform. Track delivery status in real time.",
  },
];

export default function Info() {
  return (
    <section className="hiw-section">
      <div className="hiw-container">
        <div className="hiw-header">
          <p className="hiw-eyebrow">Simple Process</p>
          <h2 className="hiw-title">How ShareCycle Works</h2>
          <p className="hiw-subtitle">
            From listing to delivery — the entire donation cycle in four easy
            steps.
          </p>
        </div>

        <div className="hiw-grid">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="hiw-card">
                <div className="hiw-card-top">
                  <div className="hiw-icon-wrap">
                    <Icon size={22} strokeWidth={2} className="hiw-icon" />
                  </div>
                  <span className="hiw-number">{step.number}</span>
                </div>
                <h3 className="hiw-card-title">{step.title}</h3>
                <p className="hiw-card-desc">{step.description}</p>

                {idx < steps.length - 1 && (
                  <span className="hiw-connector" aria-hidden="true">
                    &rsaquo;
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}