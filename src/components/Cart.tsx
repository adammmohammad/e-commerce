
import { useShop } from "../context/ShopContext";
import "../styles/shopping.css";

interface CartProps {
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export default function Cart({
  onCheckout,
  onContinueShopping,
}: CartProps) {
  const { cart, removeFromCart, updateQuantity, subtotal } = useShop();

  const shipping = subtotal >= 30 ? 0 : 3;
  const total = subtotal + shipping;

  return (
    <main className="shopping-page">
      <div className="shopping-heading">
        <span className="eyebrow">YOUR COFFEE SELECTION</span>
        <h1>Shopping Cart</h1>
        <p>Your favorite coffee moments are just a few steps away.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">☕</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any coffee yet.</p>
          <button className="coffee-button" onClick={onContinueShopping}>
            Explore Coffee
          </button>
        </div>
      ) : (
        <div className="shopping-layout">
          <section className="cart-items">
            <div className="section-top">
              <h2>Your Items</h2>
              <span>{cart.length} products</span>
            </div>

            {cart.map((item) => (
              <article className="coffee-item" key={item.product.id}>
                <img
                  className="coffee-item-image"
                  src={item.product.image}
                  alt={item.product.name}
                />

                <div className="coffee-item-info">
                  <span className="eyebrow">COFFEE SELECTION</span>
                  <h3>{item.product.name}</h3>
                  <p>{item.product.description}</p>
                  <strong>${item.product.price.toFixed(2)}</strong>
                </div>

                <div className="coffee-item-actions">
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity - 1
                        )
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity + 1
                        )
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <strong>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}

            <button
              className="text-button"
              onClick={onContinueShopping}
            >
              ← Continue Shopping
            </button>
          </section>

          <aside className="order-summary">
            <span className="eyebrow">YOUR ORDER</span>
            <h2>Order Summary</h2>

            <div className="summary-line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-line">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>

            <p className="shipping-note">
              {shipping === 0
                ? "You've unlocked free shipping!"
                : "Free shipping on orders over $30."}
            </p>

            <div className="summary-total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <button className="coffee-button full-button" onClick={onCheckout}>
              Proceed to Checkout →
            </button>

            <p className="secure-note">☕ Made with love and fresh coffee</p>
          </aside>
        </div>
      )}
    </main>
  );
}
