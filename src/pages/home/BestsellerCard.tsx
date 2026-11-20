import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "../../data/products";

interface Props {
  product: Product;
  isWishlisted?: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
}

// Compact horizontal card used only on the homepage.
// (The shop page uses its own ProductCard in components/products.)
export default function BestsellerCard({ product, isWishlisted = false, onAddToCart, onToggleWishlist }: Props) {
  return (
    <article className="bestseller-card">
      <button
        className={`bestseller-card__heart ${isWishlisted ? "is-active" : ""}`}
        onClick={() => onToggleWishlist(product)}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      <img src={product.image} alt={product.name} />

      <div className="bestseller-card__info">
        <h3>{product.name}</h3>
        <p className="bestseller-card__price">${product.price.toFixed(2)}</p>
        <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </article>
  );
}