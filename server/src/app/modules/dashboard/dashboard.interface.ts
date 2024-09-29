export type IHallListFilterRequest = {
  searchTerm?: string | undefined;
};

export type IHallRequest = {
  hallName: string;
  description: string;
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

export type IHallUpdateRequest = {
  hallName?: string;
  description?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
};
