export const CategoryFilterableFields: string[] = ['searchTerm'];
export const CategorySearchableFields: string[] = ['categoryName'];

export const CategoryRelationalFields: string[] = ['categoryName'];

export const CategoryRelationalFieldsMapper: { [key: string]: string } = {
  assetName: 'categoryName',
};
