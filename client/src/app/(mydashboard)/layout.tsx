"use client";
import MyAccountNavbar from "@/components/Navbar/MyAccountNavbar";

import { isLoggedIn } from "@/hooks/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "rsuite";

const MyAccountLayout = ({ children }: any) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // !

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/sign-in");
    }

    setIsLoading(false);
  }, [router, userLoggedIn]);
  if (isLoading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Loader size="lg" content="Checking Authentication..." vertical />
      </div>
    );
  }

  if (!!userLoggedIn && !isLoading)
    return (
      <div className="max-xl:px-4  max-w-3xl mx-auto">
        <div>
          <MyAccountNavbar />
        </div>
        <div>{children}</div>
      </div>
    );
};

export default MyAccountLayout;
