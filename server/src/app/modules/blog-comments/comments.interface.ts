export type ICommentFilterRequest = {
  searchTerm?: string | undefined;
};

export type ICommentRequest = {
  name: string;
  email: string;
  comment: string;
};
