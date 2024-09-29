import { PromotionType } from '@prisma/client';

export type IPromoFilterRequest = {
  searchTerm?: string | undefined;
};

export type IPromoRequest = {
  productId: string;
  promotionName: string;
  promoCode: string;
  expireDate: Date;
  type: PromotionType;
  buy?: number;
  get?: number;
  threshold?: number;
  discount?: number;
};

export type IPromoUpdateRequest = {
  productId?: string[];
  promotionName?: string;
  promoCode?: string;
  expireDate?: Date;
  type?: PromotionType;
  buy?: number;
  get?: number;
  threshold?: number;
  discount?: number;
};
