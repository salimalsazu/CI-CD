import { FileType } from "rsuite/esm/Uploader";

export type ICreateProduct = {
  productName: string;
  productDescription: string;
  productPrice: string;
  productStock: string;
  categoryId: string;
  colorVarientId: string;
  sizeVarientId?: string;
  productImage: FileType;
};

// ! edit product details
export type IUpdateProduct = {
  productName?: string;
  productDescription?: string;
  productPrice?: string;
  productStock?: string;
  categoryId?: string;
  productStatus?: string;
  featuredImage?: FileType;
};
export type ICreateBatchProduct = {
  productVat: string;
  batchPrice: string;
  batchPackType: string;
  productId: string;
  categoryHref: string;
  subCategoryHref: string;
};

// ! edit batch product
export type IUpdateBatchProduct = {
  productVat?: string;
  batchPrice?: string;
  batchPackType?: string;
  productId?: string;
};
export type IAddOptionalItems = {
  productId: string;
  batchProductId: string[];
  categoryHref: string;
  subCategoryHref: string;
};

export type ICreateProductQA = {
  productId: string;
  question: string;
  answer: string;
  categoryHref: string;
};

export type IUpdateProductQA = {
  productId?: string;
  question?: string;
  answer?: string;
};

export type ICreateProductPromo = {
  promotionName: string;
  promoCode: string;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  type: string;
  buyItemGetItemPromotion: buyItemGetItemPromotion;
};

type buyItemGetItemPromotion = {
  requiredItemId: string;
  requiredQuantity: number;
  rewardItemId: string;
  rewardQuantity: number;
};

export type IUpdateProductPromo = {
  promotionName?: string | undefined;
  promoCode?: string | undefined;
  isActive?: boolean | undefined;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  type?: string;
  buyItemGetItemPromotion?:
    | {
        requiredItemId?: string | undefined;
        requiredQuantity?: number | undefined;
        rewardItemId?: string | undefined;
        rewardQuantity?: number | undefined;
      }
    | undefined;
};

export type ICreateTestimonial = {
  clientName: string;
  testimonialTitle: string;
  testimonialDescription: string;
  rating: string;
  clientImage: FileType;
};

export type IUpdateTestimonial = {
  testimonialId?: string;
  clientName?: string;
  testimonialTitle?: string;
  testimonialDescription?: string;
  rating?: string;
  clientImage?: FileType;
};

export type ICreateTaxSetting = {
  state: string;
  tax: string;
};

export type IUpdateTaxSetting = {
  state?: string;
  tax?: string;
};

export type IUpdateProductVariation = {
  // stock?: string;
  variantPrice?: string;
  color?: {
    name?: string;
    code?: string;
  };
  image?: FileType;
  stock?: number;
};
export type IAddProductVariation = {
  productVariants: [];
};
