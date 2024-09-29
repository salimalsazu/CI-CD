"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import PromoBanner from "@/components/PromoBanner/PromoBanner";
import Script from "next/script";

const layout = ({ children }: any) => {
  return (
    <div>
      {/* <Script
        id="tawk"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/65e4b9599131ed19d97440f8/1ho2n8215';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      /> */}

      <div>
        <div className="sticky top-0 z-50">
          <PromoBanner />
          <Navbar />
        </div>
        <div>{children}</div>
        <div className="bg-primary">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
