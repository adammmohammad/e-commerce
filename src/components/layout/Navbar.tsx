import { useState, type SyntheticEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Coffee, Heart, House, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useCartCount, useWishlistCount } from "../../hooks/useCounts";
import logo from "../../assets/logo.png"; 
import "../../styles/navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const cartCount = useCartCount();
  const wishlistCount = useWishlistCount();

  const closeAll = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen((open) => !open);
    setMenuOpen(false);
  };

  const handleSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/shop?search=${encodeURIComponent(q)}` : "/shop");
    setQuery("");
    closeAll();
  };

  return (
    <>
      <header className="navbar">
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo" aria-label="Berga Ice Coffee home" onClick={closeAll}>
            <img src={logo} alt="Berga Ice Coffee" />
          </Link>

          {/* Links: inline on desktop, dropdown panel on tablet/mobile */}
          <nav className={`navbar__links ${menuOpen ? "is-open" : ""}`}>
            <NavLink to="/" end onClick={closeAll}>Home</NavLink>
            <NavLink to="/shop" onClick={closeAll}>Shop</NavLink>
            <Link to="/#about" onClick={closeAll}>About</Link>
            <Link to="/#contact" onClick={closeAll}>Contact</Link>
          </nav>

          {/* Desktop: full search input */}
          <form className="navbar__search navbar__search--desktop" onSubmit={handleSearch}>
            <Search size={18} />
            <input
              type="search"
              placeholder="Search our menu..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search products"
            />
          </form>

          <div className="navbar__actions">
            {/* Tablet: search icon that opens the search bar */}
            <button
              className="icon-btn navbar__search-toggle"
              onClick={toggleSearch}
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <Search size={24} />
            </button>
            <Link to="/wishlist" className="icon-btn" aria-label={`Wishlist, ${wishlistCount} items`} onClick={closeAll}>
              <Heart size={24} />
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </Link>
            <Link to="/cart" className="icon-btn" aria-label={`Cart, ${cartCount} items`} onClick={closeAll}>
              <ShoppingCart size={24} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
            <button
              className="icon-btn navbar__toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Search bar that drops under the header (tablet + mobile) */}
        {searchOpen && (
          <div className="navbar__searchbar">
            <form className="container" onSubmit={handleSearch}>
              <div className="navbar__search">
                <Search size={18} />
                <input
                  type="search"
                  placeholder="Search our menu..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search products"
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
      </header>
{/* Phone: slim top bar with just the logo (the main navbar is hidden on phones) */}
<div className="mobile-topbar">
  <Link to="/" aria-label="Berga Ice Coffee home" onClick={closeAll}>
    <img src="src/assets/logo.png" alt="Berga Ice Coffee" />
  </Link>
</div>
      {/* Phone: search bar that opens just above the bottom tab bar */}
      {searchOpen && (
        <div className="bottom-searchbar">
          <form className="container" onSubmit={handleSearch}>
            <div className="navbar__search">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search our menu..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search products"
                autoFocus
              />
            </div>
          </form>
        </div>
      )}

      {/* Phone: bottom tab bar (replaces the top navbar on small screens) */}
      <nav className="bottom-nav" aria-label="Mobile navigation">
        <NavLink to="/" end aria-label="Home" onClick={closeAll}>
          <House size={24} />
        </NavLink>
        <NavLink to="/shop" aria-label="Shop" onClick={closeAll}>
          <Coffee size={24} />
        </NavLink>
        <button
          className={searchOpen ? "is-active" : ""}
          onClick={toggleSearch}
          aria-label="Search"
        >
          <Search size={24} />
        </button>
        <NavLink to="/wishlist" aria-label={`Wishlist, ${wishlistCount} items`} onClick={closeAll}>
          <span className="bottom-nav__icon">
            <Heart size={24} />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </span>
        </NavLink>
        <NavLink to="/cart" aria-label={`Cart, ${cartCount} items`} onClick={closeAll}>
          <span className="bottom-nav__icon">
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </span>
        </NavLink>
      </nav>
    </>
  );
}
