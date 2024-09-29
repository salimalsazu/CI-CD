/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';
import { CategoryFilterableFields } from './category.constants';

// !----------------------------------Create New Category---------------------------------------->>>
const addCategoryController = catchAsync(async (req: Request, res: Response) => {
  // @ts-ignore
  const result = await CategoryService.addCategory(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Added Successfully',
    data: result,
  });
});

// !----------------------------------get all Category---------------------------------------->>>
const getCategoryController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, CategoryFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await CategoryService.getCategory(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Categories fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------get Single Category---------------------------------------->>>
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryHref } = req.params;
  const result = await CategoryService.getSingleCategory(categoryHref);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully',
    data: result,
  });
});

// !----------------------------------Update Category---------------------------------------->>>
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  // @ts-ignore
  const result = await CategoryService.updateCategory(categoryId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Updated successfully !',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const result = await CategoryService.deleteCategory(categoryId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Deleted successfully !',
    data: result,
  });
});

export const CategoryController = {
  addCategoryController,
  getCategoryController,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
