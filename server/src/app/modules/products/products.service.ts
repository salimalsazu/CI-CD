/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { Prisma, Product, ProductVariation } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUploadFile } from '../../../interfaces/file';
import { Request } from 'express';
import { errorLogger } from '../../../shared/logger';
import { IProductFilterRequest, IProductRequest, IProductUpdateRequest, IProductVariant, IProductVariantUpdateRequest } from './products.interface';
import { generateBarCode } from './products.utils';
import { ProductRelationalFields, ProductRelationalFieldsMapper, ProductSearchableFields } from './product.constants';

// modules

// !----------------------------------Create New Product--------------------------------------->>>
const createProduct = async (req: Request): Promise<Product> => {
  const files = req.files as IUploadFile[];

  const productImagesPaths = files?.map(file => {
    return file.path?.substring(7);
  });
  const featuredImage = files?.find(file => file?.filename?.includes('featured-image_'));

  const data = req.body as IProductRequest;
  //
  // making variant array with image
  const variants = data?.productVariations?.map((variant: IProductVariant) => {
    const imagePath = productImagesPaths.find((path: string) => path?.includes(variant?.id)) || '';
    return {
      image: imagePath,
      variantPrice: variant.variantPrice,
      color: variant.color,
      // size: variant.size,
      // stock: variant.stock,
    };
  });

  // making stock variant
  const variantStock = data?.productVariations?.map(({ stock }: IProductVariant) => ({ stock }));

  // prisma transaction
  const result = await prisma.$transaction(async transactionClient => {
    const productInfo = {
      productName: data.productName,
      productPrice: data.productPrice,
      productDescription: data.productDescription,
      productImage: productImagesPaths,
      categoryId: data.categoryId,
      featuredImage: featuredImage?.path?.substring(7) as string,
      productVariations: {
        create: variants,
      },
    };

    // creating product with variants
    const createdProduct = await transactionClient.product.create({
      data: productInfo,
    });

    if (!createdProduct) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Product creation failed');
    }
    //
    const productId = createdProduct.productId;
    //
    for (const variant of variantStock) {
      const pv = await transactionClient.productVariation.findFirst({
        where: {
          productId: productId,
          // size: variant.size,
        },
      });

      if (!pv) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product variation not found');
      }

      const codes = Array.from({ length: variant?.stock }, () => ({
        code: generateBarCode(),
        variantId: pv.variantId,
      }));

      const createdBarCodes = await transactionClient.barCode.createMany({ data: codes });

      if (!createdBarCodes || createdBarCodes.count !== variant.stock) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create barcode');
      }
    }

    return createdProduct;
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create Product, result error');
  }
  return result;
};

// !------------------------- Add More Variant on product ---------------------->>>
const addMoreVariants = async (req: Request, productId: string): Promise<any> => {
  const files = req.files as IUploadFile[];

  const productImagesPaths = files?.map(file => {
    return file.path?.substring(7);
  });

  const data = req.body as IProductRequest;

  // making variant array with image
  const variants = data?.productVariations?.map((variant: IProductVariant) => {
    const imagePath = productImagesPaths.find((path: string) => path?.includes(variant?.id)) || '';
    return {
      productVariant: {
        image: imagePath,
        variantPrice: variant.variantPrice,
        color: variant.color,
        productId,
      },
      otherVariant: {
        stock: variant.stock,
      },
    };
  });
  // making variant array with image

  // prisma transaction
  const result = await prisma.$transaction(async transactionClient => {
    // adding more  variants on product

    //

    for (const variant of variants) {
      const createdNewVariant = await transactionClient.productVariation.create({
        data: variant.productVariant,
      });
      if (!createdNewVariant) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Variant Adding failed');
      }

      // generating new codes
      const codes = Array.from({ length: variant?.otherVariant?.stock }, () => ({
        code: generateBarCode(),
        variantId: createdNewVariant.variantId,
      }));

      const createdBarCodes = await transactionClient.barCode.createMany({ data: codes });

      if (!createdBarCodes || createdBarCodes.count !== variant.otherVariant.stock) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create barcode');
      }
    }
    // find latest created
    const latestData = await transactionClient.productVariation.findMany({
      where: {
        productId,
      },
      take: variants.length,
    });

    return latestData;

    //
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to Add Variant, result error');
  }
  return result;
};

