export const BarcodeFilterableFields: string[] = ['searchTerm', 'startDate', 'endDate', 'barcodeStatus'];
export const BarcodeSearchableFields: string[] = ['code'];

export const BarcodeRelationalFields: string[] = ['productName'];

export const BarcodeRelationalFieldsMapper: { [key: string]: string } = {
  productName: 'productName',
};
