"use client";

import { FaPencil } from "react-icons/fa6";
import EmailSettingDrawer from "./EmailSettingDrawer";
import { useState } from "react";
import NameSettingDrawer from "./NameSettingDrawer";
import { useGetMyProfileQuery } from "@/redux/api/features/userApi";
import PasswordSettingDrawer from "./PasswordSettingDrawer";
import PhoneNumberSettingDrawer from "./PhoneNumberSettingDrawer";

const SettingPage = () => {
  const { data } = useGetMyProfileQuery({});
  const [isOpenEmailEdit, setIsOpenEmailEdit] = useState(false);
  const [isOpenNameEdit, setIsOpenNameEdit] = useState(false);
  const [isOpenPasswordEdit, setIsOpenPasswordEdit] = useState(false);
  const [isOpenPhoneNumberEdit, setIsOpenPhoneNumberEdit] = useState(false);
  //
  const handleCloseEmailEdit = () => setIsOpenEmailEdit(false);
  const handleCloseNameEdit = () => setIsOpenNameEdit(false);
  const handlePasswordEdit = () => setIsOpenPasswordEdit(false);
  const handlePhoneNumberEdit = () => setIsOpenPhoneNumberEdit(false);
  return (
    <>
      <div className="mt-10">
        <div className="space-y-2 md:space-y-3">
          <h1 className="text-4xl font-bold text-pure_black">Settings</h1>
          <p className="text-[#898c90]">
            Edit your account and security settings.
          </p>
        </div>
        {/*  settings */}
        <div className="mt-10">
          {/* section title */}
          <div>
            <h1 className="text-2xl font-bold text-pure_black">Account</h1>
          </div>
          {/* email */}
          <div className="mt-3  border-t  border-b py-3 flex justify-between  items-center">
            <div>
              <h4 className="text-xl font-bold text-pure_black">Email</h4>
              <p className="text-[#898c90]">{data?.data?.email}</p>
            </div>
            <div>
              <button
                onClick={() => setIsOpenEmailEdit(true)}
                type="button"
                className="p-4 outline-none  hover:bg-gray-200 duration-300 transition-all   rounded-full"
              >
                <FaPencil size={30} />
              </button>
            </div>
          </div>
          {/* Name */}
          <div className="border-b py-3 flex justify-between  items-center">
            <div>
              <h4 className="text-xl font-bold text-pure_black">Name</h4>
              <p className="text-[#898c90]">
                {data?.data?.profile?.firstName || "N/A"}{" "}
                {data?.data?.profile?.lastName}{" "}
              </p>
            </div>
            <div>
              <button
                onClick={() => setIsOpenNameEdit(true)}
                type="button"
                className="p-4 outline-none  hover:bg-gray-200 duration-300 transition-all   rounded-full"
              >
                <FaPencil size={30} />
              </button>
            </div>
          </div>
          {/* Phone Number */}
          <div className="border-b py-3 flex justify-between  items-center">
            <div>
              <h4 className="text-xl font-bold text-pure_black">
                Phone Number
              </h4>
              <p className="text-[#898c90]">
                {data?.data?.profile?.mobileNumber || "N/A"}
              </p>
            </div>
            <div>
              <button
                onClick={() => setIsOpenPhoneNumberEdit(true)}
                type="button"
                className="p-4 outline-none  hover:bg-gray-200 duration-300 transition-all   rounded-full"
              >
                <FaPencil size={30} />
              </button>
            </div>
          </div>
        </div>
        {/* security section title */}
        <div className="mt-10">
          <div>
            <h1 className="text-2xl font-bold text-pure_black">Security</h1>
          </div>
          {/* Password */}
          <div className="border-b border-t mt-3 py-3 flex justify-between  items-center">
            <div>
              <h4 className="text-xl font-bold text-pure_black">Password</h4>
              <p className="text-[#898c90] text-xl">**********</p>
            </div>
            <div>
              <button
                onClick={() => setIsOpenPasswordEdit(true)}
                className="p-4 outline-none  hover:bg-gray-200 duration-300 transition-all rounded-full"
                type="button"
              >
                <FaPencil size={30} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Drawers */}

      {/* email setting */}
      <EmailSettingDrawer
        isOpen={isOpenEmailEdit}
        handleClose={handleCloseEmailEdit}
      />

      {/* Name Setting */}

      <NameSettingDrawer
        isOpen={isOpenNameEdit}
        handleClose={handleCloseNameEdit}
      />
      {/* password Setting */}

      <PasswordSettingDrawer
        isOpen={isOpenPasswordEdit}
        handleClose={handlePasswordEdit}
      />

      {/* phone number setting */}
      <PhoneNumberSettingDrawer
        isOpen={isOpenPhoneNumberEdit}
        handleClose={handlePhoneNumberEdit}
      />
    </>
  );
};

export default SettingPage;
