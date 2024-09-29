import TotalControl from "@/components/HomePage/TotalControl";
import DualFunctionality from "@/components/HomePage/DualFunctionality";
import OurFeatures from "@/components/HomePage/OurFeatures";
import ConnectYourWay from "@/components/HomePage/ConnectYourWay";
import OurRange from "@/components/HomePage/OurRange";
import ProductsSection from "@/components/HomePage/ProductsSection";
import ReviewsSlider from "@/components/HomePage/ReviewsSlider";
import Faq from "@/components/HomePage/Faq";
import Hero from "@/components/HomePage/Hero";
import GpsLocation from "@/components/HomePage/GpsLocation";
import PrivacyPriority from "@/components/HomePage/PrivacyPriority";
import Stats from "@/components/HomePage/Stats";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <HeroSection />
      </div> */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <Stats />
      </div>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <ProductsSection />
      </div>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <DualFunctionality />
      </div>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <TotalControl />
      </div>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <OurRange />
      </div>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <ConnectYourWay />
      </div>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <GpsLocation />
      </div>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <OurFeatures />
      </div>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <PrivacyPriority />
      </div>
      <div className="bg-gray-50 py-10">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
          <ReviewsSlider />
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <Faq />
      </div>
    </>
  );
}