// !----------------------------------get all Product---------------------------------------->>>
const getProducts = async (filters: IProductFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Product[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, categoryName, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.ProductWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: ProductSearchableFields.map((field: any) => ({
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
        if (ProductRelationalFields.includes(key)) {
          return {
            [ProductRelationalFieldsMapper[key]]: {
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

  //Filter By CreatedAt
  if (startDate && endDate) {
    andConditions.push({
      createdAt: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
    });
  }

  //Filter By Category
  if (categoryName) {
    andConditions.push({
      category: {
        categoryName: {
          equals: categoryName,
        },
      },
    });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.ProductWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.product.findMany({
    where: whereConditions,
    include: {
      category: {
        select: {
          categoryId: true,
          categoryName: true,
        },
      },
      productVariations: {
        select: {
          variantId: true,
          color: true,
          variantPrice: true,
          image: true,
          _count: {
            select: {
              barCodes: {
                where: {
                  barcodeStatus: 'INACTIVE',
                },
              },
            },
          },
        },
      },
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.product.count({
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

// !----------------------------------get Single Courier---------------------------------------->>>
const getSingleProduct = async (productId: string): Promise<Product | null> => {
  if (!productId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'product Id is required');
  }

  const result = await prisma.product.findUnique({
    where: {
      productId,
    },
    include: {
      productVariations: {
        select: {
          variantId: true,
          color: true,
          variantPrice: true,
          image: true,
          _count: {
            select: {
              barCodes: {
                where: {
                  barcodeStatus: 'INACTIVE',
                },
              },
            },
          },
        },
      },
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Not Found!!');
  }

  return result;
};

// !----------------------------------Update Courier---------------------------------------->>>
const updateProduct = async (productId: string, req: Request): Promise<Product> => {
  const file = req.file as IUploadFile;
  const filePath = file?.path?.substring(8);

  const { productName, oldFilePath, productPrice, productStock, productDescription, categoryId, productStatus } = req.body as IProductUpdateRequest;

  // deleting old style Image
  const oldFilePaths = 'uploads/' + oldFilePath;
  if (oldFilePath !== undefined && filePath !== undefined) {
    // @ts-ignore
    fs.unlink(oldFilePaths, err => {
      if (err) {
        errorLogger.error('Error deleting old file');
      }
    });
  }

  const result = await prisma.$transaction(async transactionClient => {
    const existingProduct = await transactionClient.product.findUnique({
      where: {
        productId,
      },
    });

    if (!existingProduct) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product Not Found!!');
    }

    if (categoryId) {
      const isCategoryExist = await transactionClient.category.findUnique({
        where: {
          categoryId,
        },
      });

      if (!isCategoryExist) throw new ApiError(httpStatus.NOT_FOUND, ' Category Not Found!!');
    }

    const updatedDetails = {
      productName,
      productDescription,
      productPrice,
      productStock,
      categoryId,
      productStatus,
      featuredImage: filePath,
    };

    const updatedProduct = await transactionClient.product.update({
      where: {
        productId,
      },
      data: updatedDetails,
    });

    return updatedProduct;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update Product Information');
  }

  return result;
};

const deleteProduct = async (productId: string): Promise<Product> => {
  if (!productId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product Id is required');
  }

  const result = await prisma.product.delete({
    where: {
      productId,
    },
  });

  return result;
};

const getAllVariant = async (): Promise<any[]> => {
  const result = await prisma.productVariation.findMany({
    select: {
      variantId: true,
      color: true,
      product: {
        select: {
          productName: true,
          productId: true,
        },
      },
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Variation Not Found');
  }

  return result;
};

const updateProductVariation = async (variantId: string, req: Request): Promise<ProductVariation> => {
  console.log('variantId', variantId);

  const file = req.file as IUploadFile;
  const filePath = file?.path?.substring(8);

  const { color, stock, variantPrice, oldFilePath } = req.body as IProductVariantUpdateRequest;

  // deleting old style Image
  const oldFilePaths = 'uploads/' + oldFilePath;
  if (oldFilePath !== undefined && filePath !== undefined) {
    // @ts-ignore
    fs.unlink(oldFilePaths, err => {
      if (err) {
        errorLogger.error('Error deleting old file');
      }
    });
  }

  if (!variantId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'variantId is required');
  }

  const productVariant = await prisma.productVariation.findUnique({
    where: {
      variantId,
    },
  });

  if (!productVariant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Variation Not Found');
  }

  const updateObj = {
    color,
    stock,
    variantPrice,
    image: filePath,
  };

  const result = await prisma.productVariation.update({
    where: {
      variantId,
    },
    data: updateObj,
  });

  return result;
};

const deleteProductVariant = async (variantId: string): Promise<ProductVariation> => {
  if (!variantId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'variantId is required');
  }

  const result = await prisma.productVariation.delete({
    where: {
      variantId,
    },
  });

  return result;
};

export const ProductService = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  updateProductVariation,
  deleteProductVariant,
  getAllVariant,
  addMoreVariants,
};
