export type ITestimonialFilterRequest = {
  searchTerm?: string | undefined;
};

export type ITestimonialRequest = {
  clientName: string;
  testimonialTitle: string;
  testimonialDescription: string;
  rating: string;
};

export type ITestimonialUpdateRequest = {
  clientName?: string | undefined;
  testimonialTitle?: string | undefined;
  testimonialDescription?: string | undefined;
  rating?: string | undefined;
  clientImage?: string | undefined;
  oldFilePath?: string;
};
