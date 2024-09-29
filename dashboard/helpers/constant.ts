import { addDays } from "date-fns";

export const predefinedRanges = [
  {
    label: "Next Sunday",
    value: () => {
      const currentDate = new Date();
      const daysUntilNextSunday = 7 - currentDate.getDay(); // Calculate days until next Sunday
      const nextSunday = addDays(currentDate, daysUntilNextSunday);
      return [nextSunday, addDays(nextSunday, 1)]; // Set the date range from next Sunday to next Monday
    },
  },
  {
    label: "Next 30 days",
    value: [new Date(), addDays(new Date(), 30)],
  },
];

const promos = [
  {
    label: "BUY_ITEM_GET_ITEM",
    value: "BUY_ITEM_GET_ITEM",
  },
  {
    label: "DISCOUNT_BASED_ON_AMOUNT",
    value: "DISCOUNT_BASED_ON_AMOUNT",
  },
];

export const promoTypeEnums = promos?.map((promo: any) => {
  return {
    label: promo.label,
    value: promo.value,
  };
});

const isActive = [
  {
    label: "True",
    value: true,
  },
  {
    label: "False",
    value: false,
  },
];

export const isActiveBoolean = isActive.map((active: any) => {
  return {
    label: active.label,
    value: active.value,
  };
});
