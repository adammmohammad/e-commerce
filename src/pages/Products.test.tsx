import { ShopProvider } from "../context/ShopContext";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Products from "./Products";

const renderShop = (url = "/shop") =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <ShopProvider>
        <Products />
      </ShopProvider>
    </MemoryRouter>
  );

describe("Product filtering", () => {
  it("shows every product when no filter is applied", () => {
    renderShop();
    expect(screen.getByText("Showing 9 products")).toBeInTheDocument();
  });

  it("filters by the search text", async () => {
    renderShop();
    await userEvent.type(screen.getByPlaceholderText("Search for coffee..."), "mocha");

    expect(screen.getByText("Showing 2 products")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Iced Mocha" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Iced White Mocha" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Iced Matcha" })).not.toBeInTheDocument();
  });

  it("filters by category from the URL (homepage category links)", () => {
    renderShop("/shop?category=Matcha");

    expect(screen.getByText("Showing 1 products")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Iced Matcha" })).toBeInTheDocument();
  });

  it("uses the search from the URL (navbar search)", () => {
    renderShop("/shop?search=americano");

    expect(screen.getByRole("heading", { name: "Iced Americano" })).toBeInTheDocument();
    expect(screen.getByText("Showing 1 products")).toBeInTheDocument();
  });

  it("shows a message when nothing matches", async () => {
    renderShop();
    await userEvent.type(screen.getByPlaceholderText("Search for coffee..."), "pizza");

    expect(screen.getByText("No products found")).toBeInTheDocument();
  });

  it("sorts by price from high to low", async () => {
    renderShop();
    await userEvent.selectOptions(screen.getByDisplayValue("Default Sorting"), "high-low");

    const names = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    // the two most expensive products ($6.00) come first
    expect(["Iced Matcha", "Strawberry Iced Latte"]).toContain(names[0]);
    expect(names[names.length - 1]).toBe("Iced Americano"); // cheapest, $3.50
  });
});
