import { FileType } from "rsuite/esm/Uploader";

export type ICreateCategory = {
  categoryName: string;
  description: string;
  categoryImage: FileType;
};
export type ICreateSubCategory = {
  subCategoryName: string;
  categoryId: string;
  subCategoryImage: FileType;
};
export type IUpdateSubCategory = {
  subCategoryName?: string;
  categoryId?: string;
  subCategoryImage?: FileType;
};
