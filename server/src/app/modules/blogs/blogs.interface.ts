export type ITestimonialFilterRequest = {
  searchTerm?: string | undefined;
};

export type IAddRequest = {
  title: string;
  description: string;
  categoryName: string;
};

export type IBlogUpdateRequest = {
  title?: string;
  description?: string;
  categoryName?: string;
};
