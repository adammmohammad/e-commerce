# ☕ Berga Ice Coffee

> **Refresh. Enjoy. Repeat.**

Berga is a responsive e-commerce website for an iced coffee shop, built with **React** and **TypeScript**.
Visitors can browse the menu, search and filter drinks, save favourites to a wishlist, manage a shopping cart
and complete a simulated checkout.

The whole app runs in the browser. There is **no backend, no database, no login and no real payment**:
the product list is a TypeScript file, and the cart, wishlist and orders are saved in `localStorage`.

This project was built by a team as a React + TypeScript e-commerce assignment.

---

## ✨ Features

### Pages

| Page | Route | What it does |
| --- | --- | --- |
| Home | `/` | Hero banner, product categories, bestsellers and a promo banner |
| Shop | `/shop` | All products with search, category filter, price range and sorting |
| Wishlist | `/wishlist` | Saved products; add them to the cart or remove them |
| Cart | `/cart` | Change quantities, remove items, see subtotal, shipping and total |
| Checkout | `/checkout` | Contact and delivery form with validation, then a simulated order |
| Order success | `/order-success` | Thank-you page shown after an order is placed |
| 404 | any other URL | "Page Not Found" message |

### Highlights

- **Search and filters:** search by name, filter by category, set a minimum and maximum price, and sort by price or name.
  Search and category live in the URL (`/shop?search=latte`, `/shop?category=Matcha`), so the navbar search and the
  homepage category links open the shop already filtered.
- **Empty states:** friendly messages when no products match, or when the cart or wishlist is empty.
- **Live counters:** the heart and cart icons in the navbar show how many items are saved.
- **Persistent data:** cart and wishlist survive a page refresh. No account needed.
- **Shipping rule:** $3.00 shipping, free for orders of $30 or more.
- **Checkout validation:** errors appear next to each invalid field, and an invalid form is never submitted.
  Checkout is blocked when the cart is empty. The wishlist is not touched by checkout.
- **Responsive design:** desktop navbar, a tablet layout with a collapsible menu, and a phone layout with a
  bottom tab bar (Home, Shop, Search, Wishlist, Cart).
- **Small touches:** "✓ Added" feedback on *Add to Cart*, smooth scrolling to the About and Contact sections,
  accessible labels on icon buttons.

---

## 🛠️ Technologies

