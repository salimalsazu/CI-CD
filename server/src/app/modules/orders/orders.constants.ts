export const OrderFilterableFields: string[] = ['searchTerm', 'orderStatus'];
export const OrderSearchableFields: string[] = ['orderId'];

export const OrderRelationalFields: string[] = ['state'];

export const OrderRelationalFieldsMapper: { [key: string]: string } = {
  state: 'state',
};
