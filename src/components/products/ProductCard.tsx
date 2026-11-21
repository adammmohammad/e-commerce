
import { useEffect, useState } from "react";
import type { Product } from "../../data/products";
import { useShop } from "../../context/ShopContext";
import "./ProductCard.css";

type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
};

function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
}: ProductCardProps) {
  const { isInWishlist } = useShop();

  const [addedCount, setAddedCount] = useState(0);
  const isFavorite = isInWishlist(product.id);

  useEffect(() => {
    if (addedCount === 0) return;

    const timer = setTimeout(() => {
      setAddedCount(0);
    }, 1500);

    return () => clearTimeout(timer);
  }, [addedCount]);

  const handleAddToCart = () => {
    if (!onAddToCart) return;

    onAddToCart(product);
    setAddedCount((previous) => previous + 1);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />

        <button
          className={`wishlist-button ${isFavorite ? "active" : ""}`}
          onClick={() => onAddToWishlist?.(product)}
          aria-label={
            isFavorite
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-bottom">
          <span className="product-price">
            ${product.price.toFixed(2)}
          </span>

          <button
            className={`add-cart-button ${
              addedCount > 0 ? "added" : ""
            }`}
            onClick={handleAddToCart}
          >
            {addedCount > 0 ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
