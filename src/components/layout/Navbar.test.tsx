import { ShopProvider } from "../../context/ShopContext";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Navbar from "./Navbar";

// Small helper that prints the current URL so the test can read it
function ShowLocation() {
  const { pathname, search } = useLocation();
  return <p data-testid="location">{pathname + search}</p>;
}

const renderNavbar = () =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <ShopProvider>
        <Navbar />
        <ShowLocation />
      </ShopProvider>
    </MemoryRouter>
  );

describe("Navbar", () => {
  it("has working links to every page", () => {
    renderNavbar();
    // the Shop link exists twice (top navbar + phone bottom bar), so check them all
    for (const link of screen.getAllByRole("link", { name: "Shop" })) {
      expect(link).toHaveAttribute("href", "/shop");
    }
    expect(screen.getAllByRole("link", { name: /^Wishlist/ })[0]).toHaveAttribute("href", "/wishlist");
    expect(screen.getAllByRole("link", { name: /^Cart/ })[0]).toHaveAttribute("href", "/cart");
  });

  it("sends the search text to the shop page", async () => {
    renderNavbar();
    const input = screen.getAllByLabelText("Search products")[0];
    await userEvent.type(input, "latte{Enter}");

    expect(screen.getByTestId("location")).toHaveTextContent("/shop?search=latte");
  });
});
