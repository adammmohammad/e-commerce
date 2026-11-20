export type CategoryIcon = "CupSoda" | "Snowflake" | "Coffee" | "Leaf";

export interface Category {
  label: string; // text shown on the homepage
  value: string; // must match `category` in data/products.ts exactly
  icon: CategoryIcon;
}

export const categories: Category[] = [
  { label: "Lattes", value: "Latte", icon: "CupSoda" },
  { label: "Cold Brew", value: "Cold Brew", icon: "Snowflake" },
  { label: "Mocha", value: "Chocolate", icon: "Coffee" },
  { label: "Matcha", value: "Matcha", icon: "Leaf" },
];
