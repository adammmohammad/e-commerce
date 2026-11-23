import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Cart from "./Cart";
import { useShop } from "../context/useShop";
import type { Product } from "../data/products";

// Replace the real shop state with a fake one, so these tests only check the Cart page
vi.mock("../context/useShop", () => ({
  useShop: vi.fn(),
}));

const latte: Product = {
  id: 1,
  name: "Iced Caramel Latte",
  price: 5,
  category: "Latte",
  description: "Smooth espresso with cold milk and sweet caramel.",
  image: "/images/iced-caramel-latte.jpg",
};

type Item = { product: Product; quantity: number };

function setup(cart: Item[], subtotal: number) {
  const removeFromCart = vi.fn();
  const updateQuantity = vi.fn();
  vi.mocked(useShop).mockReturnValue({
    cart,
    subtotal,
    removeFromCart,
    updateQuantity,
  } as unknown as ReturnType<typeof useShop>);

  const onCheckout = vi.fn();
  const onContinueShopping = vi.fn();
  render(<Cart onCheckout={onCheckout} onContinueShopping={onContinueShopping} />);
  return { removeFromCart, updateQuantity, onCheckout, onContinueShopping };
}

const summaryRow = (label: string) =>
  screen.getByText(label).closest("div") as HTMLElement;

beforeEach(() => vi.clearAllMocks());

describe("Cart page", () => {
  it("shows a message and a way back to shopping when the cart is empty", async () => {
    const { onContinueShopping } = setup([], 0);

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Explore Coffee" }));
    expect(onContinueShopping).toHaveBeenCalledTimes(1);
  });

  it("lists the products with their line totals", () => {
    setup([{ product: latte, quantity: 2 }], 10);

    expect(screen.getByRole("heading", { name: "Iced Caramel Latte" })).toBeInTheDocument();
    expect(screen.getByText("$10.00", { selector: "strong" })).toBeInTheDocument(); // 2 x $5.00
  });

  it("adds $3.00 shipping when the subtotal is under $30", () => {
    setup([{ product: latte, quantity: 2 }], 10);

    expect(summaryRow("Subtotal")).toHaveTextContent("$10.00");
    expect(summaryRow("Shipping")).toHaveTextContent("$3.00");
    expect(summaryRow("Total")).toHaveTextContent("$13.00");
  });

  it("gives free shipping from $30", () => {
    setup([{ product: latte, quantity: 7 }], 35);

    expect(summaryRow("Shipping")).toHaveTextContent("Free");
    expect(summaryRow("Total")).toHaveTextContent("$35.00");
  });

  it("increases and decreases the quantity", async () => {
    const { updateQuantity } = setup([{ product: latte, quantity: 2 }], 10);

    await userEvent.click(screen.getByRole("button", { name: "Increase quantity" }));
    expect(updateQuantity).toHaveBeenLastCalledWith(1, 3);

    await userEvent.click(screen.getByRole("button", { name: "Decrease quantity" }));
    expect(updateQuantity).toHaveBeenLastCalledWith(1, 1);
  });

  it("removes a product", async () => {
    const { removeFromCart } = setup([{ product: latte, quantity: 1 }], 5);

    const item = screen.getByRole("heading", { name: "Iced Caramel Latte" }).closest("article")!;
    await userEvent.click(within(item).getByRole("button", { name: "Remove" }));
    expect(removeFromCart).toHaveBeenCalledWith(1);
  });

  it("goes to checkout", async () => {
    const { onCheckout } = setup([{ product: latte, quantity: 1 }], 5);

    await userEvent.click(screen.getByRole("button", { name: /Proceed to Checkout/ }));
    expect(onCheckout).toHaveBeenCalledTimes(1);
  });
});
