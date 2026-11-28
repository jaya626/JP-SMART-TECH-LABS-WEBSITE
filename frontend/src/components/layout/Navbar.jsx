
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const navigation = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Our Services", path: "/services" },
  { name: "Materials", path: "/materials" },
  { name: "Contact", path: "/contact" },
];

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3h2l2.2 12.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 7H6" />
      <circle cx="10" cy="21" r="1" />
      <circle cx="18" cy="21" r="1" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={open ? "menu-icon open" : "menu-icon"}
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Temporary values until wishlist and cart are connected.
  const cartCount = 0;
  const wishlistCount = 0;

  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen((previous) => !previous);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((previous) => !previous);
    setProfileOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* BRAND */}
        <Link
          to="/"
          className="navbar-brand"
          onClick={closeMenus}
          aria-label="JP Smart Tech Labs Home"
        >
          <div className="brand-logo">JP</div>

          <div className="brand-text">
            <h2>JP SMART TECH</h2>
            <span>LABS</span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav
          className={`navbar-links ${menuOpen ? "open" : ""}`}
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMenus}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* ACTION ICONS */}
        <div className="navbar-actions">

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="navbar-icon"
            aria-label={`Wishlist, ${wishlistCount} items`}
            title="Wishlist"
            onClick={closeMenus}
          >
            <HeartIcon />

            {wishlistCount > 0 && (
              <span className="icon-count">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            className="navbar-icon"
            aria-label={`Shopping cart, ${cartCount} items`}
            title="Shopping cart"
            onClick={closeMenus}
          >
            <CartIcon />

            {cartCount > 0 && (
              <span className="icon-count">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* PROFILE */}
          <div className="profile-wrapper">
            <button
              type="button"
              className={`navbar-icon profile-button ${
                profileOpen ? "selected" : ""
              }`}
              onClick={toggleProfile}
              aria-label="Open account menu"
              aria-expanded={profileOpen}
              aria-haspopup="true"
              title="My Account"
            >
              <UserIcon />
            </button>

            {profileOpen && (
              <div className="profile-dropdown">

                <div className="profile-dropdown-header">
                  <span className="profile-welcome">
                    Welcome to JP
                  </span>

                  <p>Manage your account and orders</p>
                </div>

                <Link
                  to="/login"
                  className="profile-menu-item"
                  onClick={closeMenus}
                >
                  <span>Login</span>
                  <span className="menu-arrow">→</span>
                </Link>

                <Link
                  to="/register"
                  className="profile-menu-item"
                  onClick={closeMenus}
                >
                  <span>Create Account</span>
                  <span className="menu-arrow">→</span>
                </Link>

                <div className="profile-dropdown-divider" />

                <Link
                  to="/account"
                  className="profile-menu-item"
                  onClick={closeMenus}
                >
                  <span>My Account</span>
                  <span className="menu-arrow">→</span>
                </Link>

                <Link
                  to="/orders"
                  className="profile-menu-item"
                  onClick={closeMenus}
                >
                  <span>My Orders</span>
                  <span className="menu-arrow">→</span>
                </Link>

              </div>
            )}
          </div>

          {/* MOBILE MENU */}
          <button
            type="button"
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            <MenuIcon open={menuOpen} />
          </button>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
