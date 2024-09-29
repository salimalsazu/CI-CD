export type ITaxFilterRequest = {
  searchTerm?: string | undefined;
};

export type ITaxRequest = {
  state: string;
  tax: number;
};

export type ITaxUpdateRequest = {
  state?: string | undefined;
  tax?: string | undefined;
};
