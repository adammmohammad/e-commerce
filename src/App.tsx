
import { Route, Routes, useNavigate } from "react-router-dom";

import { ShopProvider } from "./context/ShopContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Products from "./pages/Products";

import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Checkout from "./components/Checkout";

function CartPage() {
  const navigate = useNavigate();

  return (
    <Cart
      onCheckout={() => navigate("/checkout")}
      onContinueShopping={() => navigate("/shop")}
    />
  );
}

function WishlistPage() {
  const navigate = useNavigate();

  return (
    <Wishlist onContinueShopping={() => navigate("/shop")} />
  );
}

function CheckoutPage() {
  const navigate = useNavigate();

  return (
    <Checkout
      onBack={() => navigate("/cart")}
      onOrderPlaced={() => navigate("/order-success")}
    />
  );
}

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <main className="shopping-page">
      <div className="empty-state">
        <div className="empty-icon">☕</div>
        <h2>Thank you for your order!</h2>
        <p>Your coffee order has been saved successfully.</p>
        <button
          className="coffee-button"
          onClick={() => navigate("/shop")}
        >
          Continue Shopping
        </button>
      </div>
    </main>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route
          path="*"
          element={<h2>404 - Page Not Found</h2>}
        />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppRoutes />
    </ShopProvider>
  );
}
