import { fileUrlKey } from "@/helpers/config/envConfig";
import {
  addPayAmount,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "@/redux/slice/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuIdv4 } from "uuid";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Drawer, Placeholder } from "rsuite";
import { Tooltip, Whisper, Button, ButtonToolbar } from "rsuite";
import useMediaQuery from "@/hooks/useMediaQuiry";
import EmptyCart from "./EmptyCart";
import { RiDeleteBinLine } from "react-icons/ri";

const Cart = ({ cartOpen, setCartOpen }: any) => {
  const isLarge = useMediaQuery("(min-width: 640px)");

  // console.log(isLarge);
  const cart = useSelector((state: any) => state.cart.cart);
  const dispatch = useDispatch();

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart?.forEach((item: any) => {
      totalQuantity += item?.quantity;
      totalPrice += item?.price * item?.quantity;
    });
    return { totalQuantity, totalPrice };
  };
  const checkoutId = uuIdv4();
  const checkoutHandler = () => {
    setCartOpen(false);
    dispatch(
      addPayAmount({ subtotal: getTotal().totalPrice, checkoutId } as any)
    );
  };

  return (
    <div>
      <Drawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        size={isLarge ? "xs" : "full"}
      >
        <Drawer.Header>Cart</Drawer.Header>
        <Drawer.Body
          style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
          // className="relative"
        >
          {cart?.length > 0 ? (
            <>
              <div className="p-6 bg-white mb-32">
                {/* <div className="flex justify-between items-center">
                  <div className="flex items-center mt-3 mb-7">
                    <h2 className="text-xl font-bold">Cart</h2>
                    <span className="inline-flex items-center justify-center w-7 h-7 ml-3 text-sm font-bold bg-secondary rounded-full text-gray-50">
                      {getTotal().totalQuantity}
                    </span>
                  </div>
                  <div className="text-right">
                    <Whisper
                      placement="top"
                      controlId="control-id-hover"
                      trigger="hover"
                      speaker={tooltip}
                    >
                      <button className="text-gray-700 ">Clear all</button>
                    </Whisper>
                  </div>
                </div> */}
                <div>
                  {cart?.length > 0 &&
                    cart?.map((item: any) => (
                      <div key={item?.productId} className="mb-7">
                        <div className="flex gap-2">
                          <div className="w-1/5">
                            <Image
                              width={80}
                              height={80}
                              src={`${fileUrlKey()}/${item?.image}`}
                              alt={item?.productName}
                              className="w-20 h-20 object-cover rounded-md"
                            />
                          </div>
                          <div className="w-4/5 flex flex-col">
                            <div className="flex justify-between items-center w-full">
                              <p className="font-bold text-sm">
                                {`${item?.productName} - ${item?.color?.name}`}
                              </p>
                              <div className="flex items-center justify-center">
                                {item?.quantity === 1 ? (
                                  <button
                                    className="hover:text-red-500"
                                    onClick={() =>
                                      dispatch(
                                        removeItem(item?.variantId) as any
                                      )
                                    }
                                  >
                                    <RiDeleteBinLine size={18} />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      dispatch(
                                        decrementQuantity(
                                          item?.variantId
                                        ) as any
                                      )
                                    }
                                    className="w-7 h-7 flex items-center justify-center border border-gray-300 shadow rounded-full text-xl font-semibold hover:bg-gray-100 active:bg-gray-200"
                                  >
                                    -
                                  </button>
                                )}
                                <p className="text-center w-8 font-semibold">
                                  {item?.quantity}
                                </p>
                                <button
                                  onClick={() =>
                                    dispatch(
                                      incrementQuantity(item?.variantId) as any
                                    )
                                  }
                                  className="w-7 h-7 hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center border border-gray-300 shadow rounded-full text-xl font-semibold"
                                >
                                  +
                                </button>
                              </div>
                              {/* <span
                                className="hover:text-red-600 text-sm active:text-red-800 cursor-pointer"
                                onClick={() =>
                                  dispatch(removeItem(item?.productId) as any)
                                }
                              >
                                Remove
                              </span> */}
                            </div>

                            <div>
                              <div className="flex justify-between">
                                <p className="font-semibold text-gray-700">
                                  ${item?.price * item?.quantity}
                                </p>
                              </div>
                            </div>
                            <p
                              style={{ backgroundColor: item?.color?.code }}
                              className="w-5 h-5 rounded-full mr-2 mt-1"
                            ></p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="bg-slate-50 w-full fixed bottom-0 z-[1] right-0">
                <hr />
                <div className="px-6">
                  <div className="flex justify-between text-lg font-bold mt-2">
                    <p>Total</p>
                    <p>{`$${getTotal().totalPrice}`}</p>
                  </div>
                  <p className="my-2 text-sm text-gray-500 ">
                    Shipping calculated at checkout period.
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <Link
                      onClick={() => setCartOpen(false)}
                      href="/cart"
                      className="w-full py-3 text-lg font-bold bg-cyan-500 rounded-full text-gray-50 hover:bg-cyan-600 focus:ring-2 ring-offset-2 ring-cyan-500 text-center"
                    >
                      View Cart
                    </Link>
                    <Link
                      onClick={checkoutHandler}
                      href={`/checkout/${checkoutId}`}
                      className="w-full rounded-full py-3 text-lg font-bold bg-black text-gray-50 hover:bg-slate-900 focus:ring-2 ring-offset-2 ring-black text-center"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="flex items-center justify-center">
                    <p>
                      <span>or,</span>
                      <button
                        onClick={() => setCartOpen(false)}
                        className="pl-1 my-2 text-primary-600 hover:underline"
                      >
                        Continue Shopping
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default Cart;
