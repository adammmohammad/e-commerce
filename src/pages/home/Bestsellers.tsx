
import { products, type Product } from "../../data/products";
import { useShop } from "../../context/ShopContext";
import BestsellerCard from "./BestsellerCard";

const BESTSELLER_IDS = [1, 2, 3, 4];
const featured = products.filter((p) => BESTSELLER_IDS.includes(p.id));

export default function Bestsellers() {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const handleAddToCart = (p: Product) => {
    addToCart(p);
  };

  const handleToggleWishlist = (p: Product) => {
    toggleWishlist(p);
  };

  return (
    <section className="bestsellers">
      <div className="container">
        <h2 className="section-title">Our Bestsellers</h2>

        <div className="bestsellers__grid">
          {featured.map((p) => (
            <BestsellerCard
              key={p.id}
              product={p}
              isWishlisted={isInWishlist(p.id)}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
