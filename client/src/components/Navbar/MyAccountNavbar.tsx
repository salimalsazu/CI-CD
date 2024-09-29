"use client";

import { getAuthKey } from "@/helpers/config/envConfig";
import { isLoggedIn, removeUserInfo } from "@/hooks/services/auth.service";
import { useGetMyProfileQuery } from "@/redux/api/features/userApi";
import { useRouter } from "next/navigation";
import { FaRegBell } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { Dropdown } from "rsuite";

const MyAccountNavbar = () => {
  const userLoggedIn = isLoggedIn();
  const renderIconButton = (props: any, ref: any) => {
    return (
      <button
        className=" bg-gray-200 px-2 py-1.5 rounded-lg "
        {...props}
        ref={ref}
      >
        <SlOptions size={25} />
      </button>
    );
  };
  const router = useRouter();

  const { data, isLoading, isError } = useGetMyProfileQuery(
    {},
    {
      skip: !userLoggedIn,
    }
  );

  return (
    <div className="flex max-w-screen-xl mx-auto justify-between w-full items-center my-4 md:my-5 xl:mt-6 xl:mb-0  ">
      {/* left content */}
      <div className="">
        <Dropdown
          size="lg"
          suppressHydrationWarning
          renderToggle={renderIconButton}
        >
          {!isLoading && data && (
            <>
              <Dropdown.Item panel style={{ padding: 10, width: 170 }}>
                <p>Signed in as</p>
                <strong className="break-all">{data?.data?.email}</strong>
              </Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Item
                className="!font-bold"
                onClick={() => router.push("/my-account")}
              >
                <span className="text-black">Home</span>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => router.push("/my-account/contact-info")}
                className="!font-bold"
              >
                <span className="text-black">Contact Info</span>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => router.push("/my-account/settings")}
                className="!font-bold"
              >
                <span className="text-black">Settings</span>
              </Dropdown.Item>
              <Dropdown.Separator />
            </>
          )}

          <Dropdown.Item disabled className="!font-bold">
            <span className="">FAQ</span>
          </Dropdown.Item>
          <Dropdown.Item
            className="!font-bold"
            onClick={() => router.push("/")}
          >
            <span className="text-black">Shop</span>
          </Dropdown.Item>
          {!isLoading && data && (
            <Dropdown.Item
              className="  !font-bold"
              onClick={() => {
                removeUserInfo(getAuthKey());
                router.push("/sign-in");
              }}
            >
              <span className="text-red-600">Log Out</span>
            </Dropdown.Item>
          )}

          {!isLoading && !data && (
            <>
              <Dropdown.Item
                className="!font-bold"
                onClick={() => router.push("/sign-in")}
              >
                Login
              </Dropdown.Item>
              <Dropdown.Item
                className="!font-bold"
                onClick={() => router.push("/sign-up")}
              >
                Registration
              </Dropdown.Item>
            </>
          )}
        </Dropdown>
      </div>
      {/* center */}
      <div className="text-xl font-bold">E.T. Phone Home</div>
      {/* right content */}
      {!isLoading && data && (
        <div>
          <button className="bg-gray-200 px-2 py-1.5 rounded-lg ">
            <FaRegBell size={25} />
          </button>
        </div>
      )}
    </div>
  );
};
export default MyAccountNavbar;
