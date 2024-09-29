"use client";
import Loader from "@/components/common/Loader";
import { isLoggedIn } from "@/helpers/hooks/auth.helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const userLoggedIn = isLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (userLoggedIn) {
      router.push("/");
    }

    setIsLoading(false);
  }, [isLoading, userLoggedIn, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (!userLoggedIn && !isLoading) return <div>{children}</div>;
};

export default AuthLayout;
