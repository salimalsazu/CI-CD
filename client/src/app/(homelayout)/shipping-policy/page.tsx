import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Policy | E.T.",
};
const ReturnPolicyPage = () => {
  return (
    <div className="mx-auto max-w-screen-lg px-3 sm:px-6 lg:px-8 py-20">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Shipping Policy
        </h2>

        <p className="max-w-[95%]  md:max-w-[90%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          At E.T. Phone Home Bands, we are committed to providing our customers
          with prompt and reliable shipping services. Please review our shipping
          policy for detailed information on our shipping practices.
        </p>
      </div>
      {/*  Shipping Destinations  */}
      <div className="mt-20">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Shipping Destinations :
        </h2>
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            We offer shipping both domestically within the United States and
            internationally.
          </li>
          <li className="md:text-lg md:font-medium">
            Free shipping offers are applicable only within the continental
            United States.
          </li>
        </ul>
      </div>
      {/* Shipping Methods */}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Shipping Methods :
        </h2>
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            We provide two shipping options: Standard and Express.
          </li>
          <li className="md:text-lg md:font-medium">
            Our shipping carriers include USPS, FedEx, and UPS.
          </li>
        </ul>
      </div>
      {/* Shipping Costs */}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Shipping Costs :
        </h2>
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            Domestic Shipping :
            <ul
              style={{
                listStyle: "circle",
              }}
              className="list-inside pl-9 md:pl-12 mt-3 space-y-3"
            >
              <li>We offer flat-rate shipping within the United States.</li>
              <li>
                Standard shipping is free for all orders within the continental
                U.S.
              </li>
              <li>Express shipping is available at an additional cost.</li>
            </ul>
          </li>
          <li className="md:text-lg md:font-medium">
            International Shipping :
            <ul
              style={{
                listStyle: "circle",
              }}
              className="list-inside pl-12 mt-3 space-y-3"
            >
              <li>
                Shipping costs for international orders are based on the
                destination.
              </li>
              <li>
                Additional charges such as customs fees and import taxes may
                apply.
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Processing Time */}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Processing Time :
        </h2>
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            All orders are processed within 3 business days.
          </li>
        </ul>
      </div>
      {/* Delivery Estimates */}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Delivery Estimates :
        </h2>
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            Standard U.S. Shipping: 3-10 business days.
          </li>
          <li className="md:text-lg md:font-medium">
            Express U.S. Shipping: 2-3 business days.
          </li>
          <li className="md:text-lg md:font-medium">
            Please note that delivery times may be affected by holidays, b
            weather conditions, and other unforeseen factors.
          </li>
        </ul>
      </div>
      {/* *Order Tracking */}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Order Tracking :
        </h2>
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            Order tracking is provided for all shipments
          </li>
          <li className="md:text-lg md:font-medium">
            A shipping confirmation email with tracking information will be sent
            once your order has been shipped.
          </li>
        </ul>
      </div>
      {/* Shipping Confirmation: */}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Shipping Confirmation :
        </h2>
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            Customers will receive a shipping confirmation email with tracking
            details once the order has been dispatched.
          </li>
        </ul>
      </div>
      {/* Lost or Delayed Shipments */}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Lost or Delayed Shipments :
        </h2>
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            While we strive for timely delivery, there may be occasional delays
            or lost shipments.
          </li>
          <li className="md:text-lg md:font-medium">
            If your order is delayed or lost, please contact our Customer
            Service <br className="max-md:hidden" /> team at{" "}
            <span className="text-primary font-bold">
              hello@etphonehomebands.com
            </span>{" "}
            We will work with the shipping carrier to resolve the issue
            promptly.
          </li>
        </ul>
      </div>
      {/* International Shipping */}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          International Shipping :
        </h2>
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            International orders may incur additional costs such as customs fees
            and import taxes, which are the responsibility of the customer.
          </li>
          <li className="md:text-lg md:font-medium">
            Customs clearance procedures may cause delays beyond our original
            delivery estimates.
          </li>
          <li className="md:text-lg md:font-medium">
            For assistance with customs delays or issues, please contact our
            Customer Service <br className="max-md:hidden" /> team at{" "}
            <span className="text-primary font-bold">
              hello@etphonehomebands.com
            </span>{" "}
          </li>
        </ul>
      </div>
      {/* Returns and Exchanges:*/}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Returns and Exchanges :
        </h2>
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            Please refer to our Refund Policy for detailed information on
            returns and exchanges.
          </li>
        </ul>
      </div>
      {/* Packaging */}
      <div className="mt-10">
        <h2 className="font-bold xl:font-semibold text-xl 2xl:text-2xl uppercase">
          Packaging :
        </h2>
        <ul className="list-inside list-disc mt-3 space-y-3">
          <li className="md:text-lg md:font-medium">
            Our products are securely packaged to ensure safe delivery.
          </li>
          <li className="md:text-lg md:font-medium">
            We are committed to sustainability and do not use single-use
            plastics in our packaging.
          </li>
        </ul>
      </div>

      {/* Contact Information  */}
      <div className="mt-20 border-t-[3px] border-primary border-dashed  pt-16 flex justify-center flex-col items-center text-center ">
        <p className="">
          For any questions or concerns regarding our shipping policy, please
          contact our Customer Service team at{" "}
          <span className="text-primary font-bold">
            hello@etphonehomebands.com
          </span>
          . Thank you for choosing{" "}
          <span className="font-bold ">E.T. Phone Home Bands.</span> We
          appreciate your business and look forward to serving you
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
