import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__eyebrow">Refresh · Enjoy · Repeat</p>
          <h1>
            Life is Better
            <em>Iced.</em>
          </h1>
          <p className="hero__sub">Premium iced coffee, anytime, anywhere.</p>
          <Link to="/shop" className="btn btn-primary">
            Shop Our Menu <ArrowRight size={18} />
          </Link>
        </div>
        <div className="hero__image">
          <img src="/images/hero-cup.png" alt="Berga iced coffee with ice cubes and coffee beans" />
        </div>
      </div>
    </section>
  );
}
