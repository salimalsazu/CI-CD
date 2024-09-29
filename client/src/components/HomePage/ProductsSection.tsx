"use client";
import React, { useState } from "react";
import noImageFound from "../../../public/images/home/no image found.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";
import { CartIcon } from "./SvgIcons";
import { useGetCategoryQuery } from "@/redux/api/features/categoryApi";
import { useGetProductQuery } from "@/redux/api/features/productApi";
import { fileUrlKey } from "@/helpers/config/envConfig";
import Link from "next/link";
import { Loader, Message, useToaster } from "rsuite";

const ProductsSection = () => {
  const { data, isLoading, isFetching } = useGetProductQuery({});
  const products = data?.data;
  const dispatch = useDispatch();
  const toaster = useToaster();
  const [start, setStart] = useState(false);
  const [selectedColor, setSelectedColor] = useState({
    productId: null,
    index: 0,
  });
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
    <section className=" mt-10 py-10">
      <div className="p-4 mx-auto max-w-7xl">
        <div className="max-w-xl mx-auto">
          <div className="text-center ">
            <div className="relative flex flex-col items-center">
              <div className="absolute hidden md:block -top-14 left-0 text-[120px] text-gray-400 font-bold opacity-10">
                PRODUCTS
              </div>
              <h1 className="text-5xl font-bold ">
                {" "}
                Our <span className="  text-primary"> Products</span>{" "}
              </h1>
              <div className="flex w-24 mt-1 mb-10 overflow-hidden rounded">
                <div className="flex-1 h-2 bg-blue-200"></div>
                <div className="flex-1 h-2 bg-blue-400"></div>
                <div className="flex-1 h-2 bg-primary"></div>
              </div>
            </div>
            <p className="mb-16 text-base text-center text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
              magni eius eaque? Pariatur numquam, odio quod nobis ipsum ex
              cupiditate?
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:gap-4 sm:gap-4 md:grid-cols-3 mx-auto max-w-5xl">
        {isLoading || isFetching ? (
          <>
            <div className="h-96 animate-pulse bg-gray-300"></div>
            <div className="animate-pulse bg-gray-300"></div>
            <div className="animate-pulse bg-gray-300"></div>
          </>
        ) : (
          products?.map((product: any) => (
            <div key={product.id} className="border rounded-lg">
              <div className="">
                <Link href={`/category/single-product/${product?.productId}`}>
                  <div className="w-full h-full">
                    <Image
                      width={1000}
                      height={1000}
                      src={
                        product?.featuredImage
                          ? `${fileUrlKey()}/${product?.featuredImage}`
                          : noImageFound
                      }
                      alt={product.productName}
                      className="h-64 w-full object-cover opacity-100 group-hover:opacity-0 transition-all group-hover:scale-110 rounded-t-lg"
                    />
                  </div>
                  <div className="py-2 px-2">
                    <h2 className="text-xl font-bold text-black ">
                      {product?.productName}
                    </h2>
                    <p className="pt-1 font-medium flex justify-between text-lg">
                      <span>Price</span>
                      <span>${product?.productPrice?.toFixed(2)}</span>
                    </p>
                    <p className="line-clamp-2">
                      {product?.productDescription}
                    </p>
                  </div>
                </Link>
                <div className="pb-2 px-2">
                  {product?.productVariations?.map(
                    (variation: any, index: number) => (
                      <button
                        // onClick={() =>
                        //   setSelectedColor({
                        //     productId: product.productId,
                        //     index,
                        //   })
                        // }
                        style={{
                          backgroundColor: `${variation?.color?.code}`,
                        }}
                        key={variation?.variantId}
                        className={`w-6 h-6 rounded-full mr-2`}
                      ></button>
                    )
                  )}
                </div>

                {/* <div className="absolute flex flex-col top-4 right-4">
                    <a href="#" className="flex items-center">
                      <div className="relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded group-hover:translate-x-0 wishlist hover:bg-blue-200    group">
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
                       group-hover:translate-x-0 wishlist hover:bg-blue-200 group"
                        >
                          <CartIcon />
                        </div>
                      </button>
                    )}
                  </div> */}

                {/* <Link href={`/shop/single-product/${product?.productId}`}>
                  <h2 className="mb-2 text-xl font-bold text-black  ">
                    {product?.productName}
                  </h2>
                  <p className="mb-3 text-lg font-bold text-primary">
                    <span>${product?.productPrice?.toFixed(2)}</span>
                  </p>
                </Link> */}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
