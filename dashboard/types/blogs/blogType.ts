import { FileType } from "rsuite/esm/Uploader";

export type AddBlog = {
  title: string;
  blogImage: FileType;
  categoryName: string;
  description: string;
};
export type UpdateBlog = {
  title?: string;
  blogImage?: FileType;
  categoryName?: string;
  description?: string;
};
