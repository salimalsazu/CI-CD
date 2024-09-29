/* eslint-disable @typescript-eslint/no-explicit-any */
export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error('Expected an array');
  }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const isValidISOString = (value: string): boolean => {
  try {
    new Date(value).toISOString();
    return true;
  } catch (error) {
    return false;
  }
};

export const getDateISODateWithoutTimestamp = (date: Date) => {
  // Extract the year, month, and day
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
  const day = date.getDate();

  // Format the date as a string
  const formattedDate = `${year}-${month}-${day}`
  return formattedDate;
}