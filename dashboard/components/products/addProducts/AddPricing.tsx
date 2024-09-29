"use client";

import { InputNumber } from "rsuite";

const AddPricing = ({ field, setBasePrice }: any) => {
  return (
    <div>
      <label htmlFor="" className="font-medium">
        Base price
      </label>
      <InputNumber
        value={field.value}
        min={1}
        formatter={(value) => `€ ${value}`}
        onChange={(value) => {
          field.onChange(value);
          setBasePrice(value);
        }}
      />
    </div>
  );
};

export default AddPricing;
