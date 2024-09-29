import Link from "next/link";

const EmptyCartPage = () => {
  return (
    <div className="flex justify-center mt-36 h-screen">
      <div>
        <div className="flex flex-col justify-center items-center gap-10">
          <div>
            <h1 className="text-3xl font-bold">Your cart is empty</h1>
          </div>
          <Link href={"/"}>
            <button className="bg-primary hover:bg-cyan-500 active:bg-cyan-600 px-20 py-4 font-bold rounded-full text-white ">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCartPage;
