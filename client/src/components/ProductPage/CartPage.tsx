"use client";
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
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "rsuite";
import useMediaQuery from "@/hooks/useMediaQuiry";
import { RiDeleteBinLine } from "react-icons/ri";
import EmptyCart from "../ProductsPage/Cart/EmptyCart";
import EmptyCartPage from "../ProductsPage/Cart/EmptyCartPage";
import { GrSecure } from "react-icons/gr";
import { useEffect, useState } from "react";

const CartPage = ({ cartOpen, setCartOpen }: any) => {
  const isLarge = useMediaQuery("(min-width: 640px)");
  const [isClient, setIsClient] = useState(false);
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
    dispatch(
      addPayAmount({ subtotal: getTotal().totalPrice, checkoutId } as any)
    );
  };

  useEffect(() => {
    setIsClient(true);
  }, [isClient]);

  return (
    <>
      {isClient ? (
        <div className="min-h-screen flex flex-col items-center max-w-7xl mx-auto mt-10">
          {cart?.length > 0 ? (
            <div className="w-full">
              <div className="mb-10">
                <h1 className="text-3xl md:text-5xl font-semibold text-[#333] text-center">
                  Cart
                </h1>
              </div>
              {/*  */}
              <div className="lg:grid grid-cols-10 gap-10">
                <div className="col-span-6">
                  <div className="">
                    {/* header */}
                    <div className="grid grid-cols-8 py-5 border-b font-bold text-lg mb-5">
                      <div className="col-span-4">
                        <h2>Product</h2>
                      </div>
                      <div className="col-span-2 max-sm:hidden">
                        <h2>Quantity</h2>
                      </div>
                      <div className="sm:col-span-2 col-span-4 text-right">
                        <h2>Total</h2>
                      </div>
                    </div>

                    {/* list of cart */}
                    <div>
                      {cart?.length > 0 &&
                        cart?.map((item: any) => (
                          <div
                            key={item?.productId}
                            className="grid grid-cols-8 mb-5 sm:items-center"
                          >
                            {/* image and product name */}
                            <div className="sm:col-span-4 col-span-6 flex items-center gap-5">
                              <div>
                                <Image
                                  width={100}
                                  height={100}
                                  src={`${fileUrlKey()}/${item?.image}`}
                                  alt={item?.productName}
                                  className="w-20 h-20 object-cover rounded-md"
                                />
                              </div>
                              <div>
                                <p className="font-bold text-base">
                                  {`${item?.productName} - ${
                                    item?.promoCode ? "Free" : item?.color?.name
                                  }`}
                                </p>
                                <p>${item?.price}</p>
                                <div className="max-sm:flex max-sm:justify-between max-sm:items-center">
                                  {!item?.promoCode && (
                                    <p
                                      style={{
                                        backgroundColor: item?.color?.code,
                                      }}
                                      className="w-5 h-5 rounded-full mr-2 mt-1"
                                    ></p>
                                  )}
                                  {!item?.promoCode && (
                                    <div className="flex flex-col col-span-2 sm:hidden">
                                      <div className="flex justify-between items-center w-full">
                                        <div className="flex items-center justify-center">
                                          {item?.quantity === 1 ? (
                                            <button
                                              className="hover:text-red-500"
                                              onClick={() =>
                                                dispatch(
                                                  removeItem(
                                                    item?.variantId
                                                  ) as any
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
                                                incrementQuantity(
                                                  item?.variantId
                                                ) as any
                                              )
                                            }
                                            className="w-7 h-7 hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center border border-gray-300 shadow rounded-full text-xl font-semibold"
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* quantity */}
                            <div className="flex flex-col col-span-2 max-sm:hidden">
                              {item?.promoCode ? (
                                <></>
                              ) : (
                                <div className="flex justify-between items-center w-full">
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
                                          incrementQuantity(
                                            item?.variantId
                                          ) as any
                                        )
                                      }
                                      className="w-7 h-7 hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center border border-gray-300 shadow rounded-full text-xl font-semibold"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="sm:col-span-2 col-span-2">
                              <p className="font-semibold text-gray-700 text-right">
                                ${item?.totalPrice?.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* subtitle and checkout button */}
                <div className="col-span-4 border p-10 rounded-lg max-lg:mb-16 max-lg:mt-10">
                  <div className="flex justify-between font-medium">
                    <p>Subtotal</p>
                    <p>${getTotal().totalPrice?.toFixed(2)}</p>
                  </div>
                  <div className=" border-b py-2">
                    <p className="text-sm text-gray-600">
                      Taxes calculated at checkout
                    </p>
                    {/* <p>Calculated at Checkout</p> */}
                  </div>
                  <div className="flex justify-between py-2 font-semibold text-xl">
                    <p>Total:</p>
                    <p>${getTotal()?.totalPrice?.toFixed(2)} USD</p>
                  </div>

                  <Link
                    href={`/checkout/${checkoutId}`}
                    onClick={checkoutHandler}
                  >
                    <button className="mt-3 hover:bg-cyan-600 focus:ring-2 ring-offset-2 ring-cyan-500 flex gap-2 items-center justify-center bg-cyan-500 text-white py-3 w-full rounded-full font-bold text-2xl">
                      <GrSecure />
                      Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <EmptyCartPage />
          )}
        </div>
      ) : (
        <>
          <div className="h-screen flex justify-center mt-40">
            <div>
              <div className="cartLoader"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartPage;
