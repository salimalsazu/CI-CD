import {
  useApplyPromotionalOfferMutation,
  useLazyGetPromoQuery,
} from "@/redux/api/features/promoCodeApi";
import { applyPromoCode, removeFreeProduct } from "@/redux/slice/cartSlice";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import { LiaTagSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { Loader } from "rsuite";

const PromoCode = ({
  cart,
  appliedPromoCode,
}: {
  cart: any;
  appliedPromoCode: any;
}) => {
  const dispatch = useDispatch();
  const { control } = useForm();
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeMessage, setPromoCodeMessage] = useState<any>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [freeProductVariantId, setFeeProductVariantId] = useState<any>(null);
  const [promoCodeApplied, setPromoCodeApplied] = useState<string | null>(null);
  const [applyPromotionalOffer, { isLoading }] =
    useApplyPromotionalOfferMutation();
  // console.log(data, "data");

  // console.log(data, "data");
  const cartDataForApi = cart?.map((item: any) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));

  // check if promo code is already applied
  const isPromoCodeApplied = cart?.find(
    (item: any) => item.promoCode == promoCode
  );
  console.log(isPromoCodeApplied, "isPromoCodeApplied");

  const handleApplyPromo = async () => {
    // reset error and promo code
    setPromoCode("");
    setPromoCodeMessage(false);
    setLoader(true);
    if (promoCode && appliedPromoCode === promoCode) {
      setTimeout(() => {
        setLoader(false);
        setPromoCodeMessage("This promo code has already been applied.");
      }, 1000);
      return;
    }

    if (promoCode) {
      const forBody = {
        cartData: cartDataForApi,
      };
      const result = await applyPromotionalOffer({
        code: promoCode,
        data: forBody,
      });
      const { data } = result as { data: any };
      if (data?.data?.isValid && data?.data?.product?.variantId) {
        const product = data?.data?.product;
        const freeQuantity = data?.data?.quantity;

        const freeProduct = {
          productId: product?.productId,
          productName: product?.product?.productName,
          image: product?.image,
          color: {
            code: product?.color?.code,
            name: product?.color?.name,
          },
          price: product?.variantPrice,
          variantId: product?.variantId,
          quantity: freeQuantity,
          offerPrice: 0,
          promoCode: promoCode,
        };

        setTimeout(() => {
          setLoader(false);
          dispatch(applyPromoCode(freeProduct as any));
        }, 2000);

        // setFeeProductVariantId({
        //   variantId: freeProduct?.variantId,
        //   promoCode: freeProduct?.promoCode,
        // });
      } else {
        setTimeout(() => {
          setLoader(false);
          setPromoCodeMessage("Enter a valid promo code.");
        }, 1000);
      }
    }
  };

  return (
    <>
      <div className="flex gap-3">
        <Controller
          name="promoCode"
          control={control}
          render={({ field }) => (
            <input
              value={promoCode}
              onChange={(e) => {
                field.onChange(e.target.value);
                setPromoCode(e.target.value);
              }}
              type="text"
              name="promoCode"
              id="promoCode"
              placeholder="Discount code or gift card"
              className="block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm placeholder:text-gray-600"
            />
          )}
        />
        <button
          type="button"
          onClick={handleApplyPromo}
          disabled={promoCode.length === 0}
          className="py-2.5 px-6 rounded-lg bg-[#0495af] text-white font-semibold disabled:bg-gray-200 disabled:text-white disabled:cursor-not-allowed"
        >
          {loader ? <Loader className=" align-middle px-[13px]" /> : "Apply"}
          {/* {isLoading || isFetching ? "Applying..." : "Apply"} */}
        </button>
      </div>

      <div className="h-10">
        <p className="h-7 text-sm font-medium text-red-600 mt-1">
          {promoCodeMessage && promoCodeMessage}
        </p>

        {appliedPromoCode && (
          <div className="flex">
            <div className="bg-gray-200 gap-1 border border-[#e6e6e6] text-black flex items-center text-sm font-bold px-2 py-1 rounded-[4px]">
              <LiaTagSolid size={22} />
              {appliedPromoCode}
              <IoIosClose
                onClick={() => {
                  setPromoCodeMessage(false);
                  setPromoCodeApplied(null);
                  setTimeout(() => {
                    const itemToRemove = cart?.find(
                      (item: any) => item.promoCode === appliedPromoCode
                    );
                    if (itemToRemove) {
                      dispatch(
                        removeFreeProduct({
                          variantId: itemToRemove.variantId,
                          promoCode: itemToRemove.promoCode,
                        } as any)
                      );
                    }
                  }, 500);
                }}
                size={22}
                className="ml-1 text text-gray-600 hover:text-black cursor-pointer "
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PromoCode;

// const orderData = {
//   cartData: [
//     {
//       categoryId: "4d50fa39-271a-4266-b071-d78a3296783a",
//       productId: "4d50fa39-271a-4266-b071-d78a3296783a",
//       variantId: "4d50fa39-271a-4266-b071-d78a3296783a",
//       quantity: 1,
//     },
//     {
//       categoryId: "4d50fa39-271a-4266-b071-d78a3296783a",
//       productId: "4d50fa39-271a-4266-b071-d78a3296783a",
//       variantId: "4d50fa39-271a-4266-b071-d78a3296783a",
//       quantity: 1,
//     },
//   ],
//   payAmount: {
//     subTotal: 100,
//     tax: 10,
//     total: 110,
//   },
//   promoOffer: {
//     promoCode: "string",
//     product: {
//       variantId: "4d50fa39-271a-4266-b071-d78a3296783a",
//       productId: "4d50fa39-271a-4266-b071-d78a3296783a",
//       quantity: 1,
//     },
//   },
//   email: "",
//   firstName: "",
//   lastName: "",
//   address: "",
//   city: "",
//   state: "",
//   postalCode: "",
//   phone: "",

//   // if promoCode isn't apply or not available then it will be product null
// };
