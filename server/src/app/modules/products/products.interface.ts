import { ProductStatus } from '@prisma/client';

export type IProductFilterRequest = {
  searchTerm?: string | undefined;
  productColor?: string | undefined;
  productSize?: string | undefined;
  categoryName?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
};

export type IProductRequest = {
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: number;
  categoryId: string;
  productVariations: IProductVariant[];
};
export type IProductVariant = {
  id: string;
  variantPrice: number;
  color: IColor;
  size: string;
  stock: number;
};

type IColor = {
  code: string;
  name: string;
};

export type IProductUpdateRequest = {
  productName?: string;
  productDescription?: string;
  productPrice?: number;
  productStock?: number;
  categoryId?: string;
  productStatus?: ProductStatus;
  oldFilePath?: string;
};

export type IProductVariantUpdateRequest = {
  variantPrice?: number;
  color?: IColor;
  stock?: number;
  oldFilePath?: string;
};
