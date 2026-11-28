
import { Link } from "react-router-dom";
import "./Footer.css";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Our Services", path: "/services" },
  { label: "Materials", path: "/materials" },
  { label: "Contact Us", path: "/contact" },
];

const productLinks = [
  { label: "Custom Enclosures", path: "/shop" },
  { label: "Mounting Brackets", path: "/shop" },
  { label: "Sensor Housings", path: "/shop" },
  { label: "Gear Kits", path: "/shop" },
];

const supportLinks = [
  { label: "My Account", path: "/account" },
  { label: "My Orders", path: "/orders" },
  { label: "Wishlist", path: "/wishlist" },
  { label: "Shopping Cart", path: "/cart" },
  { label: "Contact Support", path: "/contact" },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* MAIN FOOTER CONTENT */}
        <div className="footer-main">

          {/* BRAND INFORMATION */}
          <div className="footer-brand">
            <Link to="/" className="footer-brand-link">
              <span className="footer-brand-logo">JP</span>

              <span className="footer-brand-name">
                <strong>JP SMART TECH LABS</strong>
                <small>INNOVATE. BUILD. AUTOMATE.</small>
              </span>
            </Link>

            <p className="footer-description">
              Turning innovative ideas into practical solutions through
              precision engineering, smart technology and custom-built
              products.
            </p>

            <Link to="/contact" className="footer-contact-btn">
              Let's Work Together
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-column">
            <h3>Quick Links</h3>

            <ul>
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PRODUCT CATEGORIES */}
          <div className="footer-column">
            <h3>Our Products</h3>

            <ul>
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CUSTOMER SUPPORT */}
          <div className="footer-column">
            <h3>Customer Support</h3>

            <ul>
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM FOOTER */}
        <div className="footer-bottom">
          <p>
            © {currentYear} JP Smart Tech Labs. All rights reserved.
          </p>

          <p className="footer-tagline">
            Designed with precision. Built for possibilities.
          </p>

          <Link to="/" className="footer-back-to-top">
            Back to Home ↑
          </Link>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
