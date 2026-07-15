import { Leaf, ArrowRight, CheckCircle2, UtensilsCrossed } from "lucide-react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        {/* Left column */}
        <div className="hero-left">
          <div className="hero-badge">
            <Leaf size={16} />
            Sustainable Community Sharing
          </div>

          <h1 className="hero-title">
            Reduce Waste.
            <br />
            <span className="hero-title-accent">
              Share Hope.
              <span className="hero-underline" />
            </span>
          </h1>

          <p className="hero-text">
            Donate surplus food, fresh vegetables, and reusable items to help
            your community while reducing waste — connecting donors with
            NGOs and families in need.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary">
              Donate Now
              <ArrowRight size={16} />
            </button>
            <button className="btn btn-outline">Find Donations</button>
          </div>

          <div className="hero-donors">
            <div className="avatar-stack">
              {[
                "https://i.pravatar.cc/64?img=12",
                "https://i.pravatar.cc/64?img=32",
                "https://i.pravatar.cc/64?img=47",
                "https://i.pravatar.cc/64?img=5",
              ].map((src, i) => (
                <img key={i} src={src} alt="Donor avatar" className="avatar" />
              ))}
            </div>
            <p className="hero-donors-text">
              <span className="hero-donors-count">12,400+</span> donors
              joined this month
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="hero-right">
          <div className="hero-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&q=80"
              alt="Children benefiting from community food donations"
              className="hero-image"
            />
          </div>

          <div className="hero-card hero-card-top">
            <div className="hero-card-icon icon-green">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="hero-card-label">Impact this week</p>
              <p className="hero-card-value">1,240 families</p>
            </div>
          </div>

          <div className="hero-card hero-card-bottom">
            <div className="hero-card-icon icon-orange">
              <UtensilsCrossed size={20} />
            </div>
            <div>
              <p className="hero-card-label">Today's donations</p>
              <p className="hero-card-value">340 meals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}