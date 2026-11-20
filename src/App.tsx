import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Products from "./pages/Products";

// Placeholders: teammates replace these when their pages are merged
const Placeholder = ({ name }: { name: string }) => (
  <div className="container" style={{ padding: "4rem 0" }}>
    <h1>{name} page (coming soon)</h1>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/cart" element={<Placeholder name="Cart" />} />
        <Route path="/wishlist" element={<Placeholder name="Wishlist" />} />
        <Route path="/checkout" element={<Placeholder name="Checkout" />} />
        <Route path="*" element={<Placeholder name="404" />} />
      </Route>
    </Routes>
  );
}
