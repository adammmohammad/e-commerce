import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Checkout from "./Checkout";
import { useShop } from "../context/useShop";
import type { Product } from "../data/products";

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

function setup(cart = [{ product: latte, quantity: 2 }]) {
  const removeFromCart = vi.fn();
  vi.mocked(useShop).mockReturnValue({
    cart,
    subtotal: 10,
    removeFromCart,
  } as unknown as ReturnType<typeof useShop>);

  const onOrderPlaced = vi.fn();
  const onBack = vi.fn();
  render(<Checkout onBack={onBack} onOrderPlaced={onOrderPlaced} />);
  return { removeFromCart, onOrderPlaced, onBack };
}

const placeOrder = () => userEvent.click(screen.getByRole("button", { name: /Place Order/ }));

async function fillForm(overrides: Partial<Record<"name" | "email" | "phone" | "address", string>> = {}) {
  const v = {
    name: "Sara Khoury",
    email: "sara@example.com",
    phone: "+961 70 123 456",
    address: "Main street, building 4, Akkar",
    ...overrides,
  };
  if (v.name) await userEvent.type(screen.getByLabelText("Full Name"), v.name);
  if (v.email) await userEvent.type(screen.getByLabelText("Email Address"), v.email);
  if (v.phone) await userEvent.type(screen.getByLabelText("Phone Number"), v.phone);
  if (v.address) await userEvent.type(screen.getByLabelText("Full Address"), v.address);
}

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe("Checkout validation", () => {
  it("shows an error next to every field when the form is empty, and does not submit", async () => {
    const { onOrderPlaced, removeFromCart } = setup();
    await placeOrder();

    expect(screen.getByText("Enter your full name")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid phone number")).toBeInTheDocument();
    expect(screen.getByText("Enter your delivery address")).toBeInTheDocument();

    // nothing was submitted
    expect(onOrderPlaced).not.toHaveBeenCalled();
    expect(removeFromCart).not.toHaveBeenCalled();
    expect(localStorage.getItem("coffee_orders")).toBeNull();
  });

  it("shows the error only under the invalid field", async () => {
    const { onOrderPlaced } = setup();
    await fillForm({ email: "not-an-email" });
    await placeOrder();

    expect(screen.getByText("Enter a valid email address")).toBeInTheDocument();
    expect(screen.queryByText("Enter your full name")).not.toBeInTheDocument();
    expect(screen.queryByText("Enter a valid phone number")).not.toBeInTheDocument();
    expect(screen.queryByText("Enter your delivery address")).not.toBeInTheDocument();
    expect(onOrderPlaced).not.toHaveBeenCalled();
  });

  it("places the order when the form is valid", async () => {
    const { onOrderPlaced, removeFromCart } = setup();
    await fillForm();
    await placeOrder();

    expect(onOrderPlaced).toHaveBeenCalledTimes(1);
    expect(removeFromCart).toHaveBeenCalledWith(1); // cart is cleared

    const orders = JSON.parse(localStorage.getItem("coffee_orders") || "[]");
    expect(orders).toHaveLength(1);
    expect(orders[0].customer.email).toBe("sara@example.com");
    expect(orders[0].total).toBe(13); // $10 subtotal + $3 shipping
  });

  it("does not let you check out with an empty cart", () => {
    setup([]);

    expect(screen.getByText("No items to checkout")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Place Order/ })).not.toBeInTheDocument();
  });
});
