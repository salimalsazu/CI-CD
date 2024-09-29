"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../public/images/logo/E.T.-Logo.png";
import Link from "next/link";
import { RiMenu2Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import NavbarDrawer from "./NavbarDrawer";
import Cart from "../ProductsPage/Cart/Cart";
import SearchModalDrawer from "./SearchModalDrawer";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cart = useSelector((state: any) => state.cart.cart);
  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart?.forEach((item: any) => {
      totalQuantity += item?.quantity;
      totalPrice += item?.price * item?.quantity;
    });
    return { totalQuantity, totalPrice };
  };
  return (
    <>
      <NavbarDrawer open={open} setOpen={setOpen} />
      {/* cart modal */}
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
      {/* search modal drawer from top */}
      <SearchModalDrawer
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />
      {/* header */}
      <header className="bg-primary">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link href="/">
                <Image
                  className="object-cover max-sm:w-40 "
                  src={logo}
                  width={220}
                  height={220}
                  alt="logo"
                />
              </Link>
            </div>
            <div className="md:flex md:items-center md:gap-12">
              <div className="flex items-center gap-4">
                <div className="block">
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="rounded py-2 transition text-white text-3xl"
                  >
                    <CiSearch />
                  </button>
                </div>
                <div className="block">
                  <button
                    onClick={() => setOpen(true)}
                    className="rounded py-2 transition text-white text-3xl"
                  >
                    <RiMenu2Line />
                  </button>
                </div>

                <button
                  className="text-white cursor-pointer relative"
                  onClick={() => setCartOpen(true)}
                >
                  <div className="text-white font-semibold flex justify-center items-center text-xs absolute w-5 h-5 bg-black rounded-full top-0 right-0 transform translate-x-1/2 -translate-y-1/2 opacity-80">
                    {getTotal().totalQuantity}
                  </div>
                  <HiOutlineShoppingBag size={26} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
