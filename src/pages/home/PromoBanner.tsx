import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="promo" id="about">
      <div className="container promo__inner">
        <div>
          <h2>More Than Just Coffee.</h2>
          <p>A refreshing experience in every sip.</p>
        </div>
        <Link to="/shop" className="btn btn-outline">
          Learn More <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}