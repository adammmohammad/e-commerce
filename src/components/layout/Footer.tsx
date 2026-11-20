import { Link } from "react-router-dom";
import "../../styles/footer.css";
import logo from "../../assets/logo.png"; 
export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="Berga Ice Coffee" />
          <p>Coffee made for your moments.</p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <Link to="/#about">About Us</Link>
          <Link to="/#contact">Contact</Link>
        </nav>

        <p className="footer__copy">© {new Date().getFullYear()} Berga. All rights reserved.</p>
      </div>
    </footer>
  );
}
