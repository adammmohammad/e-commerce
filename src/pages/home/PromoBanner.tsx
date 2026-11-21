import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="promo" id="about">
      {/* Decorative photo (ice cubes + beans) on the right */}
      <img className="promo__image" src="src/assets/promo-bg.jpg" alt="" aria-hidden="true" />

      <div className="container promo__inner">
        <div className="promo__text">
          <h2>More Than Just Coffee.</h2>
          <p>A refreshing experience in every sip.</p>
        </div>

        <div className="promo__cta">
          <Link to="/shop" className="btn btn-outline">
            Learn More <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
