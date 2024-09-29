"use client";
import { isLoggedIn } from "@/helpers/hooks/auth.helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";

const DashboardLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const userLoggedIn = isLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/auth/signin");
    }

    setIsLoading(false);
  }, [isLoading, userLoggedIn, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (userLoggedIn && !isLoading) return <div>{children}</div>;
};

export default DashboardLayoutProvider;
