
export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Iced Caramel Latte",
    price: 5.0,
    category: "Latte",
    description: "Smooth espresso with cold milk and sweet caramel.",
    image: "/images/iced-caramel-latte.jpg",
  },
  {
    id: 2,
    name: "Iced Vanilla Latte",
    price: 4.5,
    category: "Latte",
    description: "Fresh espresso blended with milk and vanilla.",
    image: "/images/iced-vanilla-latte.jpg",
  },
  {
    id: 3,
    name: "Iced Mocha",
    price: 5.5,
    category: "Chocolate",
    description: "A delicious mix of espresso, milk, and chocolate.",
    image: "/images/iced-mocha.jpg",
  },
  {
    id: 4,
    name: "Iced Spanish Latte",
    price: 5.5,
    category: "Latte",
    description: "Rich espresso with creamy milk and condensed milk.",
    image: "/images/iced-spanish-latte.jpg",
  },
  {
    id: 5,
    name: "Iced Matcha",
    price: 6.0,
    category: "Matcha",
    description: "Refreshing Japanese matcha with cold milk.",
    image: "/images/iced-matcha.jpg",
  },
  
  {
    id: 7,
    name: "Iced Hazelnut Latte",
    price: 5.5,
    category: "Latte",
    description: "Espresso and cold milk with rich hazelnut flavor.",
    image: "/images/iced-hazelnut-latte.jpg",
  },
  
  {
    id: 9,
    name: "Iced White Mocha",
    price: 5.75,
    category: "Chocolate",
    description: "Espresso mixed with milk and sweet white chocolate.",
    image: "/images/iced-white-mocha.jpg",
  },
  {
    id: 10,
    name: "Iced Americano",
    price: 3.5,
    category: "Cold Brew",
    description: "Bold espresso poured over ice and cold water.",
    image: "/images/iced-americano.jpg",
  },
  
  {
    id: 12,
    name: "Strawberry Iced Latte",
    price: 6.0,
    category: "Specialty",
    description: "Cold milk and espresso with a sweet strawberry twist.",
    image: "/images/strawberry-iced-latte.jpg",
  },
];
