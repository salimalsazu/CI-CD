import { useGetTaxQuery } from "@/redux/api/features/stateTaxApi";
import { ICheckoutDeliveryForm } from "@/types/forms/checkoutTypes";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Form, SelectPicker } from "rsuite";

const CheckoutDeliveryForm = ({
  control,
  errors,
}: {
  control: Control<ICheckoutDeliveryForm>;
  errors: FieldErrors<ICheckoutDeliveryForm>;
}) => {
  const { data: stateTax } = useGetTaxQuery({});
  const data = stateTax?.data?.map((item: any) => ({
    label: item.state,
    // value: item.tax,
    value: item.state,
  }));
  return (
    <div>
      <div>
        <div>
          <h3 className="font-bold text-xl mb-2">CONTACT</h3>
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <div className="rs-form-control-wrapper">
                <input
                  {...field}
                  name="email"
                  type="text"
                  className={`w-full py-3 px-4 duration-200 border rounded-lg border-zinc-300 placeholder-zinc-300 text-sm `}
                  placeholder="Enter Email..."
                />
                <Form.ErrorMessage
                  show={error?.message && (error?.message as any)}
                  placement="topEnd"
                >
                  <span className="font-semibold">
                    {errors?.email?.message}
                  </span>
                </Form.ErrorMessage>
              </div>
            )}
          />
        </div>
        {/* DELIVERY */}
        <div>
          <div>
            <h3 className="font-bold text-xl mt-5 mb-2">DELIVERY</h3>
          </div>
          {/* first & last name */}

          <div className="flex gap-3 w-full ">
            <div className="w-full">
              <label htmlFor="email" className="block mb-1">
                First Name
              </label>
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: "First Name is Required",
                }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <input
                      {...field}
                      name="firstName"
                      type="text"
                      className={`w-full py-3 px-4 duration-200 border rounded-lg border-zinc-300 placeholder-zinc-300 text-sm `}
                      placeholder="First Name..."
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.firstName && !!errors?.firstName?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.firstName?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
            <div className="w-full">
              <label htmlFor="lastName" className="block mb-1">
                Last Name
              </label>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: "Last Name is Required",
                }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <input
                      {...field}
                      name="lastName"
                      type="text"
                      className={`w-full py-3 px-4 duration-200 border rounded-lg border-zinc-300 placeholder-zinc-300 text-sm `}
                      placeholder="Last Name..."
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.lastName && !!errors?.lastName?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.lastName?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
          </div>
          {/* address */}
          <div className="mt-2">
            <div>
              <label htmlFor="address" className="block mb-1">
                Address
              </label>
              <Controller
                name="address"
                control={control}
                rules={{
                  required: "Address is Required",
                }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <input
                      {...field}
                      name="address"
                      type="text"
                      className={`w-full py-3 px-4 duration-200 border rounded-lg border-zinc-300 placeholder-zinc-300 text-sm `}
                      placeholder="Enter Address..."
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.address && !!errors?.address?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.address?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
          </div>
          {/* city & postcode */}
          <div className="grid grid-cols-3 gap-3 mt-2">
            <div>
              <label htmlFor="city" className="block mb-1">
                City
              </label>
              <Controller
                name="city"
                control={control}
                rules={{
                  required: "City is Required",
                }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <input
                      {...field}
                      name="city"
                      type="text"
                      className={`w-full py-2.5 px-4 duration-200 border rounded-lg border-zinc-300 placeholder-zinc-300 text-sm `}
                      placeholder="Enter city..."
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.city && !!errors?.city?.message) || false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.city?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
            {/* state */}
            <div>
              <label htmlFor="state" className="block mb-1">
                State
              </label>
              <Controller
                name="state"
                control={control}
                rules={{
                  required: "state is Required",
                }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <SelectPicker
                      onChange={(value: any) => field.onChange(value)}
                      data={data}
                      searchable={false}
                      size="lg"
                      className={`w-full`}
                      placeholder="State"
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.state && !!errors?.state?.message) || false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.state?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
            {/*  postal code */}
            <div>
              <label htmlFor="postalCode" className="block mb-1">
                Postal Code
              </label>
              <Controller
                name="postalCode"
                control={control}
                rules={{
                  required: "postalCode is Required",
                }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <input
                      {...field}
                      name="city"
                      type="text"
                      className={`w-full py-2.5 px-4 duration-200 border rounded-lg border-zinc-300 placeholder-zinc-300 text-sm `}
                      placeholder="Enter postal code..."
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.postalCode &&
                          !!errors?.postalCode?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.postalCode?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
          </div>
          {/* phone */}
          <div className="mt-2">
            <label htmlFor="phone" className="block mb-1">
              Phone Number
            </label>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Phone is Required",
              }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <input
                    {...field}
                    name="city"
                    type="text"
                    className={`w-full py-2.5 px-4 duration-200 border rounded-lg border-zinc-300 placeholder-zinc-300 text-sm `}
                    placeholder="Enter postal code..."
                  />
                  <Form.ErrorMessage
                    show={
                      (!!errors?.phone && !!errors?.phone?.message) || false
                    }
                    placement="topEnd"
                  >
                    <span className="font-semibold">
                      {errors?.phone?.message}
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

export default CheckoutDeliveryForm;
