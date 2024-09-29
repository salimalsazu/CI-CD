export type ICategoryFilterRequest = {
  searchTerm?: string | undefined;
};

export type ICategoryRequest = {
  categoryName: string;
  description: string;
  categoryImage: string;
};

export type ICategoryUpdateRequest = {
  categoryName?: string;
  description?: string;
  categoryHref?: string;
  categoryImage?: string;
  oldFilePath?: string;
};
