/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BlogService } from './blogs.service';
import { BlogFilterableFields } from './blogs.constants';

// !----------------------------------Create New Blog---------------------------------------->>>
const AddNewBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.AddNewBlog(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Created',
    data: result,
  });
});

// !----------------------------------get all Blog---------------------------------------->>>
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BlogFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await BlogService.getAllBlogs(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Blogs fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------Update Blog---------------------------------------->>>
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;

  const result = await BlogService.updateBlog(blogId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated successfully !',
    data: result,
  });
});
// !----------------------------------Get single blog for dashboard---------------------------------------->>>
const getSingleBlogById = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;

  const result = await BlogService.getSingleBlogById(blogId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Retrieved Successfully !',
    data: result,
  });
});
// !----------------------------------Get single blog ---------------------------------------->>>
const getSingleBlogByHref = catchAsync(async (req: Request, res: Response) => {
  const { blogHref } = req.params;

  const result = await BlogService.getSingleBlogByHref(blogHref);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Retrieved Successfully !',
    data: result,
  });
});
// ! delete blog
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const result = await BlogService.deleteBlog(blogId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted successfully !',
    data: result,
  });
});

export const BlogsController = {
  AddNewBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlogById,
  getSingleBlogByHref,
};
