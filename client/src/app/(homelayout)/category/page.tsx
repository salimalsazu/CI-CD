"use client";
import { CartIcon } from "@/components/HomePage/SvgIcons";
import noImageFound from "../../../../public/images/home/no image found.png";
import { fileUrlKey } from "@/helpers/config/envConfig";
import { useGetProductQuery } from "@/redux/api/features/productApi";
import { addToCart } from "@/redux/slice/cartSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Loader, Message, useToaster } from "rsuite";

const ProductPage = () => {
  const { data } = useGetProductQuery({});
  const products = data?.data;
  console.log(products);
  const dispatch = useDispatch();
  const toaster = useToaster();
  const [start, setStart] = useState(false);
  const [productId, setProductId] = useState(null);
  const message = (
    <Message
      showIcon
      type="success"
      closable
      as="div"
      className="bg-white"
      style={{ backgroundColor: "white" }}
    >
      <strong>Success!</strong> Product added to cart.
    </Message>
  );
  const addToCartHandler = (product: any) => {
    setProductId(product.productId);
    setStart(true);
    dispatch(addToCart(product) as any);
    setTimeout(() => {
      setStart(false);
      toaster.push(message, {
        placement: "bottomEnd",
        duration: 3000,
      });
    }, 1000);
  };
  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="mx-auto max-w-6xl  px-4 sm:px-6 lg:px-8">
        <h2 className="py-5 text-3xl text-gray-800 font-bold">Our products</h2>
        <div className="grid grid-cols-1 gap-4 lg:gap-4 sm:gap-4 md:grid-cols-3">
          {products?.map((product: any) => (
            <Link
              href={`/category/${product.productId}`}
              key={product.id}
              className="bg-white border border-gray-200 shadow-sm md:w-80"
            >
              <Image
                width={1000}
                height={1000}
                src={
                  product?.featuredImage
                    ? `${fileUrlKey()}/${product?.featuredImage}`
                    : noImageFound
                }
                alt={product.productName}
              />
              <div className="p-4">
                <p className="text-primary text-xl font-semibold">
                  {product?.productName}
                </p>
              </div>
              {/* <div className="relative z-20 p-6 group">
                <div className="relative block h-64 mb-4 -mt-56 overflow-hidden rounded -top-full ">
                  <div className="relative w-full h-full">
                    <Image
                      width={200}
                      height={200}
                      src={`${fileUrlKey()}/${product?.productImage}`}
                      alt={product.productName}
                      className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition-all group-hover:scale-110"
                    />
                    <Image
                      width={200}
                      height={200}
                      src={`${fileUrlKey()}/${product?.productImage}`}
                      alt={product.productName}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute flex flex-col top-4 right-4">
                    <a href="#" className="flex items-center">
                      <div className="relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded   group-hover:translate-x-0 wishlist hover:bg-blue-200    group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-heart"
                          viewBox="0 0 16 16"
                        >
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                        </svg>
                      </div>
                    </a>
                    {start && productId === product.productId ? (
                      <button className="flex items-center">
                        <div
                          className="relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded 
                           group-hover:translate-x-0 wishlist hover:bg-blue-200 group"
                        >
                          <Loader size="sm" />
                        </div>
                      </button>
                    ) : (
                      <button
                        className="flex items-center"
                        onClick={() => addToCartHandler(product)}
                      >
                        <div
                          className="relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded 
                       group-hover:translate-x-0 wishlist hover:bg-blue-50 active:bg-blue-200 group"
                        >
                          <CartIcon />
                        </div>
                      </button>
                    )}
                  </div>
                </div>
                <Link href={`/shop/${product.productId}`}>
                  <h2 className="mb-2 text-xl font-bold text-black  ">
                    {product?.productName}
                  </h2>
                </Link>
                <p className="mb-3 text-lg font-semibold text-gray-700">
                  <span>${product?.productPrice?.toFixed(2)}</span>
                </p>
                <div className="flex gap-1 text-orange-400"></div>
              </div> */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

// const product = {
//   productId: "",
//   productName: "",
//   productPrice: "",
//   productDescription: "",
//   productStatus: "",
//   categoryId: "",
//   category: {
//     categoryId: "",
//     categoryName: "",
//   },

//   productVariations: [
//     {
//       variantPrice: "",
//       size: "", //optional
//       color: "",
//       stock: "",
//       productQrCode: [],
//       productImage: "",
//       productStatus: "",
//     },
//   ],
// };
