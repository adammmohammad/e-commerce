
import type { Product } from "../../data/products";
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
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />

        <button
          className="wishlist-button"
          onClick={() => onAddToWishlist?.(product)}
          aria-label={`Add ${product.name} to wishlist`}
        >
          ♡
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
            className="add-cart-button"
            onClick={() => onAddToCart?.(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
