
import { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "../../data/products";

interface Props {
  product: Product;
  isWishlisted?: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
}

export default function BestsellerCard({
  product,
  isWishlisted = false,
  onAddToCart,
  onToggleWishlist,
}: Props) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;

    const timer = setTimeout(() => {
      setAdded(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [added]);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAdded(true);
  };

  return (
    <article className="bestseller-card">
      <button
        className={`bestseller-card__heart ${
          isWishlisted ? "is-active" : ""
        }`}
        onClick={() => onToggleWishlist(product)}
        aria-label={
          isWishlisted ? "Remove from wishlist" : "Add to wishlist"
        }
      >
        <Heart
          size={22}
          fill={isWishlisted ? "currentColor" : "none"}
        />
      </button>

      <img src={product.image} alt={product.name} />

      <div className="bestseller-card__info">
        <h3>{product.name}</h3>

        <p className="bestseller-card__price">
          ${product.price.toFixed(2)}
        </p>

        <button
          className={`btn btn-primary ${added ? "added" : ""}`}
          onClick={handleAddToCart}
        >
          <ShoppingCart size={16} />
          {added ? "✓ Added" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

