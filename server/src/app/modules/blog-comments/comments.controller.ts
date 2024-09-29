import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CommentsFilterableFields } from './comments.constants';
import { CommentService } from './comments.service';

// !----------------------------------Create New Category---------------------------------------->>>
const addComment = catchAsync(async (req: Request, res: Response) => {
  const { blogHref } = req.params;

  const result = await CommentService.addComment(req.body, blogHref);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Added Successfully',
    data: result,
  });
});

// !----------------------------------get all comments for dashboard---------------------------------------->>>
const getAllComments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, CommentsFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await CommentService.getAllComments(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
// ! single
const getSingleComment = catchAsync(async (req: Request, res: Response) => {
  const { blogHref } = req.params;
  const result = await CommentService.getSingleComment(blogHref);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved successfully !',
    data: result,
  });
});

// ! delete
const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const result = await CommentService.deleteComment(commentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted successfully !',
    data: result,
  });
});

export const CommentController = {
  addComment,
  getAllComments,
  deleteComment,
  getSingleComment,
};
