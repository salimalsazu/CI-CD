"use client";

import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/features/userApi";
import { Controller, useForm } from "react-hook-form";
import { Form, Toggle } from "rsuite";

type IUpdateContactInfo = {
  displayContactInfo: boolean;
};

const ContactInfo = () => {
  const { data } = useGetMyProfileQuery({});

  const {
    control,
    formState: { errors },
  } = useForm<IUpdateContactInfo>();

  const [updateMyProfile, { data: updatedResData, isLoading }] =
    useUpdateMyProfileMutation();

  const handleUpdateContactInfo = async (updatedData: IUpdateContactInfo) => {
    await updateMyProfile({
      data: {
        displayContactInfo: updatedData.displayContactInfo,
      },
    });
  };

  return (
    <div className="mt-10">
      <div className="space-y-2 md:space-y-3">
        <h1 className="text-4xl font-bold text-pure_black">Contact Info</h1>
        <p className="text-[#898c90]">
          Your contact information will be displayed on all of your bands
          profiles.
        </p>
      </div>
      <div className="mt-10">
        <div className="mt-3 border-t border-b py-3 flex justify-between items-center">
          <div>
            <h4 className="text-xl font-bold text-pure_black">
              Privacy Control
            </h4>
            <p className="text-[#898c90]">
              Only display Contact information when your kid is lost.
            </p>
          </div>
          <div>
            <Controller
              name="displayContactInfo"
              control={control}
              rules={{
                required: "Display Contact Info is required",
              }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <Toggle
                    size="lg"
                    checked={data?.data?.profile?.displayContactInfo}
                    color="cyan"
                    loading={isLoading}
                    checkedChildren="Shown"
                    unCheckedChildren="Hidden"
                    onChange={(checked) => {
                      field.onChange(checked);
                      handleUpdateContactInfo({
                        displayContactInfo: checked,
                      });
                    }}
                  />

                  <Form.ErrorMessage
                    show={!!errors?.displayContactInfo?.message || false}
                    placement="topEnd"
                  >
                    <span className="font-semibold">
                      {errors?.displayContactInfo?.message}
                    </span>
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
