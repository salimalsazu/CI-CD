/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { TestimonialFilterableFields } from './testimonial.constants';
import { TestimonialService } from './testimonial.service';

// !----------------------------------Create New Category---------------------------------------->>>
const addTestimonial = catchAsync(async (req: Request, res: Response) => {
  // @ts-ignore
  const result = await TestimonialService.addTestimonial(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial Added Successfully',
    data: result,
  });
});

// !----------------------------------get all Category---------------------------------------->>>
const getTestimonial = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, TestimonialFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await TestimonialService.getTestimonial(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Testimonial fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------Update Category---------------------------------------->>>
const updateTestimonial = catchAsync(async (req: Request, res: Response) => {
  const { testimonialId } = req.params;
  // @ts-ignore
  const result = await TestimonialService.updateTestimonial(testimonialId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial Updated successfully !',
    data: result,
  });
});

const deleteTestimonial = catchAsync(async (req: Request, res: Response) => {
  const { testimonialId } = req.params;
  const result = await TestimonialService.deleteTestimonial(testimonialId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial Deleted successfully !',
    data: result,
  });
});

export const TestimonialController = {
  addTestimonial,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
