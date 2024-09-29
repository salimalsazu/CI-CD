"use client";
import React, { useCallback, useEffect, useState } from "react";
import SingleProductSlider from "@/components/ProductPage/ProductSlider/SingleProductSlider";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Accordion, Loader, Placeholder, Tooltip, Whisper } from "rsuite";
import { useGetSingleProductQuery } from "@/redux/api/features/productApi";
import { v4 as uuIdv4 } from "uuid";
import { CarouselThumbsButton } from "@/components/ProductPage/ProductSlider/CarouselThumbsButton";
import { addToCart } from "@/redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import Cart from "@/components/ProductsPage/Cart/Cart";
import AllReviews from "@/components/reviews/AllReviews";

const colorLoader = Array.from({ length: 3 }).map((_, index) => (
  <div
    key={index}
    className="h-10 w-10 rounded-full animate-pulse bg-gray-300 mr-2"
  ></div>
));
const SingleProductPage = ({ params }: any) => {
  const dispatch = useDispatch();
  console.log(params);
  const {
    data: singleProduct,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetSingleProductQuery({
    id: params.productId,
  });
  console.log(singleProduct);
  const [quantity, setQuantity] = useState(1);
  const [productForCart, setProductForCart] = useState<any>({
    categoryId: singleProduct?.data?.categoryId,
    productId: singleProduct?.data?.productId,
    productName: singleProduct?.data?.productName,
    variantId: singleProduct?.data?.productVariations?.[0].variantId,
    price: singleProduct?.data?.productVariations?.[0].variantPrice,
    color: {
      name: singleProduct?.data?.productVariations?.[0].color?.name,
      code: singleProduct?.data?.productVariations?.[0].color?.code,
    },
    image: singleProduct?.data?.productVariations?.[0].image,
  });
  const [start, setStart] = useState<boolean>(false);
  console.log(productForCart, "productForCart");
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
    null
  );
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number | null>(
    null
  );
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [selectColorName, setSelectColorName] = useState<string | null>(null);
  const [colorName, setColorName] = useState<string | null>(null);
  const [selectSizeName, setSelectSizeName] = useState<string | null>(null);
  // product size
  const productSize = singleProduct?.data?.productVariations?.map(
    (product: any) => product.size && product.size
  );
  // console.log(productSize, "productSize");
  const productColor = singleProduct?.data?.productVariations?.map(
    (color: any) => {
      if (color.color.name && color.color.code) {
        return {
          name: color.color.name,
          code: color.color.code,
        };
      }
    }
  );
  const allProductImages = [
    {
      id: uuIdv4(),
      src: singleProduct?.data?.featuredImage,
      alt: "featured image",
    },
    ...(Array.isArray(singleProduct?.data?.productImage)
      ? singleProduct?.data?.productImage?.map((image: any) => ({
          id: uuIdv4(),
          src: image, // Assuming 'url' is the property containing the image URL
          alt: image, // Assuming 'alt' is the property containing the image alt text
        }))
      : []),
    ...(Array.isArray(singleProduct?.data?.productVariations)
      ? singleProduct?.data?.productVariations?.map((variation: any) => ({
          id: uuIdv4(),
          color: variation.color.name,
          size: variation.size,
          src: variation.image,
          alt: variation.image,
        }))
      : []),
  ];

  const colorVariantsHandler = (index: any, color: any) => {
    setSelectedColorIndex(index);
    setSelectColorName(color?.name);
    setColorName(color?.name);
    setProductForCart({
      categoryId: singleProduct?.data?.categoryId,
      productId: singleProduct?.data?.productId,
      productName: singleProduct?.data?.productName,
      variantId: singleProduct?.data?.productVariations?.[index].variantId,
      price: singleProduct?.data?.productVariations?.[index].variantPrice,
      color: {
        name: singleProduct?.data?.productVariations?.[index].color?.name,
        code: singleProduct?.data?.productVariations?.[index].color?.code,
      },
      image: singleProduct?.data?.productVariations?.[index].image,
    });
  };

  // console.log(allProductImages);
  const addToCartHandler = (product: any) => {
    setStart(true);
    dispatch(addToCart({ product, quantity } as any));
    setTimeout(() => {
      setStart(false);
      setCartOpen(true);
    }, 1000);
  };
  // const [mainImage, setMainImage] = useState(productImages[0]);
  const OPTIONS: EmblaOptionsType = {};
  const SLIDE_COUNT = 10;
  // const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <>
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <div>
        <div className="max-w-7xl xl:mx-auto md:mx-10 mx-0 md:mt-5">
          <div className="md:grid md:grid-cols-2 gap-10 ">
            {/* product slider */}
            <div className="">
              <SingleProductSlider
                isLoading={isLoading}
                isFetching={isFetching}
                slides={allProductImages}
                options={OPTIONS}
                selectColorName={selectColorName}
                setSelectColorName={setSelectColorName}
              />
            </div>
            {/* product variant and title */}
            <div className="md:flex-1 md:mt-0  max-md:mx-4">
              <div>
                {/* Title and Price  */}
                <div className="mt-5">
                  {isLoading && isFetching ? (
                    <div className="h-10 w-1/2 animate-pulse bg-gray-300"></div>
                  ) : (
                    <h2 className="text-[32px] font-semibold text-gray-900 mb-2">
                      {singleProduct?.data?.productName}
                    </h2>
                  )}

                  {isLoading && isFetching ? (
                    <div className="h-7 w-1/3 animate-pulse bg-gray-300 mt-5"></div>
                  ) : (
                    <p className="text-gray-600 text-xl">
                      ${singleProduct?.data?.productPrice?.toFixed(2)}
                    </p>
                  )}
                </div>

                {/* product colors */}
                <div className="my-3">
                  {isLoading && isFetching ? (
                    <div className="h-5 w-1/5 animate-pulse bg-gray-300 mb-3"></div>
                  ) : (
                    <p className=" text-gray-700">
                      <span className="">Color</span>:{" "}
                      <span className="text-bold">{selectColorName}</span>
                    </p>
                  )}
                  <div className="flex items-center mt-2">
                    {/* color variants */}
                    {isLoading && isFetching
                      ? colorLoader
                      : productColor?.map((color: any, index: number) => (
                          <Whisper
                            key={index}
                            placement="top"
                            controlId={`control-id-hover-${index}`}
                            trigger="hover"
                            speaker={<Tooltip>{color?.name}</Tooltip>}
                          >
                            <button
                              onClick={() => {
                                colorVariantsHandler(index, color);
                                // setSelectedColorIndex(index);
                                // setSelectColorName(color?.name);
                                // setColorName(color?.name);
                                // setProductForCart({
                                //   categoryId: singleProduct?.data?.categoryId,
                                //   productId: singleProduct?.data?.productId,
                                //   productName: singleProduct?.data?.productName,
                                //   variantId:
                                //     singleProduct?.data?.productVariations?.[
                                //       index
                                //     ].variantId,
                                //   price:
                                //     singleProduct?.data?.productVariations?.[
                                //       index
                                //     ].variantPrice,
                                //   color: {
                                //     name: singleProduct?.data
                                //       ?.productVariations?.[index].color?.name,
                                //     code: singleProduct?.data
                                //       ?.productVariations?.[index].color?.code,
                                //   },
                                //   image:
                                //     singleProduct?.data?.productVariations?.[
                                //       index
                                //     ].image,
                                // });
                              }}
                              style={{
                                backgroundColor: `${color?.code}`,
                              }}
                              className={`w-6 h-6 md:w-10 md:h-10 rounded-full mr-2 ${
                                selectedColorIndex == index
                                  ? "border-[3px] border-gray-600"
                                  : ""
                              } `}
                            ></button>
                          </Whisper>
                        ))}
                  </div>
                </div>

                {/* product size */}
                {/* {productSize && productSize?.length > 0 && (
                <div className="my-3">
                  <h1>Size: {selectSizeName}</h1>
                  <div className="flex gap-2">
                    {productSize?.map((size: any, index: number) => (
                      <button
                        onClick={() => {
                          setSelectedSizeIndex(index);
                          setSelectSizeName(size);
                        }}
                        key={index}
                        className={`w-20 h-10 hover:border-black border ${
                          selectedSizeIndex == index
                            ? "border-2 border-black"
                            : null
                        } rounded-md flex justify-center items-center`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )} */}

                {/* select quantity */}
                <div className="mb-4 md:mb-0">
                  <div>
                    {isLoading && isFetching ? (
                      <div className="h-4 w-1/5 animate-pulse bg-gray-300"></div>
                    ) : (
                      <p className="text-gray-700">
                        <span className="">Quantity: {quantity}</span>
                      </p>
                    )}
                    {isLoading && isFetching ? (
                      <div className="h-10 w-1/3 animate-pulse bg-gray-300 mt-4"></div>
                    ) : (
                      <div className="flex items-center">
                        <div className="inline-flex items-center mt-2 border text-black rounded-full">
                          <button
                            disabled={quantity === 1}
                            onClick={() => setQuantity(quantity - 1)}
                            className="disabled:opacity-30 inline-flex items-center px-3 py-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <div className="justify-center text-gray-700 inline-flex items-center w-12 py-2 select-none">
                            {quantity}
                          </div>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className=" disabled:opacity-50 inline-flex items-center px-3 py-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  {isLoading && isFetching ? (
                    <div className="h-10 animate-pulse bg-gray-300"></div>
                  ) : (
                    <div className="w-full md:px-2">
                      {start ? (
                        <button className="flex items-center w-full">
                          <div className="w-full bg-gray-400 flex justify-center text-white md:px-4 rounded-full font-bold  text-base md:text-lg">
                            <Loader
                              size="sm"
                              className="py-[13px] text-black"
                            />
                          </div>
                        </button>
                      ) : (
                        <button
                          disabled={!colorName}
                          onClick={() => addToCartHandler(productForCart)}
                          className="disabled:bg-[#b5c4c6] w-full bg-primary flex justify-center text-white py-2 md:px-4 rounded-full font-bold hover:bg-sky-400   text-base md:text-lg"
                        >
                          {colorName ? "ADD TO CART" : "SELECT A COLOR"}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* productFaq */}

              <section className="mt-8">
                <Accordion>
                  <Accordion.Panel header="How it works">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
                    ullam illo delectus vero sapiente cupiditate vitae. Harum,
                    veniam dignissimos eligendi dolore minus nam, eum saepe enim
                    autem consequuntur blanditiis corrupti.
                  </Accordion.Panel>
                  <Accordion.Panel header="Kid profile">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Animi, qui? Sit aliquam culpa, hic repellat quia in deserunt
                    nemo autem aut minima adipisci, ullam eum exercitationem
                    inventore commodi? Numquam, magnam.
                  </Accordion.Panel>
                  <Accordion.Panel header="Tag features">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Inventore velit voluptatibus perferendis sequi harum
                    provident ex, totam dignissimos, eos excepturi earum
                    accusantium modi in quibusdam, iste molestiae neque commodi
                    qui?
                  </Accordion.Panel>
                  <Accordion.Panel header="Safety features">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Reprehenderit delectus voluptates minus molestias nesciunt
                    officiis ratione, facere repellat. Inventore pariatur
                    obcaecati ex! Qui alias dolores dolore quam minima adipisci
                    recusandae.
                  </Accordion.Panel>
                </Accordion>
              </section>

              {/* Stock */}
              {/* <div className="flex justify-start items-center gap-2 py-6">
              <p className="font-bold text-gray-700   text-lg">Availability:</p>
              <p className="text-gray-600   text-xl">In Stock</p>
            </div> */}

              {/* Add to cart */}
              {/* <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button className="w-full bg-primary  text-white py-2 md:px-4 rounded-full font-bold hover:bg-gray-800 text-base md:text-lg">
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 text-gray-800 hover:text-white py-2 md:px-4 rounded-full font-bold hover:bg-primary text-base md:text-lg">
                  Add to Wishlist
                </button>
              </div>
            </div> */}
            </div>
          </div>
        </div>

        {/* Product description */}
        <div className="py-10 md:pt-20 max-w-7xl xl:mx-auto mx-6 lg:px-8">
          <span className="text-xl md:text-4xl  font-bold text-gray-700  ">
            Product Description:
          </span>
          <p className="text-gray-600  text-sm mt-2">
            {singleProduct?.data?.productDescription}
          </p>
        </div>
        {/* <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <h3 className="text-lg font-bold text-[#333]">Reviews(10)</h3>
          <div className="grid md:grid-cols-2 gap-12 mt-6">
            <div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <p className="text-sm text-[#333] font-bold">5.0</p>
                  <svg
                    className="w-5 fill-[#333] ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div className="w-2/3 h-full rounded bg-[#333]"></div>
                  </div>
                  <p className="text-sm text-[#333] font-bold ml-3">66%</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-[#333] font-bold">4.0</p>
                  <svg
                    className="w-5 fill-[#333] ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div className="w-1/3 h-full rounded bg-[#333]"></div>
                  </div>
                  <p className="text-sm text-[#333] font-bold ml-3">33%</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-[#333] font-bold">3.0</p>
                  <svg
                    className="w-5 fill-[#333] ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div className="w-1/6 h-full rounded bg-[#333]"></div>
                  </div>
                  <p className="text-sm text-[#333] font-bold ml-3">16%</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-[#333] font-bold">2.0</p>
                  <svg
                    className="w-5 fill-[#333] ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div className="w-1/12 h-full rounded bg-[#333]"></div>
                  </div>
                  <p className="text-sm text-[#333] font-bold ml-3">8%</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-[#333] font-bold">1.0</p>
                  <svg
                    className="w-5 fill-[#333] ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div className="w-[6%] h-full rounded bg-[#333]"></div>
                  </div>
                  <p className="text-sm text-[#333] font-bold ml-3">6%</p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex items-start">
                <div className="ml-3">
                  <h4 className="text-sm font-bold text-[#333]">John Doe</h4>
                  <div className="flex space-x-1 mt-1">
                    <svg
                      className="w-4 fill-[#333]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-4 fill-[#333]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-4 fill-[#333]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-4 fill-[#CED5D8]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-4 fill-[#CED5D8]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <p className="text-xs !ml-2 font-semibold text-[#333]">
                      2 mins ago
                    </p>
                  </div>
                  <p className="text-sm mt-4 text-[#333]">
                    Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                    eiusmod tempor incidunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-[#333] text-[#333] font-bold rounded"
              >
                Read all reviews
              </button>
            </div>
          </div>
        </div> */}
        <div className="my-5">
          <AllReviews />
        </div>
        {/* <div className="max-w-xl mx-auto">
        <SingleProductSlider />
      </div> */}
      </div>
    </>
  );
};

export default SingleProductPage;