| Technology | Used for |
| --- | --- |
| [React 19](https://react.dev) | User interface |
| [TypeScript](https://www.typescriptlang.org) | Type safety across the whole app |
| [Vite](https://vite.dev) | Dev server and build tool |
| [React Router 7](https://reactrouter.com) | Navigation, URL parameters |
| React Context + `useState` / `useEffect` | Shared cart and wishlist state |
| [Zod](https://zod.dev) | Checkout form validation |
| [lucide-react](https://lucide.dev) | Icons |
| [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) | Automated tests |
| ESLint | Code quality |
| Plain CSS | Styling (CSS variables for the brand colours) |

---

## 🚀 Getting started

**Requirements:** [Node.js](https://nodejs.org) **20.19 or newer** (or 22.12+) and npm.

```bash
# 1. Clone the repository
git clone https://github.com/adammmohammad/e-commerce.git
cd e-commerce

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open the address Vite prints, usually **http://localhost:5173**.

### Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Type-checks the project and creates a production build in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |
| `npm test` | Runs all automated tests once |
| `npm run test:watch` | Runs the tests again every time you save |

---

## 🧪 Testing

Tests use **Vitest** and **React Testing Library**. Run them with:

```bash
npm test
```

| Test file | What it checks |
| --- | --- |
| `src/pages/Products.test.tsx` | **Product filtering:** all products show by default; search narrows the list; category and search from the URL work; a message shows when nothing matches; price sorting works |
| `src/context/ShopContext.test.tsx` | **Shopping cart:** adding a product updates the cart; adding twice increases the quantity; subtotal and item count; removing items; cart and wishlist persist after a refresh; wishlist has no duplicates |
| `src/components/Checkout.test.tsx` | **Checkout validation:** an empty form shows an error next to every field and is not submitted; only the invalid field shows an error; a valid form places the order; an empty cart cannot check out |
| `src/components/Cart.test.tsx` | Cart page: empty state, line totals, shipping rule, quantity buttons, remove, proceed to checkout |
| `src/components/layout/Navbar.test.tsx` | Navbar links and the search that sends you to `/shop?search=...` |

---

## 📁 Project structure

```text
src/
├── main.tsx                  App entry point (React + Router)
├── App.tsx                   Routes and the shop provider
├── index.css                 Global styles and brand colour variables
├── assets/                   Images (logo, hero, promo, product photos)
├── components/
│   ├── Cart.tsx              Cart page
│   ├── Wishlist.tsx          Wishlist page
│   ├── Checkout.tsx          Checkout page
│   ├── layout/               Navbar, Footer, Layout (shared by every page)
│   └── products/             ProductCard used on the shop page
├── context/
│   ├── ShopContextValue.ts   The context object and its TypeScript type
│   ├── ShopContext.tsx       ShopProvider: cart + wishlist state, saved to localStorage
│   └── useShop.ts            Hook to read the shared state
├── data/
│   ├── products.ts           The product list and the Product type
│   └── categories.ts         Homepage category tiles
├── hooks/useCounts.ts        Cart and wishlist counters for the navbar
├── pages/
│   ├── Products.tsx          Shop page (search, filters, sorting)
│   └── home/                 Home page sections: Hero, Categories, Bestsellers, PromoBanner
├── schemas/checkoutSchema.ts Zod rules for the checkout form
├── styles/                   navbar.css, footer.css, home.css, shopping.css
├── test/setup.ts             Test setup
└── types/product.ts          Shared Product and CartItem types
```

---

## 🧠 How it works

**Shared state.** `ShopProvider` (in `src/context/ShopContext.tsx`) wraps the whole app. It holds the `cart` and
`wishlist` arrays and the functions that change them (`addToCart`, `removeFromCart`, `updateQuantity`,
`toggleWishlist`). Any component can read them with the `useShop()` hook, so the navbar badges, product cards,
cart and checkout always stay in sync.

**Persistence.** Whenever the cart or wishlist changes, a `useEffect` saves it to `localStorage`
(`coffee_cart`, `coffee_wishlist`). When the app starts, the same keys are read back, so nothing is lost on refresh.
Completed orders are saved under `coffee_orders`.

**Filtering.** The shop page filters the `products` array by name, category and price, then sorts it. Search and
category are stored in the URL with `useSearchParams`, which is why links from other pages can open a filtered shop.

**Validation.** The checkout form is checked with a Zod schema (`src/schemas/checkoutSchema.ts`) before anything
is saved. Each invalid field gets its own message, shown right under the field.

---

## 🎨 Design

| | |
| --- | --- |
| Main colour | Deep burgundy `#641C32` |
| Secondary | White `#FFFFFF` |
| Background | Cream `#F4EDE5` |
| Headings | Playfair Display |
| Body text | Inter |

---

## 🤝 Team and workflow

| Team member | Responsibilities |
| --- | --- |
| **Adam Mohammad** (`@adammmohammad`) | Navbar, footer, homepage (hero, categories, bestsellers, promo banner), responsive layout |
| **Suhaila Abed ElAal** (`@suhaila-abdlaal`) | Shop page, product cards, search and filters |
| **Akram Said** (`@akramweb2002`) | Cart, wishlist, checkout, shared state |


We worked in one shared GitHub repository:

- `main` holds the finished project, and `dev` is where features are combined and tested.
- Each developer built their features on a separate branch created from `dev`.
- Changes reached `dev` through pull requests that a teammate reviewed first.
- `dev` was merged into `main` after the complete app was tested.

---

## 🔮 Possible improvements

- A "Clear cart" button on the cart page.
- An order confirmation that shows an order reference number and a summary of the order.
- Serve the images from the `public/` folder (or import them) so they also appear in the production build.
- Compress the large logo image to speed up the first load.
- Product detail pages and a real backend with payments.

---

## 📄 License

Built for educational purposes. No real payments are processed.