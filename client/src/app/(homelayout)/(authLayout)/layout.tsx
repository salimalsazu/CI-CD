"use client";
import { isLoggedIn } from "@/hooks/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "rsuite";

const AuthLayout = ({ children }: any) => {
  const userLoggedIn = isLoggedIn();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      if (userLoggedIn) {
        router.push("/my-account");
      } else {
        setIsLoading(false);
      }
    };

    // Check authentication only if isLoading is true
    if (isLoading) {
      checkAuthentication();
    }
  }, [router, userLoggedIn, isLoading]); // Include isLoading as a dependency

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader size="lg" content="loading..." vertical />
      </div>
    );
  }
  if (!userLoggedIn) {
    return children;
  }
};

export default AuthLayout;
