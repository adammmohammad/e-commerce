import Hero from "./Hero";
import Categories from "./Categories";
import Bestsellers from "./Bestsellers";
import PromoBanner from "./PromoBanner";
import "../../styles/home.css";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Bestsellers />
      <PromoBanner />
    </>
  );
}