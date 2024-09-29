/* eslint-disable @next/next/no-img-element */
// async function getData(categoryHref: string) {
//   const url = getBaseUrl();
//   const res = await fetch(`${url}/category/${categoryHref}`, {
//     next: {
//       tags: ["category"],
//       revalidate: 60,
//     },
//   });

//   return res.json();
// }

import Image from "next/image";
import { fileUrlKey, getBaseUrl } from "@/helpers/config/envConfig";
import TotalControl from "@/components/HomePage/TotalControl";
import ConnectYourWay from "@/components/HomePage/ConnectYourWay";
import BackupBuddySpecs from "@/components/HomePage/BackupBuddySpecs";

const CategoryPage = async ({
  params,
}: {
  params: { categoryHref: string };
}) => {
  // const singleCategory = await getData(params?.categoryHref);
  const singleCategory: any = {};
  // console.log(singleCategory);
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <>
        <div className="flex flex-col justify-center items-center px-4 bg-[#F5F5F7] py-20">
          <h2 className="text-4xl font-bold">
            {singleCategory?.data?.categoryName}
          </h2>
          <Image
            src={`${fileUrlKey()}/${singleCategory?.data?.categoryImage}`}
            width={500}
            height={500}
            alt=""
            className="py-10 w-2/7"
          />
          <span className="inline-block mb-4 text-sm md:text-3xl font-semibold leading-none text-primary capitalize  ">
            Revolutionizing Child Safety
          </span>
          <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-7xl text-center">
            One Easy Tap, <br /> Infinite Connection Options
          </h2>
        </div>
        <div className="text-center px-4 py-24">
          <h2 className="mb-6 text-2xl font-bold tracking-tight   max-w-3xl leading-9 mx-auto">
            No Subscriptions or ongoing payments, No apps, No charging ever, No
            Hacking & Tracking Risks, No EMFs.
          </h2>
          <p className="mb-6 text-lg font-medium tracking-tight text-gray-900   max-w-3xl leading-9 mx-auto">
            The easiest safety product on the market, Backup Buddy bands are the
            ultimate safety accessory for kids aged 3-11. Tap the band to any
            smart phone to instantly connect with contacts.
          </p>
          <h5 className="mb-6 text-gray-500 text-2xl font-semibold leading-tight tracking-tight   ">
            Price: $79 including Free Shipping
          </h5>
          <button className="bg-primary px-4 py-1 rounded-full text-white font-semibold hover:shadow-lg">
            Buy
          </button>
        </div>
        {/*  */}
        <div className="pb-20  ">
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="w-full md:w-1/2 md:mb-0 mb-8">
              <div className="relative  md:mr-0 w-full">
                <div className="relative overflow-hidden rounded-7xl">
                  <img
                    src="https://i.ibb.co/m47x7rx/phone2-540x.jpg"
                    alt=""
                    className="relative z-10 object-cover w-full h-full rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:mb-0 mb-8">
              <div className="relative  md:mr-0 w-full">
                <div className="relative overflow-hidden rounded-7xl">
                  <img
                    src="https://i.ibb.co/m47x7rx/phone2-540x.jpg"
                    alt=""
                    className="relative z-10 object-cover w-full h-full rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center px-4  py-20">
          <span className="inline-block mb-4 text-sm leading-none text-primary capitalize   border p-2 rounded-full border-primary">
            Access
          </span>
          <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-6xl pt-6">
            Tap or Scan. Anytime, Anywhere
          </h2>
          <p className="mb-3 text-xl font-semibold tracking-tight text-gray-500   max-w-4xl leading-8 mx-auto pt-4 pb-2 text-center">
            Security and connection on their wrist, whether they are across the
            street or across the world - an easy tap or scan bridges the gap,
            ensuring you’re there when they need you.
          </p>
          <p className="text-xl font-semibold tracking-tight text-gray-500   max-w-4xl leading-8 mx-auto   text-center">
            The dual functionality of NFC & QR code technology makes it
            compatible with all smartphones.
          </p>
          <p className="mb-6 text-xl font-semibold tracking-tight text-gray-500   max-w-5xl leading-8 mx-auto pt-4 pb-10 text-center">
            Unlimited profile contacts controlled by you, accessed by them as
            needed; this is a buddy that {`won't`} let you down
          </p>
          <img
            src="https://i.ibb.co/qr3vnph/share-airtag-cg30tsedr8pe-large.jpg"
            alt=""
          />
        </div>
        <TotalControl />
        <div className="flex flex-col justify-center items-center px-4  py-20">
          <span className="inline-block mb-4 text-sm leading-none text-primary capitalize   border p-2 rounded-full border-primary">
            Access
          </span>
          <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-6xl pt-6">
            More Color. More Adventure. More Safety.
          </h2>
          <p className="mb-6 text-xl font-semibold tracking-tight text-gray-500   max-w-4xl leading-8 mx-auto pt-4 text-center">
            Fashion Meets Function. From vibrant colors to sleek lightweight
            designs, our durable bands seamlessly blend fashion and
            functionality. Your child will love wearing their safety accessory
            as much as you’ll love their added protection. Eye catching style
            that speaks safety.
          </p>
          <button className="bg-primary px-4 py-1 rounded-full text-white font-semibold hover:shadow-lg mb-10">
            Buy
          </button>
          <img
            src="https://i.ibb.co/VMJvtJB/accessories-d028mzwnd0a6-large.jpg"
            alt=""
            className="w-full"
          />
        </div>
        {/* Unrivalled design */}
        <div className="flex flex-col justify-center items-center px-4  py-20">
          <span className="inline-block mb-4 text-sm leading-none text-primary capitalize   border p-2 rounded-full border-primary">
            Access
          </span>
          <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-6xl pt-6">
            Unrivalled design
          </h2>
          <p className="mb-6 text-xl font-semibold tracking-tight text-gray-500   max-w-5xl leading-8 mx-auto pt-4 text-center">
            E.T. Phone home bands are crafted with high quality hypoallergenic
            materials and designed to withstand even the most active adventures.
            Lightweight, waterproof and comfortable and never requiring
            charging, our adjustable bands are the perfect buddy to wear every
            day. From playgrounds and beaches to theme parks and shopping malls,
            peace of mind is just an Easy Tap away.
          </p>
          <button className="bg-primary px-4 py-1 rounded-full text-white font-semibold hover:shadow-lg mb-10">
            Buy
          </button>
          <img
            src="https://i.ibb.co/VMJvtJB/accessories-d028mzwnd0a6-large.jpg"
            alt=""
            className="w-full"
          />
        </div>
        {/* Unrivalled design */}
        <div className="flex flex-col justify-center items-center px-4  py-20">
          <span className="inline-block mb-4 text-sm leading-none text-primary capitalize   border p-2 rounded-full border-primary">
            Access
          </span>
          <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-6xl pt-6">
            Unrivalled design
          </h2>
          <p className="mb-6 text-xl font-semibold tracking-tight text-gray-500   max-w-5xl leading-8 mx-auto pt-4 text-center">
            E.T. Phone home bands are crafted with high quality hypoallergenic
            materials and designed to withstand even the most active adventures.
            Lightweight, waterproof and comfortable and never requiring
            charging, our adjustable bands are the perfect buddy to wear every
            day. From playgrounds and beaches to theme parks and shopping malls,
            peace of mind is just an Easy Tap away.
          </p>
          <button className="bg-primary px-4 py-1 rounded-full text-white font-semibold hover:shadow-lg mb-10">
            Buy
          </button>
          <img
            src="https://i.ibb.co/VMJvtJB/accessories-d028mzwnd0a6-large.jpg"
            alt=""
            className="w-full"
          />
        </div>
        {/*  */}
        {/*      Empowerment Through Frictionless Technology */}
        <div className="flex flex-col justify-center items-center px-4  py-20">
          <span className="inline-block mb-4 text-sm leading-none text-primary capitalize   border p-2 rounded-full border-primary">
            Access
          </span>
          <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-6xl pt-6 text-center">
            Empowerment Through Frictionless Technology
          </h2>
          <p className="mb-6 text-xl font-semibold tracking-tight text-gray-500   max-w-5xl leading-8 mx-auto pt-4 text-center">
            Empower your child to take responsibility for their safety. The easy
            tap to call, text or send GPS location feature gives them the
            confidence to seek help from any of their contacts when needed in
            just a matter of seconds. Reduce separation time and separation
            anxiety. No charging required ever.
          </p>
          <button className="bg-primary px-4 py-1 rounded-full text-white font-semibold hover:shadow-lg mb-10">
            Buy
          </button>
          <img
            src="https://i.ibb.co/VMJvtJB/accessories-d028mzwnd0a6-large.jpg"
            alt=""
            className="w-full"
          />
        </div>
        {/*      Always Adventure Ready. How Does It Work?  */}
        <div className="flex flex-col justify-center items-center px-4  py-20">
          <span className="inline-block mb-4 text-sm leading-none text-primary capitalize   border p-2 rounded-full border-primary">
            Access
          </span>
          <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-6xl pt-6 text-center">
            Always Adventure Ready. How Does It Work?
          </h2>
          <p className="mb-4 text-xl font-semibold tracking-tight text-gray-500   max-w-5xl leading-8 mx-auto pt-4 text-center">
            Finding the line between safe phone exposure and emergency
            connection. A bright yellow yield symbol and clear communication on
            the band face ensures that anyone can easily and quickly understand
            and assist.
          </p>
          <p className="mb-6 text-xl font-semibold tracking-tight text-gray-500   max-w-5xl leading-8 mx-auto   text-center">
            When tapped to a smartphone or scanned by the camera your E.T Phone
            Home band instantly loads your secure profile with all your contact
            information. With clear and simple options to call, text, video call
            or share accurate GPS location, connection is instant and unlimited
            with as many contacts as you choose. So simple a toddler can do it.
          </p>
          <div className="pb-20">
            <p className="text-xl font-semibold tracking-tight text-gray-500   max-w-5xl leading-8 mx-auto pt-4 text-center">
              Easy as 1,2,3
            </p>
            <ul className="list-decimal list-inside mb-6 text-xl font-semibold tracking-tight text-gray-500   max-w-5xl leading-8 mx-auto pt-4  ">
              <li>Order & Receive your band </li>
              <li>Upload your contact information</li>
              <li>
                Wear your band and enjoy worry free adventures knowing
                connection is just a tap away
              </li>
            </ul>
          </div>

          <div>
            <img
              src="https://i.ibb.co/VMJvtJB/accessories-d028mzwnd0a6-large.jpg"
              alt=""
              className="w-full"
            />
          </div>
        </div>

        {/*      Privacy Matters. You're in Control         */}
        <div className="flex flex-col justify-center items-center px-4  py-20">
          <span className="inline-block mb-4 text-sm leading-none text-primary capitalize   border p-2 rounded-full border-primary">
            Access
          </span>
          <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-6xl pt-6 text-center">
            Privacy Matters. {`You're`} in Control
          </h2>
          <p className="mb-6 text-xl font-semibold tracking-tight text-gray-500   max-w-5xl leading-8 mx-auto pt-4 text-center">
            Our bands give you the power to control what’s shared. You decide
            what contact information is displayed and when it is kept private.
            Safeguarding your data in {`today's`} digital world. If lost, simply
            activate private mode to shield all information. Your profile is
            only accessible with a tap or scan from your unique band and is not
            searchable on the web.
          </p>
          <button className="bg-primary px-4 py-1 rounded-full text-white font-semibold hover:shadow-lg mb-10">
            Buy
          </button>
          <img
            src="https://i.ibb.co/VMJvtJB/accessories-d028mzwnd0a6-large.jpg"
            alt=""
            className="w-full"
          />
        </div>
        {/*       What's In The Box         */}
        <div className="flex flex-col justify-center items-center px-4  py-20">
          <span className="inline-block mb-4 text-sm leading-none text-primary capitalize   border p-2 rounded-full border-primary">
            Access
          </span>
          <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-6xl pt-6 text-center">
            {`What's`} In The Box
          </h2>
          <ul className="list-decimal list-inside mb-6 text-xl font-semibold tracking-tight text-gray-500  space-y-5 max-w-5xl leading-8 mx-auto pt-4  ">
            <li>
              <span className="font-extrabold">Backup Buddy Band:</span> The
              E.T. Phone Home Band, your {`child's`} new safety companion.
              Simply tap or scan to set up your profile.
            </li>
            <li>
              <span className="font-extrabold">Mini Backpack Keychain:</span> A
              convenient and stylish keychain that serves as a portable storage
              solution for your {`child's`} E.T. Phone Home Band. Attach it to a
              backpack, belt loop, or keyring for easy access whenever needed.
            </li>
            <li>
              <span className="font-extrabold"> Mystery {`"Magic"`} Gift:</span>{" "}
              A special surprise gift that adds an element of excitement to
              unboxing the E.T. Phone Home Band. This mystery gift is designed
              to delight and engage your child, making the unboxing experience
              even more memorable.
            </li>
          </ul>{" "}
          <p className="mb-6 text-xl font-semibold tracking-tight text-gray-500   max-w-5xl leading-8 mx-auto pt-4 text-center">
            With these items, your child is ready to embark on a safe and fun
            adventure, knowing that help is just a tap away with the E.T. Phone
            Home Band.
          </p>
          <img
            src="https://i.ibb.co/VMJvtJB/accessories-d028mzwnd0a6-large.jpg"
            alt=""
            className="w-full"
          />
        </div>

        {/*  */}
        <ConnectYourWay />
        <BackupBuddySpecs />
      </>
    </div>
  );
};

export default CategoryPage;
