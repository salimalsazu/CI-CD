import CartPage from "@/components/ProductPage/CartPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Shopping Cart",
};

const ProductCartPage = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <CartPage />
    </div>
  );
};

export default ProductCartPage;
