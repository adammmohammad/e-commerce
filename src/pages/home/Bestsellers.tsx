import { products, type Product } from "../../data/products";
import BestsellerCard from "./BestsellerCard";

// Ids of the products shown on the homepage
const BESTSELLER_IDS = [1, 2, 3, 4];
const featured = products.filter((p) => BESTSELLER_IDS.includes(p.id));

export default function Bestsellers() {
  // TODO: connect to the cart / wishlist store when it is merged
  const handleAddToCart = (p: Product) => console.log("add to cart", p.id);
  const handleToggleWishlist = (p: Product) => console.log("toggle wishlist", p.id);

  return (
    <section className="bestsellers">
      <div className="container">
        <h2 className="section-title">Our Bestsellers</h2>
        <div className="bestsellers__grid">
          {featured.map((p) => (
            <BestsellerCard
              key={p.id}
              product={p}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
}