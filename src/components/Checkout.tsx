
import { useState, type FormEvent } from "react";
import { useShop } from "../context/ShopContext";
import "../styles/shopping.css";

interface CheckoutProps {
  onBack: () => void;
  onOrderPlaced: () => void;
}

export default function Checkout({
  onBack,
  onOrderPlaced,
}: CheckoutProps) {
  const { cart, subtotal, removeFromCart } = useShop();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [payment, setPayment] = useState("Cash on Delivery");

  const shipping = subtotal >= 30 ? 0 : 3;
  const total = subtotal + shipping;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (cart.length === 0) return;

    const order = {
      id: Date.now(),
      customer,
      products: cart,
      payment,
      subtotal,
      shipping,
      total,
      date: new Date().toISOString(),
    };

    const previousOrders = JSON.parse(
      localStorage.getItem("coffee_orders") || "[]"
    );

    localStorage.setItem(
      "coffee_orders",
      JSON.stringify([...previousOrders, order])
    );

    cart.forEach((item) => removeFromCart(item.product.id));

    onOrderPlaced();
  }

  if (cart.length === 0) {
    return (
      <main className="shopping-page">
        <div className="empty-state">
          <div className="empty-icon">☕</div>
          <h2>No items to checkout</h2>
          <p>Add some coffee to your cart first.</p>
          <button className="coffee-button" onClick={onBack}>
            Back to Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="shopping-page">
      <div className="shopping-heading">
        <span className="eyebrow">ALMOST THERE</span>
        <h1>Checkout</h1>
        <p>Complete your details and get ready for your coffee.</p>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <section className="checkout-form">
          <div className="checkout-section">
            <span className="eyebrow">STEP 01</span>
            <h2>Contact Information</h2>

            <div className="form-field">
              <label htmlFor="customer-name">Full Name</label>
              <input
                id="customer-name"
                type="text"
                placeholder="Your full name"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="customer-email">Email Address</label>
              <input
                id="customer-email"
                type="email"
                placeholder="you@example.com"
                value={customer.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="customer-phone">Phone Number</label>
              <input
                id="customer-phone"
                type="tel"
                placeholder="+961 ..."
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="checkout-section">
            <span className="eyebrow">STEP 02</span>
            <h2>Delivery Address</h2>

            <div className="form-field">
              <label htmlFor="customer-address">Full Address</label>
              <textarea
                id="customer-address"
                placeholder="Street, building, area..."
                rows={3}
                value={customer.address}
                onChange={(e) =>
                  setCustomer({ ...customer, address: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="checkout-section">
            <span className="eyebrow">STEP 03</span>
            <h2>Payment Method</h2>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={payment === "Cash on Delivery"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <span>
                <strong>Cash on Delivery</strong>
                <small>Pay when your coffee arrives.</small>
              </span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Credit / Debit Card (Demo)"
                checked={payment === "Credit / Debit Card (Demo)"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <span>
                <strong>Credit / Debit Card</strong>
                <small>Demo selection — no real payment is processed.</small>
              </span>
            </label>
          </div>

          <button type="button" className="text-button" onClick={onBack}>
            ← Back to Cart
          </button>
        </section>

        <aside className="order-summary checkout-summary">
          <span className="eyebrow">YOUR ORDER</span>
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="checkout-product" key={item.product.id}>
              <img src={item.product.image} alt={item.product.name} />
              <div>
                <strong>{item.product.name}</strong>
                <small>Quantity: {item.quantity}</small>
              </div>
              <strong>
                ${(item.product.price * item.quantity).toFixed(2)}
              </strong>
            </div>
          ))}

          <div className="summary-line">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-line">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <button type="submit" className="coffee-button full-button">
            Place Order →
          </button>

          <p className="secure-note">
            Thank you for choosing our coffee shop!
          </p>
        </aside>
      </form>
    </main>
  );
}
