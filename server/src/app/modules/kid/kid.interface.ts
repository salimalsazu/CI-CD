export type IProductFilterRequest = {
  searchTerm?: string | undefined;
};

export type IKidRequest = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  kidAge: Date;
  userId: string;
  code: string;
  relations: IRelation[];
};

export type IKidUpdateRequest = {
  kidName?: string;
  kidAge?: Date;
  relations?: IRelation[];
  kidImage?: string;
};

export type IRelation = {
  firstName: string;
  lastName?: string;
  relation: string;
  phoneNo: string;
};

export type IRequestUser = {
  email: string;
  userId: string;
  profileId: string;
  iat: number;
  exp: number;
};
export type ICreateKidDetails = {
  kidImage?: string;
  barcodeId: string;
  firstName: string;
  lastName?: string;
  userId?: string;
  kidAge: Date;
  relations: IRelation[];
};
