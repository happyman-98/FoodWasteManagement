import React from "react";
import { Mail, Phone, Leaf } from "lucide-react";
import "./Footer.css";

const platformLinks = [
  { label: "Donate Food", href: "#" },
  { label: "Donate Items", href: "#" },
  { label: "Find Donations", href: "#" },
  { label: "NGOs Directory", href: "#" },
  { label: "Impact Reports", href: "#" },
];

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Our Mission", href: "#" },
  { label: "Partners", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
];

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

/* These SVG files should live in your project's public/icons folder, e.g.
   public/icons/facebook.svg, so they're served at the root paths below. */
const socialLinks = [
  { icon: "/facebook.svg", label: "Facebook", href: "#" },
  { icon: "/twitter.svg", label: "Twitter", href: "#" },
  { icon: "/instagram.svg", label: "Instagram", href: "#" },
  { icon: "/linkedin.svg", label: "LinkedIn", href: "#" },
];

function FooterColumn({ title, links }) {
  return (
    <div className="footer-column">
      <h4 className="footer-column-title">{title}</h4>
      <ul className="footer-column-list">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="footer-link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon" aria-hidden="true">
                <Leaf size={18} strokeWidth={2.25} />
              </span>
              <span className="footer-logo-text">
                Share<span className="footer-logo-accent">Cycle</span>
              </span>
            </div>
            <p className="footer-tagline">
              Connecting surplus to need. Reducing waste, building community, one
              donation at a time.
            </p>
            <div className="footer-social">
              {socialLinks.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="footer-social-link"
                  aria-label={label}
                >
                  <img src={icon} alt="" className="footer-social-icon" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Platform" links={platformLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Support" links={supportLinks} />
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} ShareCycle. All rights reserved. Made with{" "}
            <span className="footer-heart">♥</span> for a sustainable world.
          </p>
          <div className="footer-contact">
            <a href="mailto:hello@sharecycle.org" className="footer-contact-link">
              <Mail size={14} strokeWidth={2} />
              hello@sharecycle.org
            </a>
            <a href="tel:+919876543210" className="footer-contact-link">
              <Phone size={14} strokeWidth={2} />
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}