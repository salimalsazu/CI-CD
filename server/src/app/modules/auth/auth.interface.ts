import { UserRoles } from '@prisma/client';

export type IUserCreate = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: UserRoles;
};

export type IUserProfileResponse = {
  fullName: string;
  profileId: string;
  mobileNumber: string;
  mother: string;
  motherPhoneNumber: string;
  father: string;
  fatherPhoneNumber: string;
  aunt: string;
  auntPhoneNumber: string;
  uncle: string;
  unclePhoneNumber: string;
  friend: string;
  friendPhoneNumber: string;
  grandFather: string;
  grandFatherPhoneNumber: string;
  grandMother: string;
  grandMotherPhoneNumber: string;
  address: string;
  role: UserRoles | null;
  createdAt: Date;
  updatedAt: Date;
};

export type IUserResponse = {
  userId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  profile: IUserProfileResponse;
};

export type IUserLogin = {
  email: string;
  password: string;
};
export type ILoginUserResponse = {
  accessToken: string;
  refreshToken: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
