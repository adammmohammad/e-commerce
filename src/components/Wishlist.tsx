
import { useShop } from "../context/ShopContext";
import "../styles/shopping.css";

interface WishlistProps {
  onContinueShopping: () => void;
}

export default function Wishlist({
  onContinueShopping,
}: WishlistProps) {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  return (
    <main className="shopping-page">
      <div className="shopping-heading">
        <span className="eyebrow">YOUR FAVORITES</span>
        <h1>My Wishlist</h1>
        <p>All the coffee you love, saved in one place.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">♡</div>
          <h2>Your wishlist is empty</h2>
          <p>Save your favorite coffee products here.</p>
          <button className="coffee-button" onClick={onContinueShopping}>
            Discover Coffee
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <article className="wishlist-card" key={product.id}>
              <div className="wishlist-image-wrap">
                <img src={product.image} alt={product.name} />

                <button
                  className="favorite-button"
                  onClick={() => toggleWishlist(product)}
                  aria-label="Remove from wishlist"
                >
                  ♥
                </button>
              </div>

              <div className="wishlist-card-info">
                <span className="eyebrow">COFFEE COLLECTION</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>

                <div className="wishlist-card-bottom">
                  <strong>${product.price.toFixed(2)}</strong>

                  <button
                    className="coffee-button small-button"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
