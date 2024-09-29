/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

type UpdateValueType = string | undefined;

type UpdateDataObject = {
  [dataName: string]: UpdateValueType;
};

export const updateCategoryData = async (updates: UpdateDataObject) => {
  const filteredUpdates = Object.entries(updates)
    .filter(([_, value]) => value !== undefined && value !== null && !Number.isNaN(value))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return {
    ...filteredUpdates,
  };
};
