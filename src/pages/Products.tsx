
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/products/ProductCard";
import { useShop } from "../context/useShop";
import "./Products.css";

function Products() {
  // Connect Products page with Cart and Wishlist
  const { addToCart, toggleWishlist } = useShop();

  // Search and category are stored in the URL
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "All";

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);

    if (value && value !== "All") {
      next.set(key, value);
    } else {
      next.delete(key);
    }

    setSearchParams(next, { replace: true });
  };

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [sort, setSort] = useState("default");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(
      (product) =>
        category === "All" || product.category === category
    )
    .filter(
      (product) =>
        product.price >= minPrice && product.price <= maxPrice
    )
    .sort((a, b) => {
      if (sort === "low-high") {
        return a.price - b.price;
      }

      if (sort === "high-low") {
        return b.price - a.price;
      }

      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }

      return 0;
    });

  return (
    <div className="products-page">
      <section className="products-header">
        <p className="products-subtitle">DISCOVER YOUR FAVORITE</p>
        <h1>Our Iced Coffee Menu</h1>
        <p>Freshly made, perfectly chilled, and ready for you.</p>
      </section>

      <section className="products-container">
        <div className="products-toolbar">
          <input
            type="text"
            placeholder="Search for coffee..."
            value={search}
            onChange={(e) => updateParam("search", e.target.value)}
            className="search-input"
          />

          <select
            value={category}
            onChange={(e) => updateParam("category", e.target.value)}
            className="filter-select"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>

          <div className="price-filter">
            <input
              type="number"
              min="0"
              placeholder="Min $"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />

            <input
              type="number"
              min="0"
              placeholder="Max $"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="filter-select"
          >
            <option value="default">Default Sorting</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        <p className="results-count">
          Showing {filteredProducts.length} products
        </p>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onAddToWishlist={toggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h2>No products found</h2>
            <p>Try changing your search or filters.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Products;
