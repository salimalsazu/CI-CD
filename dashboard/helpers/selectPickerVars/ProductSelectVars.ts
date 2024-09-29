export const barCodeStatus = [
  {
    label: "AVAILABLE",
    value: "AVAILABLE",
  },
  {
    label: "ACTIVE",
    value: "ACTIVE",
  },
  {
    label: "INACTIVE",
    value: "INACTIVE",
  },
].map((item) => {
  return {
    label: item.label,
    value: item.value,
  };
});
