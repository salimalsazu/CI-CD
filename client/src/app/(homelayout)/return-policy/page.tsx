import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Policy | E.T.",
};
const ReturnPolicyPage = () => {
  return (
    <div className="mx-auto max-w-screen-lg px-2 sm:px-6 lg:px-8 py-20">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Refund Policy
        </h2>

        <p className="  md:max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          At E.T. Phone Home, we are committed to ensuring your complete
          satisfaction with your purchase. If for any reason you are not
          entirely satisfied, we are here to help.
        </p>
      </div>
      {/* refund eligibility  */}
      <div className="mt-20">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Refund Eligibility
        </h2>
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            Customers are eligible for a full refund if the item is returned
            within 30 days of the purchase date.
          </li>
        </ul>
      </div>
      {/* Condition of Returns */}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Condition of Returns
        </h2>
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            Returns are accepted for any reason and in any condition.
          </li>
        </ul>
      </div>
      {/* Return Process  */}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Return Process
        </h2>

        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            To initiate a return, please contact our Customer Service team at{" "}
            <span className="text-primary font-bold underline">
              returns@etphonehomebands.com
            </span>{" "}
            <br className="md:hidden" />
            and include your order number. You will receive a return slip with
            detailed instructions.
          </li>
        </ul>
      </div>
      {/* Refund Method:  */}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Refund Method
        </h2>{" "}
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            Refunds will be issued to the original payment method used at the
            time of purchase.
          </li>
        </ul>
      </div>
      {/* Return Shipping Costs  */}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Return Shipping Costs
        </h2>{" "}
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            Customers are responsible for all return shipping costs.
          </li>
        </ul>
      </div>
      {/* Exceptions  */}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Exceptions
        </h2>{" "}
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            Please note that final sale items are non-refundable.
          </li>
        </ul>
      </div>
      {/* Restocking Fee  */}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Restocking Fee
        </h2>
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            No restocking fees will be applied to returned items.
          </li>
        </ul>
      </div>

      {/* Contact Information  */}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Contact Information
        </h2>
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            For any questions or further assistance, please reach out to our{" "}
            Customer Service
            <br className="max-md:hidden" />
            team at{" "}
            <span className="text-primary font-bold underline">
              returns@etphonehomebands.com
            </span>
          </li>
        </ul>
      </div>
      {/* Contact Information  */}
      <div className="mt-20 border-t-[3px] border-primary border-dashed  pt-16 flex justify-center flex-col items-center ">
        {/* <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Contact Information
        </h2>
        <p className="mt-3 text-lg font-medium max-md:text-center">
          For any questions or further assistance, please reach out to our{" "}
          <br className="max-md:hidden" />
          Customer Service team at{" "}
          <span className="text-primary font-bold underline">
            returns@etphonehomebands.com
          </span>
        </p> */}
        <p className="text-center">
          Thank you for choosing E.T. Phone Home. Your satisfaction is our
          priority, and we are here to assist you with any concerns.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
