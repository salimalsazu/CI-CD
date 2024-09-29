import Image from "next/image";
import card from "../../../public/images/checkout/visa.svg";
import masterCard from "../../../public/images/checkout/mastercard.svg";
import amex from "../../../public/images/checkout/amex.svg";
import discover from "../../../public/images/checkout/discover.svg";
import cardTwo from "../../../public/images/checkout/cardPopover.svg";
import elo from "../../../public/images/checkout/elo.svg";
import jsb from "../../../public/images/checkout/jsb.svg";
import unionPay from "../../../public/images/checkout/unionPay.svg";
import { Tooltip, Whisper } from "rsuite";
const CheckoutCardSelectRadio = ({
  paymentMethod,
  setPaymentMethod,
}: {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}) => {
  const toolTip = (
    <Tooltip
    // style={{
    //   display: "flex",
    //   paddingTop: 10,
    //   paddingBottom: 10,
    //   gap: 4,
    //   flexWrap: "wrap",
    // }}
    >
      <div className="flex px-3 gap-1 flex-wrap">
        <Image src={cardTwo} alt="Card Logo" className="cursor-default" />
        <Image src={elo} alt="elo" className="cursor-default" />
        <Image src={jsb} alt="jsb" className="cursor-default" />
        <Image src={unionPay} alt="unionPay" className="cursor-default" />
      </div>
    </Tooltip>
  );

  return (
    <div
      className={`relative cursor-pointer border border-b-0 py-6 rounded-t-md ${
        paymentMethod == "card_payment" && "border-black !border-b bg-[#F4F4F4]"
      }`}
      onClick={() => setPaymentMethod("card_payment")}
    >
      <div className="absolute top-1/2 transform -translate-y-1/2 flex gap-3 items-center pl-5 w-full">
        <input
          type="radio"
          name="paymentMethod"
          id="card_payment"
          className="w-5 h-5 text-red-500 cursor-pointer"
          checked={paymentMethod == "card_payment"}
        />
        <div className="flex justify-between w-full">
          <label
            className="cursor-pointer"
            htmlFor="card_payment"
            // onClick={() => setPaymentMethod("card_payment")}
          >
            Credit card
          </label>
          <div className="flex gap-1 mr-2">
            <Image src={card} alt="Card Logo" className="cursor-default" />
            <Image
              src={masterCard}
              alt="masterCard"
              className="cursor-default"
            />
            <Image src={amex} alt="american ex" className="cursor-default" />
            <Image src={discover} alt="discover" className="cursor-default" />
            <Whisper trigger="hover" speaker={toolTip} placement="top">
              <div className="w-[38px] h-6 text-[11px] bg-white border rounded flex justify-center items-center">
                4+
              </div>
            </Whisper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCardSelectRadio;
