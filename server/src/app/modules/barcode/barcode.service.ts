import { IBarCodeFilterRequest, IBarCodeStockRequest, ICreateBarCodeManually } from './barcode.interface';
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { BarCode, KidDetails, Prisma, ProductVariation } from '@prisma/client';

import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { BarcodeRelationalFields, BarcodeRelationalFieldsMapper, BarcodeSearchableFields } from './barcode.constant';
import { generateBarCode } from '../products/products.utils';

// !----------------------------------get Single barcode ---------------------------------------->>>

const getProductBarcodeVarientWise = async (
  filters: IBarCodeFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<ProductVariation[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.ProductVariationWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: [
        ...BarcodeSearchableFields.map((field: any) => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
        {
          product: {
            productName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
      ],
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (BarcodeRelationalFields.includes(key)) {
          return {
            [BarcodeRelationalFieldsMapper[key]]: {
              subCategoryName: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  if (startDate && endDate) {
    andConditions.push({
      createdAt: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
    });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.ProductVariationWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve product variants with filtering and pagination
  const result = await prisma.productVariation.findMany({
    where: whereConditions,
    include: {
      product: {
        select: {
          productName: true,
          category: {
            select: {
              categoryName: true,
            },
          },
        },
      },
      barCodes: {
        select: {
          barcodeId: true,
          code: true,
          barcodeStatus: true,
        },
      },
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'asc' },
  });

  const variants = result
    .filter(variant => variant.product) // Filter out variants without a product
    .map(({ product, ...rest }) => ({
      ...rest,
      productName: product?.productName,
      categoryName: product?.category?.categoryName,
    }));

  // Count total matching orders for pagination
  const total = await prisma.productVariation.count({
    where: whereConditions,
  });

  // Calculate total pages
  const totalPage = limit > 0 ? Math.ceil(total / limit) : 0;

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: variants,
  };
};

// ! kid details or kid create details
const getSingleBarCodeDetailsForKid = async (code: string): Promise<KidDetails | BarCode | null> => {
  if (!code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Barcode is required');
  }

  let result = null;

  // Find the product using the productCode
  const barCodeDetails = await prisma.barCode.findUnique({
    where: {
      code,
    },
  });

  if (!barCodeDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kid Does Not Exist');
  }

  if (barCodeDetails.barcodeStatus !== 'AVAILABLE' && barCodeDetails.barcodeStatus !== 'ACTIVE') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Barcode is not available or active');
  }

  if (barCodeDetails.barcodeStatus === 'AVAILABLE') {
    result = barCodeDetails;
  } else {
    const res = await prisma.kidDetails.findUnique({
      where: {
        barcodeId: barCodeDetails.barcodeId,
      },
      include: {
        barCode: true,
      },
    });

    if (!res) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Kid Not Found');
    }
    result = res;
  }

  return result;
};

const getAvailableBarCode = async (code: string): Promise<BarCode | null> => {
  if (!code) throw new ApiError(httpStatus.BAD_REQUEST, 'Please enter a QR Code');

  const findBarCode = await prisma.barCode.findUnique({
    where: {
      code,
      barcodeStatus: 'AVAILABLE',
    },
  });

  if (!findBarCode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This Barcode is not available.');
  }

  return findBarCode;
};

const getAllBarCodeForPrint = async (filters: IBarCodeFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<BarCode[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, barcodeStatus, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.BarCodeWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: [
        ...BarcodeSearchableFields.map((field: any) => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      ],
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (BarcodeRelationalFields.includes(key)) {
          return {
            [BarcodeRelationalFieldsMapper[key]]: {
              subCategoryName: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  if (barcodeStatus) {
    andConditions.push({
      barcodeStatus: {
        equals: barcodeStatus,
      },
    });
  }

  if (startDate && endDate) {
    andConditions.push({
      createdAt: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
    });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.BarCodeWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve product variants with filtering and pagination
  const result = await prisma.barCode.findMany({
    include: {
      variant: {
        include: {
          product: true,
        },
      },
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.barCode.count({
    where: whereConditions,
  });

  // Calculate total pages
  const totalPage = limit > 0 ? Math.ceil(total / limit) : 0;

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

// const getSingleVariant = async (variantId: string): Promise<any | null> => {
//   if (!variantId) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'variantId is required');
//   }

//   // Find the product using the productCode
//   const result = await prisma.productVariation.findUnique({
//     where: {
//       variantId,
//     },
//     select: {
//       variantId: true,
//       productId: true,
//       color: true,
//       product: {
//         select: {
//           productName: true,
//         },
//       },
//       _count: true,
//       barCodes: {
//         select: {
//           barcodeId: true,
//           code: true,
//           barcodeStatus: true,
//         },
//       },
//       // product: true,
//     },
//   });

//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Variation Not Found');
//   }

//   // console.log('product', result);

//   return result;
// };

// Barcode Update

const getSingleVariant = async (
  variantId: string,
  filters: IBarCodeFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<BarCode[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, barcodeStatus, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.BarCodeWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: BarcodeSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (BarcodeRelationalFields.includes(key)) {
          return {
            [BarcodeRelationalFieldsMapper[key]]: {
              subCategoryName: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  // Add barcodeStatus condition if provided
  if (barcodeStatus) {
    andConditions.push({
      barcodeStatus: {
        equals: barcodeStatus,
      },
    });
  }

  if (startDate && endDate) {
    andConditions.push({
      createdAt: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
    });
  }

  // This Code is not necessary
  // const whereConditions: Prisma.BarCodeWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  if (!variantId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'variantId is required');
  }

  // Find the product variation using the variantId
  const result = await prisma.productVariation.findUnique({
    where: {
      variantId,
    },
    select: {
      variantId: true,
      productId: true,
      color: true,
      product: {
        select: {
          productName: true,
        },
      },
      barCodes: {
        where: {
          AND: [
            { variantId }, // Assuming `variantId` is the correct field
            ...andConditions,
          ],
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
        select: {
          barcodeId: true,
          code: true,
          barcodeStatus: true,
        },
      },
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Variation Not Found');
  }

  // Count total matching barcodes for pagination
  const total = await prisma.barCode.count({
    where: {
      AND: [
        { variantId }, // Assuming `variantId` is the correct field
        ...andConditions,
      ],
    },
  });

  // Return the paginated response
  return {
    meta: {
      page,
      limit,
      total,
      //@ts-ignore
      totalPages: Math.ceil(total / limit),
    },
    //@ts-ignore
    data: result.barCodes,
  };
};

const singleBarcodeUpdate = async (barcodeId: string, data: any): Promise<BarCode | null> => {
  console.log(data, 'data');

  if (!barcodeId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'barcodeId is required');
  }

  const findBarcode = await prisma.barCode.findUnique({
    where: {
      barcodeId,
    },
  });

  if (!findBarcode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Barcode Not Found');
  }

  const result = await prisma.barCode.update({
    where: {
      barcodeId,
    },
    data,
  });

  return result;
};

const deleteBarcode = async (barcodeId: string): Promise<BarCode | null> => {
  if (!barcodeId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'barcodeId is required');
  }

  const findBarcode = await prisma.barCode.findUnique({
    where: {
      barcodeId,
    },
  });

  if (!findBarcode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Barcode Not Found');
  }

  if (findBarcode.barcodeStatus !== 'INACTIVE') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only INACTIVE barcodes can be deleted');
  }

  const result = await prisma.barCode.delete({
    where: {
      barcodeId,
    },
  });

  return result;
};

const deleteMultipleBarcode = async (barcodeIds: string[]): Promise<{ count: number }> => {
  if (!barcodeIds || barcodeIds.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'barcodeIds are required');
  }

  const findBarcode = await prisma.barCode.findMany({
    where: {
      barcodeId: {
        in: barcodeIds,
      },
    },
  });

  console.log(findBarcode, 'findBarcode');

  if (findBarcode.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Barcodes Not Found');
  }

  const invalidBarcodes = findBarcode.filter(barcode => barcode.barcodeStatus !== 'INACTIVE');

  if (invalidBarcodes.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only INACTIVE barcodes can be deleted');
  }

  const result = await prisma.barCode.deleteMany({
    where: {
      barcodeId: {
        in: barcodeIds,
      },
    },
  });

  return result;
};

//! stock increase
const addBarCode = async (data: IBarCodeStockRequest): Promise<number> => {
  const findVariant = await prisma.productVariation.findUnique({
    where: {
      variantId: data.variantId,
    },
  });

  if (!findVariant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Variant Not Found');
  }

  const codes = Array.from({ length: data.stock }, () => ({
    code: generateBarCode(),
    variantId: findVariant.variantId,
  }));

  const createdBarCodes = await prisma.barCode.createMany({ data: codes });

  return createdBarCodes.count;
};
//! Manually QR Code Create
const createQrCodeManually = async (data: ICreateBarCodeManually) => {
  //
  const findVariant = await prisma.productVariation.findUnique({
    where: {
      variantId: data?.variantId,
    },
  });

  if (!findVariant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Variant Not Found');
  }
  const findQrCode = await prisma.barCode.findUnique({
    where: {
      code: data?.code,
    },
  });

  if (findQrCode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Qr Code Already Exist');
  }
  // create
  const newData = {
    code: data.code,
    variantId: findVariant.variantId,
  };
  const result = await prisma.barCode.create({
    data: newData,
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'QR Code creating failed');
  }
  return result;
};

export const BarcodeService = {
  getSingleBarCodeDetailsForKid,
  getProductBarcodeVarientWise,
  getAvailableBarCode,
  getAllBarCodeForPrint,
  getSingleVariant,
  singleBarcodeUpdate,
  deleteBarcode,
  deleteMultipleBarcode,
  addBarCode,
  createQrCodeManually,
};
