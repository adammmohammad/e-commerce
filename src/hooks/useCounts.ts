
import { useShop } from "../context/ShopContext";

export const useCartCount = (): number => {
  const { cartCount } = useShop();
  return cartCount;
};

export const useWishlistCount = (): number => {
  const { wishlist } = useShop();
  return wishlist.length;
};
