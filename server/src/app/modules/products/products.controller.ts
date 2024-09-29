/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ProductService } from './products.service';
import { ProductFilterableFields } from './product.constants';

// !----------------------------------Create New Product---------------------------------------->>>
const addProductsController = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products Added Successfully',
    data: result,
  });
});
// !-------------------------add more variant on  Product-------------------------->>>
const addMoreVariants = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params?.productId;
  const result = await ProductService.addMoreVariants(req, productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variant Added',
    data: result,
  });
});

// !----------------------------------get all Product---------------------------------------->>>
const getProductsController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ProductFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await ProductService.getProducts(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Product fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------get Single Product---------------------------------------->>>
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductService.getSingleProduct(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  });
});

// !----------------------------------Update Product---------------------------------------->>>
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  // console.log('productId', productId);
  // @ts-ignore
  const result = await ProductService.updateProduct(productId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Product Updated successfully !',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductService.deleteProduct(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Deleted successfully !',
    data: result,
  });
});

const getAllVariant = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllVariant();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All variant fetched successfully',
    data: result,
  });
});

const updateProductVariation = catchAsync(async (req: Request, res: Response) => {
  const { variantId } = req.params;
  const result = await ProductService.updateProductVariation(variantId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Variation Updated successfully !',
    data: result,
  });
});

const deleteProductVariant = catchAsync(async (req: Request, res: Response) => {
  const { variantId } = req.params;
  const result = await ProductService.deleteProductVariant(variantId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Variation Deleted successfully !',
    data: result,
  });
});

export const ProductController = {
  addProductsController,
  getProductsController,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  updateProductVariation,
  deleteProductVariant,
  getAllVariant,
  addMoreVariants,
};
