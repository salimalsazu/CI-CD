export const userFilterableFields: string[] = [
  'searchTerm', 
];

export const userSearchableFields: string[] = [
  'email',  
  'fullName',  
  'phoneNumber',  
  'companyName',    
];

export const userRelationalFields: string[] = [
  'fullName', "role" 
];
export const userRelationalFieldsMapper: { [key: string]: string } = {
 
  role: "role",
 
};

export const ZodUserRoles = ['SUPERADMIN', 'ADMIN', 'USER'];
