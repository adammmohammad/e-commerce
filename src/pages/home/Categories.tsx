import { Link } from "react-router-dom";
import { CupSoda, Snowflake, Coffee, Leaf, type LucideIcon } from "lucide-react";
import { categories, type CategoryIcon } from "../../data/categories";

const icons: Record<CategoryIcon, LucideIcon> = { CupSoda, Snowflake, Coffee, Leaf };

export default function Categories() {
  return (
    <section className="categories">
      <div className="container categories__grid">
        {categories.map(({ label, value, icon }) => {
          const Icon = icons[icon];
          return (
            <Link key={value} to={`/shop?category=${encodeURIComponent(value)}`} className="category">
              <span className="category__icon"><Icon size={30} /></span>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}