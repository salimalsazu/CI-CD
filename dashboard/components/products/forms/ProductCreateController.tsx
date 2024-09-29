"use client";
import { Controller, Control, FieldValues, FieldError } from "react-hook-form";
import { Form, Input, InputGroup } from "rsuite";

type Pattern = {
  value: RegExp;
  message: string;
};

type ISignUp = {
  name: string;
  control: any;
  icon: React.ReactNode;
  errors: FieldError | any;
  placeholder: string;
  requiredMessage?: string | undefined;
  type?: string;
  label: string;
  pattern?: Pattern;
};

const ProductCreateController = ({
  name,
  control,
  icon,
  errors,
  requiredMessage,
  placeholder,
  pattern,
  type,
  label,
}: ISignUp) => {
  const rules: {
    required?: string;
    pattern?: Pattern;
    validate?: any;
  } = {};

  if (requiredMessage) rules.required = requiredMessage;

  if (pattern) rules.pattern = pattern;

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div className="space-y-1">
            <label className="block font-medium text-black dark:text-whiten">
              {label}
            </label>
            <div className="rs-form-control-wrapper ">
              <InputGroup
                size="lg"
                style={{
                  width: "100%",

                  overflow: "hidden !important",
                }}
                inside
              >
                <Input
                  {...field}
                  size="lg"
                  type={type ?? "text"}
                  placeholder={placeholder}
                />
                <InputGroup.Addon>{icon}</InputGroup.Addon>
              </InputGroup>
              <Form.ErrorMessage
                show={(!!errors?.[name] && !!errors?.[name]?.message) || false}
                placement="topEnd"
              >
                <span className="font-semibold">{errors?.[name]?.message}</span>
              </Form.ErrorMessage>
            </div>
          </div>
        )}
      />
    </>
  );
};

export default ProductCreateController;
